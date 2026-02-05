import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { listApplicationsSchema } from '@/lib/validations';

const PAGE_SIZE = 20;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const result = listApplicationsSchema.safeParse({
      source: searchParams.get('source') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      page: searchParams.get('page') ?? '1',
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Geçersiz sorgu parametreleri.' },
        { status: 400 }
      );
    }

    const { source, status, search, page } = result.data;

    const where: Record<string, unknown> = {};

    if (source) {
      where.source = source;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { telegramUsername: { contains: search, mode: 'insensitive' } },
        { bitgetUid: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      applications,
      total,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch {
    return NextResponse.json(
      { error: 'Başvurular yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}
