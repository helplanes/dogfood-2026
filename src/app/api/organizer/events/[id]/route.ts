import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { recordAudit, updateEvent } from "@/repo/queries";

export const dynamic = "force-dynamic";

const PatchEvent = z.object({
  name: z.string().min(1).max(200).optional(),
  submissionDeadline: z.string().datetime().optional(),
  prizes: z.string().max(2000).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const { id } = await params;
  const parsed = PatchEvent.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid event fields");
  if (Object.keys(parsed.data).length === 0) return apiError(422, "no fields to update");

  const { submissionDeadline, ...rest } = parsed.data;
  await updateEvent(id, { ...rest, ...(submissionDeadline ? { submissionDeadline: new Date(submissionDeadline) } : {}) });
  await recordAudit(actor.userId, "event:edit", id, Object.keys(parsed.data).join(","));
  return Response.json({ ok: true });
}
