import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { applicationSchema } from '@/lib/validations';
import { applicationRateLimit } from '@/lib/rate-limit';
import { getIp } from '@/lib/get-ip';

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    const limit = applicationRateLimit(ip);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen bekleyin.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfter) },
        }
      );
    }

    const body = await request.json();
    const result = applicationSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Geçersiz veri.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { source, telegramUsername, bitgetUid, selectedPlan } = result.data;

    const application = await prisma.application.create({
      data: {
        source,
        telegramUsername,
        bitgetUid: bitgetUid || null,
        selectedPlan: selectedPlan || null,
      },
    });

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
