import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { TeamInput } from "@/contracts";
import { createTeam, getEventId } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create"); // team formation is a participant action
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const body = await req.json().catch(() => null);
  const eventId = (body && typeof body === "object" && "eventId" in body ? String(body.eventId) : null) ?? (await getEventId());
  const parsed = TeamInput.safeParse({ ...(body ?? {}), eventId });
  if (!parsed.success) return apiError(422, "invalid team");

  const result = await createTeam(actor.userId ?? "", parsed.data);
  if ("error" in result) return apiError(409, result.error);
  return Response.json(result, { status: 201 });
}
