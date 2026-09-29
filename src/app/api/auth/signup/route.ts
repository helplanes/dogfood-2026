import { SignupInput } from "@/contracts";
import { apiError } from "@/server/http";
import { hashPassword } from "@/server/passwords";
import { createParticipant, createSession, findUserByEmail } from "@/repo/queries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const parsed = SignupInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return apiError(422, parsed.error.issues[0]?.message ?? "invalid signup");

  if (await findUserByEmail(parsed.data.email)) return apiError(409, "an account with this email already exists");

  const passwordHash = await hashPassword(parsed.data.password);
  const userId = await createParticipant({ email: parsed.data.email, name: parsed.data.name, passwordHash });
  const { token, expiresAt } = await createSession(userId);

  const res = Response.json({ ok: true }, { status: 201 });
  res.headers.set(
    "set-cookie",
    `session=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}`,
  );
  return res;
}
