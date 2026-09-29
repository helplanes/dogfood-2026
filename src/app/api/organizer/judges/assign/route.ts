import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { assignJudgeToTrack, recordAudit } from "@/repo/queries";

export const dynamic = "force-dynamic";

const Body = z.object({ judgeId: z.string(), trackId: z.string() });

export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "judgeId and trackId required");

  await assignJudgeToTrack(parsed.data.judgeId, parsed.data.trackId);
  await recordAudit(actor.userId, "judge:assign", parsed.data.judgeId, parsed.data.trackId);
  return Response.json({ ok: true });
}
