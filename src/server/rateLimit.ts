// A minimal in-memory fixed-window limiter for auth endpoints (brute-force / spam slowdown).
// Caveat, stated plainly: this is per-process state. It resets on redeploy and does not share
// state across instances, so it is not a substitute for a real limiter (e.g. Upstash Redis, or
// Vercel Firewall's rate limiting) behind a load balancer with more than one instance. It is a
// reasonable single-instance default, not a claim of distributed correctness.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
