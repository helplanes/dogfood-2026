import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getLeaderboard } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const actor = await getActor(req);
  const d = authorize(actor, "organizer:manage");
  if (!d.ok) return apiError(d.status, d.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ leaderboard: await getLeaderboard() });
}
