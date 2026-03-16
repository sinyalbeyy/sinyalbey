import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cekimTalebiRateLimit } from '@/lib/rate-limit';
import { getIp } from '@/lib/get-ip';

const TRC20_REGEX = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const limit = cekimTalebiRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Çok fazla istek. Lütfen bekleyin.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const { uid, rebate, address, donemler } = body;

    if (!uid || !rebate || !address || !Array.isArray(donemler) || donemler.length === 0) {
      return NextResponse.json({ error: 'Eksik veya geçersiz alanlar.' }, { status: 400 });
    }

    if (!TRC20_REGEX.test(String(address))) {
      return NextResponse.json({ error: 'Geçersiz TRC-20 adresi.' }, { status: 400 });
    }

    const rebateNum = parseFloat(String(rebate));
    if (isNaN(rebateNum) || rebateNum <= 0) {
      return NextResponse.json({ error: 'Geçersiz iade miktarı.' }, { status: 400 });
    }

    const donemlerStr = donemler.join(',');

    // Duplicate kontrolü: aynı UID için beklemede talep varsa engelle
    const existing = await prisma.cekimTalebi.findFirst({
      where: { uid: String(uid), durum: 'beklemede' },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'Bekleyen talebiniz var, önce işleme alınması gerekiyor.' },
        { status: 400 }
      );
    }

    const talep = await prisma.cekimTalebi.create({
      data: {
        uid: String(uid),
        rebate: String(rebate),
        address: String(address),
        donemler: donemlerStr,
      },
    });

    return NextResponse.json({ success: true, id: talep.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
