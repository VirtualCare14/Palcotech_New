type Bucket = { count: number; resetAt: number };

declare global {
  // eslint-disable-next-line no-var
  var __rateLimitBuckets: Map<string, Bucket> | undefined;
}

const buckets = global.__rateLimitBuckets ?? new Map<string, Bucket>();
global.__rateLimitBuckets = buckets;

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (b.count >= limit) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }

  b.count += 1;
  buckets.set(key, b);
  return { ok: true, remaining: Math.max(0, limit - b.count), resetAt: b.resetAt };
}

