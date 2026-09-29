import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { recordAudit, recordPairwiseVote } from "@/repo/queries";

export const dynamic = "force-dynamic";

const Vote = z.object({ projectAId: z.string(), projectBId: z.string(), winnerId: z.string() });

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:write");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = Vote.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "projectAId, projectBId, winnerId required");

  const result = await recordPairwiseVote(actor.userId!, parsed.data.projectAId, parsed.data.projectBId, parsed.data.winnerId);
  if ("error" in result) return apiError(403, result.error);

  await recordAudit(actor.userId, "pairwise:vote", parsed.data.winnerId, `vs ${parsed.data.projectAId === parsed.data.winnerId ? parsed.data.projectBId : parsed.data.projectAId}`);
  return Response.json({ ok: true });
}
