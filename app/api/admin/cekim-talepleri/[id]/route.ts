import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthCookie } from '@/lib/auth';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthCookie();
  if (!auth) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });

  const { id } = await params;
  const talep = await prisma.cekimTalebi.update({
    where: { id: parseInt(id) },
    data: { durum: 'odendi' },
  });

  return NextResponse.json({ talep });
}
