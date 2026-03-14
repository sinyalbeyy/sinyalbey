import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthCookie } from '@/lib/auth';

export async function GET() {
  const auth = await getAuthCookie();
  if (!auth) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });

  const talepler = await prisma.cekimTalebi.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ talepler });
}
