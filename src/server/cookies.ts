// Secure is set outside local dev so the session cookie is never sent over plain HTTP in
// production; HttpOnly + SameSite=Lax block script access and basic CSRF via cross-site GETs.
const SECURE = process.env.NODE_ENV === "production" ? "; Secure" : "";

export function sessionCookie(token: string, expiresAt: Date): string {
  return `session=${token}; Path=/; HttpOnly; SameSite=Lax${SECURE}; Expires=${expiresAt.toUTCString()}`;
}

export function clearSessionCookie(): string {
  return `session=; Path=/; HttpOnly; SameSite=Lax${SECURE}; Max-Age=0`;
}
