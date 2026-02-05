const ipRequests = new Map<string, number[]>();

function cleanup() {
  const now = Date.now();
  for (const [key, timestamps] of ipRequests) {
    const filtered = timestamps.filter((t) => now - t < 15 * 60 * 1000);
    if (filtered.length === 0) {
      ipRequests.delete(key);
    } else {
      ipRequests.set(key, filtered);
    }
  }
}

setInterval(cleanup, 60 * 1000).unref();

interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
}

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const timestamps = ipRequests.get(key) ?? [];
  const windowStart = now - windowMs;
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= maxRequests) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  ipRequests.set(key, recent);
  return { allowed: true, retryAfter: 0 };
}

export function applicationRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`app:${ip}`, 5, 60 * 1000);
}

export function loginRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
}
