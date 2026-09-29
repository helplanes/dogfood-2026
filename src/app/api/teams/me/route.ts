import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getMyTeam, getTeamInvite, getTeamMembers } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "project:create");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const team = await getMyTeam(actor.userId!);
  if (!team) return Response.json({ team: null });

  const [inviteCode, members] = await Promise.all([getTeamInvite(team.id), getTeamMembers(team.id)]);
  return Response.json({ team: { ...team, inviteCode, members: members.map((m) => m.email) } });
}
