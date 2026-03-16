import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { uidSorguRateLimit } from '@/lib/rate-limit';
import { getIp } from '@/lib/get-ip';

const TR_OFFSET = 3 * 60 * 60 * 1000; // UTC+3
const DAY_MS = 24 * 60 * 60 * 1000;

function bitgetSign(secret: string, timestamp: string, method: string, path: string): string {
  const message = timestamp + method + path;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

async function fetchCommissionsChunk(
  uid: string,
  apiKey: string,
  secret: string,
  passphrase: string,
  startMs: number,
  endMs: number
): Promise<number> {
  const timestamp = Date.now().toString();
  const path = `/api/v2/broker/customer-commissions?uid=${uid}&startTime=${String(startMs)}&endTime=${String(endMs)}`;
  const sign = bitgetSign(secret, timestamp, 'GET', path);

  const res = await fetch(`https://api.bitget.com${path}`, {
    headers: {
      'ACCESS-KEY': apiKey,
      'ACCESS-SIGN': sign,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-PASSPHRASE': passphrase,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  console.log(`Bitget chunk [${startMs}-${endMs}]:`, JSON.stringify(data));

  if (data.code !== '00000') {
    throw new Error(data.msg || 'Bitget API hatası');
  }

  const list: Record<string, string>[] = data.data?.commissionList ?? [];
  return list.reduce((sum, item) => sum + parseFloat(item['dayTotalRebateAmount'] ?? '0'), 0);
}

export async function GET(request: NextRequest) {
  const ip = getIp(request);
  const limit = uidSorguRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Çok fazla istek. Lütfen bekleyin.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'UID gerekli' }, { status: 400 });
  }

  if (!/^\d{5,20}$/.test(uid)) {
    return NextResponse.json({ error: 'Geçersiz UID formatı.' }, { status: 400 });
  }

  const apiKey = process.env.BITGET_API_KEY!;
  const secret = process.env.BITGET_SECRET_KEY!;
  const passphrase = process.env.BITGET_PASSPHRASE!;
  const systemStart = new Date(process.env.SYSTEM_START_DATE!).getTime();

  const now = Date.now();

  // TR'de bugünün başlangıcını hesapla (setUTCHours ile UTC+3 gece yarısı)
  const todayTR = new Date(now + TR_OFFSET);
  todayTR.setUTCHours(0, 0, 0, 0);
  const todayStartMs = todayTR.getTime() - TR_OFFSET;

  // endMs: bugünün TR gece yarısına kadar (veya şu an, hangisi küçükse)
  const endMs = Math.min(todayStartMs + DAY_MS - 1, now);

  // systemStart → endMs aralığını 7'şer günlük parçalara böl
  const chunks: { startMs: number; endMs: number }[] = [];
  let cursor = systemStart;
  while (cursor <= endMs) {
    const chunkEnd = Math.min(cursor + 7 * DAY_MS - 1, endMs);
    chunks.push({ startMs: cursor, endMs: chunkEnd });
    cursor = chunkEnd + 1;
  }

  try {
    const results = await Promise.all(
      chunks.map(({ startMs, endMs }) =>
        fetchCommissionsChunk(uid, apiKey, secret, passphrase, startMs, endMs)
      )
    );

    const totalFee = results.reduce((sum, v) => sum + v, 0);
    const rebate = totalFee * 0.25;

    // startDate ve endDate TR tarihiyle
    const startTR = new Date(systemStart + TR_OFFSET);
    const endTR = new Date(now + TR_OFFSET);
    const fmt = (d: Date) =>
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

    return NextResponse.json({
      uid,
      totalFee: totalFee.toFixed(4),
      rebate: rebate.toFixed(4),
      startDate: fmt(startTR),
      endDate: fmt(endTR),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen hata';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
