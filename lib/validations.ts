import { z } from 'zod';
import { Source, Status } from '@/generated/prisma/client';

export function sanitizeHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

const telegramUsernameRegex = /^@?[a-zA-Z0-9_]{5,32}$/;

const telegramUsername = z
  .string()
  .trim()
  .min(1, 'Telegram kullanıcı adı gereklidir.')
  .regex(telegramUsernameRegex, 'Geçersiz Telegram kullanıcı adı.')
  .transform(sanitizeHtml);

const bitgetUid = z
  .string()
  .trim()
  .regex(/^\d+$/, 'Bitget UID sadece rakam içermelidir.')
  .max(20, 'Bitget UID en fazla 20 karakter olabilir.')
  .transform(sanitizeHtml);

const selectedPlan = z.string().trim().min(1, 'Plan seçimi gereklidir.').transform(sanitizeHtml);

const bitgetClubSchema = z.object({
  source: z.literal(Source.BITGET_CLUB),
  telegramUsername,
  bitgetUid,
  selectedPlan: z.string().trim().transform(sanitizeHtml).optional(),
});

const onepercentClubSchema = z.object({
  source: z.literal(Source.ONEPERCENT_CLUB),
  telegramUsername,
  bitgetUid: z.string().trim().transform(sanitizeHtml).optional(),
  selectedPlan,
});

export const applicationSchema = z.discriminatedUnion('source', [
  bitgetClubSchema,
  onepercentClubSchema,
]);

export const loginSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gereklidir.'),
  password: z.string().min(1, 'Şifre gereklidir.'),
});

export const updateApplicationSchema = z
  .object({
    status: z.nativeEnum(Status).optional(),
    adminNote: z
      .string()
      .max(500, 'Admin notu en fazla 500 karakter olabilir.')
      .transform(sanitizeHtml)
      .optional(),
  })
  .refine((data) => data.status !== undefined || data.adminNote !== undefined, {
    message: 'Güncellenecek alan belirtilmedi.',
  });

export const listApplicationsSchema = z.object({
  source: z.nativeEnum(Source).optional(),
  status: z.nativeEnum(Status).optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
});
