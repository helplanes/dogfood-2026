import { SignupInput } from "@/contracts";
import { apiError } from "@/server/http";
import { hashPassword } from "@/server/passwords";
import { createParticipant, createSession, findUserByEmail } from "@/repo/queries";
import { sessionCookie } from "@/server/cookies";
import { clientKey, rateLimit } from "@/server/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!(await rateLimit(`signup:${clientKey(req)}`, 10, 60_000))) return apiError(429, "too many attempts, try again shortly");

  const parsed = SignupInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, parsed.error.issues[0]?.message ?? "invalid signup");

  if (await findUserByEmail(parsed.data.email)) return apiError(409, "an account with this email already exists");

  const passwordHash = await hashPassword(parsed.data.password);
  const userId = await createParticipant({ email: parsed.data.email, name: parsed.data.name, passwordHash });
  const { token, expiresAt } = await createSession(userId);

  const res = Response.json({ ok: true }, { status: 201 });
  res.headers.set("set-cookie", sessionCookie(token, expiresAt));
  return res;
}
