import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { uidSorguRateLimit } from '@/lib/rate-limit';
import { getIp } from '@/lib/get-ip';

const TR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const TR_MONTHS_LONG = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

function formatShort(date: Date): string {
  return `${date.getDate()} ${TR_MONTHS[date.getMonth()]}`;
}

function bitgetSign(secret: string, timestamp: string, method: string, path: string): string {
  const message = timestamp + method + path;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

async function fetchCommissions(
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
  console.log(`Bitget [${startMs}-${endMs}]:`, JSON.stringify(data));

  if (data.code !== '00000') {
    throw new Error(data.msg || 'Bitget API hatası');
  }

  const list: { totalRebateAmount?: string }[] = data.data?.commissionList ?? [];
  return list.reduce((sum, item) => sum + parseFloat(item.totalRebateAmount ?? '0'), 0);
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
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WEEK_MS = 7 * DAY_MS;

  // TR saati 21:00'dan önce bugünü gösterme (komisyon henüz settle olmamış olabilir)
  const TR_OFFSET = 3 * 60 * 60 * 1000;
  const trHour = new Date(now + TR_OFFSET).getUTCHours();
  const dailyStartI = trHour < 21 ? 1 : 0;

  // --- Günlük dönemler (son 7 gün, systemStart'tan önce başlamaz) ---
  const dailyPeriods: { startMs: number; endMs: number; donem: string; label: string }[] = [];
  for (let i = dailyStartI; i < dailyStartI + 7; i++) {
    const d = new Date(now - i * DAY_MS);
    d.setHours(0, 0, 0, 0);
    const startMs = d.getTime();
    if (startMs < systemStart) break;
    const endMs = Math.min(startMs + DAY_MS - 1, now);
    const donem = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const label = `${d.getDate()} ${TR_MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
    dailyPeriods.push({ startMs, endMs, donem, label });
  }

  // --- Haftalık dönemler (son 4 hafta, systemStart'tan önce başlamaz) ---
  const weeklyPeriods: { startMs: number; endMs: number; donem: string; label: string }[] = [];
  for (let i = 0; i < 4; i++) {
    const endMs = now - i * WEEK_MS;
    const rawStart = endMs - WEEK_MS + 1;
    const startMs = Math.max(rawStart, systemStart);
    if (startMs >= endMs) break;
    const startDate = new Date(startMs);
    const endDate = new Date(endMs);
    // ISO week number
    const jan1 = new Date(startDate.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((startDate.getTime() - jan1.getTime()) / DAY_MS + jan1.getDay() + 1) / 7);
    const donem = `${startDate.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
    const label = `${4 - i}. Hafta (${formatShort(startDate)} - ${formatShort(endDate)})`;
    weeklyPeriods.push({ startMs, endMs, donem, label });
  }

  try {
    const [dailyResults, weeklyResults] = await Promise.all([
      Promise.all(
        dailyPeriods.map(async ({ startMs, endMs, donem, label }) => {
          const total = await fetchCommissions(uid, apiKey, secret, passphrase, startMs, endMs);
          const rebate = total * 0.25;
          return { donem, tip: 'gunluk' as const, label, totalFee: total.toFixed(4), rebate: rebate.toFixed(4) };
        })
      ),
      Promise.all(
        weeklyPeriods.map(async ({ startMs, endMs, donem, label }) => {
          const total = await fetchCommissions(uid, apiKey, secret, passphrase, startMs, endMs);
          const rebate = total * 0.25;
          return { donem, tip: 'haftalik' as const, label, totalFee: total.toFixed(4), rebate: rebate.toFixed(4) };
        })
      ),
    ]);

    const donemler = [...dailyResults, ...weeklyResults].filter(
      (r) => parseFloat(r.rebate) > 0
    );

    return NextResponse.json({ uid, donemler });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen hata';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
