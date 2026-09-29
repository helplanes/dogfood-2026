// A fixed-window rate limiter backed by Postgres, not an in-memory Map. The earlier in-memory
// version was documented as "single-instance only, resets on restart" — real limitations that a
// shared Postgres table doesn't have: the window survives a process restart, and every instance
// pointed at the same database sees the same counter, so the limit is actually enforced no
// matter how many server processes are running.
//
// Atomicity: a single INSERT ... ON CONFLICT statement takes a row lock on the key, so concurrent
// requests for the same key are serialized by Postgres itself rather than racing in application
// code. The CASE expression resets the window when it has expired, or increments within it,
// entirely inside that one atomic statement.
import { sql } from "drizzle-orm";
import { db } from "./db";

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const rows = await db.execute(sql`
    insert into rate_limits (key, window_start, count)
    values (${key}, now(), 1)
    on conflict (key) do update set
      count = case
        when rate_limits.window_start > now() - (${windowMs} || ' milliseconds')::interval
        then rate_limits.count + 1
        else 1
      end,
      window_start = case
        when rate_limits.window_start > now() - (${windowMs} || ' milliseconds')::interval
        then rate_limits.window_start
        else now()
      end
    returning count
  `);
  const count = (rows.rows[0] as { count: number } | undefined)?.count ?? 1;
  return count <= limit;
}

export function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
