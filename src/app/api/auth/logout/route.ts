import { deleteSession } from "@/repo/queries";
import { clearSessionCookie } from "@/server/cookies";

export const dynamic = "force-dynamic";

export async function POST() {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  const token = jar.get("session")?.value;
  if (token) await deleteSession(token);

  const res = Response.json({ ok: true });
  res.headers.set("set-cookie", clearSessionCookie());
  return res;
}
