import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getScoresForJudge } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  // A judge may only read their own scores. Any other `judge` selector is refused (403), not filtered.
  const selector = new URL(req.url).searchParams.get("judge");
  if (selector !== null && selector !== actor.userId) return apiError(403, "forbidden");

  return Response.json({ scores: await getScoresForJudge(actor.userId!) });
}

import { ScoreInput } from "@/contracts";
import { canJudgeScore, upsertScore } from "@/repo/queries";

// Writes are scoped server-side: own identity only, eligible track only, never own team.
export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "judge:scores:write");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = ScoreInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid score (integer 1-5, known criterion)");
  if (!(await canJudgeScore(actor.userId!, parsed.data.projectId))) return apiError(403, "not eligible to score this project");

  await upsertScore(actor.userId!, parsed.data.projectId, parsed.data.criterion, parsed.data.value);
  return Response.json({ ok: true });
}
