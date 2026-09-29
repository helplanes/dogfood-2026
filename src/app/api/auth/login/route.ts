import { LoginInput } from "@/contracts";
import { apiError } from "@/server/http";
import { verifyAgainstDummyHash, verifyPassword } from "@/server/passwords";
import { createSession, findUserByEmail } from "@/repo/queries";
import { sessionCookie } from "@/server/cookies";
import { clientKey, rateLimit } from "@/server/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!(await rateLimit(`login:${clientKey(req)}`, 10, 60_000))) return apiError(429, "too many attempts, try again shortly");

  const parsed = LoginInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid email or password");

  const user = await findUserByEmail(parsed.data.email);
  // Demo fixture users (judges, organizer, participant) have no password hash: password login
  // is refused for them, same as an unknown email, so we don't reveal which emails exist. We
  // still run a full argon2 verify even when there's no user/hash to check against (verifying
  // the supplied password against a dummy hash), so an unknown email takes the same time as a
  // known one with a wrong password — otherwise the response time itself leaks which emails
  // have accounts, regardless of the response body being identical.
  const passwordOk = user?.passwordHash
    ? await verifyPassword(user.passwordHash, parsed.data.password)
    : await verifyAgainstDummyHash(parsed.data.password);
  if (!user || !user.passwordHash || !passwordOk) {
    return apiError(401, "invalid email or password");
  }

  const { token, expiresAt } = await createSession(user.id);
  const res = Response.json({ ok: true });
  res.headers.set("set-cookie", sessionCookie(token, expiresAt));
  return res;
}
