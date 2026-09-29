import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { ProjectInput } from "@/contracts";
import { createDraftProject, getEventId, isSubmissionOpen } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Submissions are refused after the event deadline (DB clock). Always a raw 4xx, never a redirect.
export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const body = await req.json().catch(() => null);
  const eventId = (body && typeof body === "object" && "eventId" in body ? String(body.eventId) : null) ?? (await getEventId());
  const parsed = ProjectInput.safeParse({ ...(body ?? {}), eventId });
  if (!parsed.success) return apiError(422, "invalid project");

  const open = await isSubmissionOpen(parsed.data.eventId);
  if (open === null) return apiError(404, "event not found");
  if (!open) return apiError(409, "submissions are closed for this event");

  const id = await createDraftProject(actor.userId!, parsed.data);
  if (!id) return apiError(403, "join a team before submitting");
  return Response.json({ id, status: "draft" }, { status: 201 });
}
