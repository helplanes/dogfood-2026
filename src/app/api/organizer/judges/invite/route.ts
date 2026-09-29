import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { z } from "zod";
import { assignJudgeToTrack, inviteJudge, recordAudit } from "@/repo/queries";

export const dynamic = "force-dynamic";

const Body = z.object({ email: z.string().email(), name: z.string().min(1).max(200), trackId: z.string().optional() });

// T2 spec: "Judge invitation and assignment." Creates a judge account (no email/SMTP dependency —
// see src/repo/queries.ts: inviteJudge — so the temp password is returned here, once, for the
// organizer to relay out of band) and optionally assigns an initial track in the same call.
export async function POST(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "email and name required");

  const result = await inviteJudge(parsed.data.email, parsed.data.name);
  if ("error" in result) return apiError(409, result.error);

  if (parsed.data.trackId) await assignJudgeToTrack(result.id, parsed.data.trackId);

  await recordAudit(actor.userId, "judge:invite", result.id, parsed.data.email);
  return Response.json({ id: result.id, email: parsed.data.email, tempPassword: result.tempPassword }, { status: 201 });
}
