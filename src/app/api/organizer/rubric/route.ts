import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { getRubricWeights, recordAudit, setRubricWeights } from "@/repo/queries";

export const dynamic = "force-dynamic";

const Weights = z.object({ functionality: z.number().int().min(0), quality: z.number().int().min(0), innovation: z.number().int().min(0) });

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");
  return Response.json({ weights: await getRubricWeights() });
}

export async function PUT(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = Weights.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "weights must be non-negative integers for functionality, quality, innovation");
  if (parsed.data.functionality + parsed.data.quality + parsed.data.innovation !== 100) {
    return apiError(422, "weights must sum to 100");
  }

  await setRubricWeights(parsed.data);
  await recordAudit(actor.userId, "rubric:update", "weights", JSON.stringify(parsed.data));
  return Response.json({ ok: true });
}
