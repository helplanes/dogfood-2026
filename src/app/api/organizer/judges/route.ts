import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getJudgeLoads } from "@/repo/queries";

export const dynamic = "force-dynamic";

// The API-first mirror of /organizer/assignments: every judge's track eligibility and review
// progress (assigned vs. scored counts).
export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ judges: await getJudgeLoads() });
}
