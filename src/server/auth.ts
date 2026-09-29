import { and, eq, gt, isNull, or } from "drizzle-orm";
import { db } from "./db";
import { sessions, users } from "@/repo/schema";
import { Role } from "@/contracts";
import type { Actor } from "@/policy";

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

async function resolveActor(token: string | null): Promise<Actor> {
  if (!token) return { userId: null, role: "visitor" };
  const [row] = await db
    .select({ userId: users.id, role: users.role })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.token, token), or(isNull(sessions.expiresAt), gt(sessions.expiresAt, new Date()))))
    .limit(1);
  if (!row) return { userId: null, role: "visitor" };
  const role = Role.safeParse(row.role);
  return { userId: row.userId, role: role.success ? role.data : "visitor" };
}

// Route handlers: resolve from the incoming Request's cookie header.
export async function getActor(req: Request): Promise<Actor> {
  return resolveActor(readCookie(req.headers.get("cookie"), "session"));
}

// Server Components / Server Actions: no Request object, read from next/headers instead.
export async function getActorFromCookies(): Promise<Actor> {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  return resolveActor(jar.get("session")?.value ?? null);
}
