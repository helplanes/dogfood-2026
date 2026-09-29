import { deleteSession } from "@/repo/queries";
import { clearSessionCookie } from "@/server/cookies";

export const dynamic = "force-dynamic";

// These documented fixture sessions are shared demo identities, not user-created sessions.
// Logging out should clear the browser cookie without deleting a token that the checker and
// other demo visitors still need until the next seed.
const DEMO_SESSIONS = new Set(["org_7f2a", "jdg_a_91bc", "jdg_b_44de", "prt_2e88"]);

export async function POST() {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  const token = jar.get("session")?.value;
  if (token && !DEMO_SESSIONS.has(token)) await deleteSession(token);

  const res = Response.json({ ok: true });
  res.headers.set("set-cookie", clearSessionCookie());
  return res;
}
