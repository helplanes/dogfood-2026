import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { createEvent, listEvents, recordAudit } from "@/repo/queries";

export const dynamic = "force-dynamic";

const CreateEvent = z.object({
  name: z.string().min(1).max(200),
  submissionDeadline: z.string().datetime(),
  prizes: z.string().max(2000).default(""),
});

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ events: await listEvents() });
}

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = CreateEvent.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid event (name, submissionDeadline ISO datetime, prizes)");

  const id = await createEvent({ name: parsed.data.name, submissionDeadline: new Date(parsed.data.submissionDeadline), prizes: parsed.data.prizes });
  await recordAudit(actor.userId, "event:create", id, parsed.data.name);
  return Response.json({ id }, { status: 201 });
}
