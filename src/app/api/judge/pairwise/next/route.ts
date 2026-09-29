import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getNextPairwiseMatchup } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const pair = await getNextPairwiseMatchup(actor.userId!);
  return Response.json({ pair });
}
