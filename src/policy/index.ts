// All authorization lives here. Every route handler calls authorize() before doing work.
import type { Role } from "@/contracts";

export type Action =
  | "gallery:read"
  | "project:create"
  | "judge:scores:read"
  | "judge:scores:write"
  | "export:csv"
  | "organizer:manage";

export interface Actor {
  userId: string | null;
  role: Role;
}

const ALLOWED: Record<Action, readonly Role[]> = {
  "gallery:read": ["visitor", "participant", "judge", "organizer", "admin"],
  "project:create": ["participant"],
  "judge:scores:read": ["judge"],
  "judge:scores:write": ["judge"],
  "export:csv": ["organizer", "admin"],
  "organizer:manage": ["organizer", "admin"],
};

export type Decision = { ok: true } | { ok: false; status: 401 | 403 };

export function authorize(actor: Actor, action: Action): Decision {
  if (ALLOWED[action].includes(actor.role)) return { ok: true };
  return { ok: false, status: actor.userId === null ? 401 : 403 };
}
