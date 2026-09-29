import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { recordAudit, submitDraftProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const { id } = await params;
  const result = await submitDraftProject(actor.userId!, id);
  if ("error" in result) return apiError(result.error === "not found" ? 404 : 409, result.error);
  await recordAudit(actor.userId, "project:submit", id);
  return Response.json({ ok: true });
}
