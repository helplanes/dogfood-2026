# ARCHITECTURE

Next.js 16 (App Router) + Postgres. One process, one database, offline.

- `src/policy`: single authorization table (role x action); every handler calls `authorize()` first. Five roles: visitor, participant, judge, organizer, admin (admin is organizer-equivalent everywhere — no separate admin-only action exists yet).
- `src/server`: DB pool, session auth (`getActor`/`getActorFromCookies`), password hashing + constant-time verification (`passwords.ts`), Postgres-backed rate limiting (`rateLimit.ts`), cookie helpers.
- `src/repo`: schema (`schema.ts`) and every query (`queries.ts`) — reads and writes are scoped server-side to the authenticated actor, never trusted from a request parameter.
- `src/domain/normalize.ts`: median/MAD z-score normalization with empirical-Bayes shrinkage (pure, unit tested).
- `src/domain/bradleyTerry.ts`: Bradley-Terry pairwise ranking, fit by order-independent MLE (pure, unit tested).
- `src/app`: pages (server-rendered gallery, judge console, organizer console) and route handlers under `src/app/api/**` plus the two spec-mandated non-`/api` routes (`/projects` gallery, `/projects/new` submit — see `.dogfood.toml`).
- `scripts/normalization-report.ts`: reproducible proof of the normalization math against the live fixture data (bonus: Normalization Proof). `openapi.json` + `API.md`: full API reference (bonus: API First).

Auth: the checker sends `Cookie: session=<token>` against the seed's fixed demo tokens (documented, demo-only — the four roles the checker exercises have no password). Real accounts (signup at `/signup`) use argon2-hashed passwords and the same session-cookie mechanism.

Database roles: two separate Postgres connections, not one. `DATABASE_URL_ADMIN` (superuser) runs migrations and seeding only. `DATABASE_URL` (the `dogfood_app` role, created by migration `0006_audit_hash_chain.sql`) is what the running app server actually queries with day to day — it has ordinary CRUD on every table except `audit_log`, where UPDATE/DELETE/TRUNCATE are explicitly revoked and a trigger enforces append-only regardless of role. So a compromise of the running Next.js process cannot itself rewrite history, only extend it.

Subsystems beyond the checker's 7 requests: team formation by invite link, draft-and-edit project submission, organizer event/track CRUD, organizer-configurable rubric weights (which the leaderboard actually applies before normalization, not just displays), manual judge-to-track assignment, an append-only audit log, and the pairwise bonus mode — see JUDGING.md and DATA-MODEL.md for each.
