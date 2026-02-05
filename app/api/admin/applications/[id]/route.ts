import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateApplicationSchema } from '@/lib/validations';

const CUID_REGEX = /^c[a-z0-9]{24}$/;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!CUID_REGEX.test(id)) {
      return NextResponse.json(
        { error: 'Geçersiz başvuru ID.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const result = updateApplicationSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Geçersiz veri.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;

    const application = await prisma.application.update({
      where: { id },
      data,
    });

    return NextResponse.json({ application });
  } catch {
    return NextResponse.json(
      { error: 'Güncelleme sırasında hata oluştu.' },
      { status: 500 }
    );
  }
}
