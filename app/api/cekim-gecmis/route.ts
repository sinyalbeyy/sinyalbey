import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'UID gerekli' }, { status: 400 });
  }

  const talepler = await prisma.cekimTalebi.findMany({
    where: { uid },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      rebate: true,
      address: true,
      donemler: true,
      durum: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ talepler });
}
