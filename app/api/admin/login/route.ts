import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { loginRateLimit } from '@/lib/rate-limit';
import { getIp } from '@/lib/get-ip';

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);

  if (bufA.byteLength !== bufB.byteLength) {
    // Compare against self to keep constant time, then return false
    const dummy = new Uint8Array(bufA.byteLength);
    let result = 0;
    for (let i = 0; i < bufA.byteLength; i++) {
      result |= bufA[i] ^ dummy[i];
    }
    void result;
    return false;
  }

  let result = 0;
  for (let i = 0; i < bufA.byteLength; i++) {
    result |= bufA[i] ^ bufB[i];
  }
  return result === 0;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    const limit = loginRateLimit(ip);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Çok fazla giriş denemesi. Lütfen bekleyin.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfter) },
        }
      );
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Geçersiz veri.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { username, password } = result.data;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured.' },
        { status: 500 }
      );
    }

    const usernameMatch = timingSafeEqual(username, adminUsername);
    const passwordMatch = timingSafeEqual(password, adminPassword);

    if (!usernameMatch || !passwordMatch) {
      return NextResponse.json(
        { error: 'Geçersiz kullanıcı adı veya şifre.' },
        { status: 401 }
      );
    }

    await setAuthCookie({ username, role: 'admin' });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Bir hata oluştu.' },
      { status: 500 }
    );
  }
}
