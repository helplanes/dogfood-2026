import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { JoinTeamInput } from "@/contracts";
import { joinTeamByInvite } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = JoinTeamInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invite code required");

  const result = await joinTeamByInvite(actor.userId!, parsed.data.code);
  if ("error" in result) return apiError(result.error === "invalid invite code" ? 404 : 409, result.error);
  return Response.json(result);
}
