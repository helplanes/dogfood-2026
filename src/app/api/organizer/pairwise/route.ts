import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getPairwiseLeaderboard } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Bonus ranking, for organizers/tie-breaking only — never the required rubric leaderboard.
export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ leaderboard: await getPairwiseLeaderboard() });
}
