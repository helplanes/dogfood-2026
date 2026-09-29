import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { ProjectInput } from "@/contracts";
import { getOwnedProject, recordAudit, updateOwnedProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const { id } = await params;
  const project = await getOwnedProject(actor.userId!, id);
  if (!project) return apiError(404, "not found");
  return Response.json(project);
}

// Edit before the deadline (spec: "edit it until the deadline"), draft or already submitted.
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const patch = ProjectInput.omit({ eventId: true }).partial().safeParse(body);
  if (!patch.success) return apiError(422, "invalid project fields");

  // Zod v4 applies the create schema's defaults even inside partial(), so parsing a
  // summary-only edit also produces repoUrl: null, track: null, etc. Keep only keys the
  // caller supplied, or a small PATCH silently erases the rest of the project.
  const changes = Object.fromEntries(
    Object.entries(patch.data).filter(([key]) => Object.prototype.hasOwnProperty.call(body, key)),
  ) as typeof patch.data;

  const result = await updateOwnedProject(actor.userId!, id, changes);
  if ("error" in result) return apiError(result.error === "not found" ? 404 : 409, result.error);
  await recordAudit(actor.userId, "project:edit", id, Object.keys(changes).join(","));
  return Response.json({ ok: true });
}
