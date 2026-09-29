import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getAssignedProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

// The API-first mirror of /judge/dashboard/[projectId]: a single assigned project with this
// judge's own existing scores, or null if not assigned to them (the UI 404s on null).
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const { id } = await params;
  const project = await getAssignedProject(actor.userId!, id);
  if (!project) return apiError(404, "not assigned to this project");
  return Response.json(project);
}
