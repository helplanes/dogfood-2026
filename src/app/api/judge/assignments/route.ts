import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getAssignedProjects } from "@/repo/queries";

export const dynamic = "force-dynamic";

// The API-first mirror of the /judge/dashboard page: this judge's assignment-scoped projects
// with their own existing scores. Never another judge's data — same scoping as /api/judge/scores.
export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ projects: await getAssignedProjects(actor.userId!) });
}
