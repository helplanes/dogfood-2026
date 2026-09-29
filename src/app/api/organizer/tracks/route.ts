import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { createTrack, deleteTrack, listTracks, recordAudit } from "@/repo/queries";

export const dynamic = "force-dynamic";

const CreateTrack = z.object({ eventId: z.string(), name: z.string().min(1).max(200) });

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  const eventId = new URL(req.url).searchParams.get("eventId") ?? undefined;
  return Response.json({ tracks: await listTracks(eventId) });
}

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = CreateTrack.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid track");

  const id = await createTrack(parsed.data.eventId, parsed.data.name);
  await recordAudit(actor.userId, "track:create", id, parsed.data.name);
  return Response.json({ id }, { status: 201 });
}

export async function DELETE(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return apiError(422, "id required");
  await deleteTrack(id);
  await recordAudit(actor.userId, "track:delete", id);
  return Response.json({ ok: true });
}
