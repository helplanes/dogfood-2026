import { LoginInput } from "@/contracts";
import { apiError } from "@/server/http";
import { verifyPassword } from "@/server/passwords";
import { createSession, findUserByEmail } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const parsed = LoginInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, "invalid email or password");

  const user = await findUserByEmail(parsed.data.email);
  // Demo fixture users (judges, organizer, participant) have no password hash: password login
  // is refused for them, same as an unknown email, so we don't reveal which emails exist.
  if (!user || !user.passwordHash || !(await verifyPassword(user.passwordHash, parsed.data.password))) {
    return apiError(401, "invalid email or password");
  }

  const { token, expiresAt } = await createSession(user.id);
  const res = Response.json({ ok: true });
  res.headers.set(
    "set-cookie",
    `session=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}`,
  );
  return res;
}
