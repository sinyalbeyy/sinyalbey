import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthCookie } from '@/lib/auth';

const VALID_DURUM = ['odendi', 'iptal', 'beklemede'] as const;
type Durum = typeof VALID_DURUM[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthCookie();
  if (!auth) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const durum: Durum = body.durum ?? 'odendi';

  if (!VALID_DURUM.includes(durum)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  const talep = await prisma.cekimTalebi.update({
    where: { id: parseInt(id) },
    data: { durum },
  });

  return NextResponse.json({ talep });
}
