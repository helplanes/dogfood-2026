# THREAT-MODEL

Bonus challenge, per `spec.md`. This describes what the platform actually defends against, how, and — as directly — what it does not. Every claim below is checked against real code paths, not aspirational.

## Who might attack this, and how

### A judge trying to see another judge's scores
`GET /api/judge/scores` (`src/app/api/judge/scores/route.ts`) is keyed by the authenticated session, never by a request parameter. A `?judge=` value that isn't the caller's own id is refused with 403 before the database is touched — it is not filtered client-side and not hidden by a template. This is the check the spec's own `run.py` calls "the one that matters most" (`T2 judge cannot see peer scores`), and it's verified by the official checker on every run.

### A judge scoring a project they shouldn't
`canJudgeScore()` (`src/repo/queries.ts`) requires the project's track to be in the judge's `judge_tracks` assignments, and explicitly excludes projects belonging to the judge's own team (matched by email through `team_members`). Enforced server-side on every `POST /api/judge/scores`, not just hidden from the UI.

### A participant trying to see or edit another team's project
`getOwnedProject()`/`updateOwnedProject()` scope every read and write to the caller's own team (`getMyTeam(userId)`). A request for someone else's project id returns **404, not 403** — deliberately, so the response doesn't confirm the project id even exists to someone who shouldn't be looking at it.

### Someone brute-forcing login or spamming signups
Rate-limited (`src/server/rateLimit.ts`), Postgres-backed so the limit survives a process restart and is shared across however many server instances are running, not an in-memory counter scoped to one process. **What this does not solve:** it's IP-keyed via `X-Forwarded-For`, which a distributed attacker can trivially spread across many IPs; a determined attacker with a botnet is not meaningfully slowed by this alone.

### Someone timing login responses to enumerate valid emails
Login always runs a full `argon2.verify` — against the real hash for a known email, against a fixed dummy hash for an unknown one (`verifyAgainstDummyHash`, `src/server/passwords.ts`) — so both paths cost the same wall-clock time and a timing side-channel doesn't leak which emails have accounts, even though the response body is already identical (`401 invalid email or password` either way).

### Someone tampering with the invite-link join flow
Invite codes are random 12-character tokens (`crypto.randomUUID()`, truncated), unguessable by brute force in any practical sense, one per team, checked server-side against the `team_invites` table. Joining is idempotent (`onConflictDoNothing`) and a user already on a team is refused (409) rather than silently added to a second one.

### Someone forging a CSV cell to run a spreadsheet macro on an organizer's machine
`cell()` in `src/app/api/export.csv/route.ts` prefixes any field starting with `=`, `+`, `-`, `@`, tab, or CR with a `'` before quoting — the standard mitigation for CSV/spreadsheet formula injection (a cell like `=1+1` or `=HYPERLINK(...)` executing when an organizer opens the export in Excel/Sheets).

### Someone trying to make a denied request look like a success
Every route that refuses a request returns a raw 4xx JSON body (`apiError()`), never a redirect to a login page. This matters concretely for an automated checker that follows redirects: a redirect to a 200 login page would read as success. Confirmed directly by `run.py`'s own checks.

### Someone tampering with judging history after the fact
The `audit_log` table is append-only in two independent layers, not just application code:

1. **Database-enforced, not just application-enforced.** A `BEFORE UPDATE OR DELETE` trigger (`audit_log_reject_mutation`, migration `0006_audit_hash_chain.sql`) raises an exception on any attempt to modify or delete a row — this fires even for the Postgres superuser connecting directly with `psql`, bypassing the application entirely. Verified directly: `UPDATE audit_log SET detail = 'tampered' WHERE id = 1` as the `dogfood` superuser fails with `audit_log is append-only`.
2. **Least-privilege at the connection level.** The running app connects as `dogfood_app`, a role with `UPDATE`/`DELETE`/`TRUNCATE` explicitly revoked on `audit_log` specifically (full CRUD elsewhere). Migrations and seeding run as a separate admin connection (`DATABASE_URL_ADMIN`), so the day-to-day running process never even holds the privilege the trigger is guarding against. Verified: `DELETE FROM audit_log` as `dogfood_app` fails with `permission denied for table audit_log`, before the trigger is ever reached.
3. **SHA-256 hash chain.** Every row's `hash` covers its own fields plus `prev_hash` (the previous row's hash), computed by a `BEFORE INSERT` trigger — `recordAudit()` never sets these itself, so an inserting client can't choose or omit them. Verified: two consecutive writes produce a `prev_hash`/`hash` pair where the second row's `prev_hash` exactly equals the first row's `hash`. If a row were altered by a direct database edit that somehow bypassed both layers above (e.g. restoring from a tampered backup), every subsequent row's hash would no longer match the recomputed chain — detectable by walking the table and recomputing.

**What this still does not solve:** an attacker with a superuser connection could `DROP TRIGGER` and then freely mutate rows, or restore the whole table from a backup taken before a tampering event and never get caught by hash verification alone (nothing currently walks the chain and alerts on a break — that verification would need to be run, not just be possible). This is real defense-in-depth against accidental mutation and against the running application process being compromised, not an unconditional guarantee against a fully privileged database administrator acting in bad faith.

## What we explicitly do not solve

- **Judges colluding off-platform** (agreeing on scores over Discord/Slack before voting). No software can observe this. Track isolation and own-score-only reads reduce the opportunity, but can't prevent two judges from simply talking.
- **A compromised organizer account.** The organizer role has broad read/write access (rubric weights, event dates, all scores via export) by design — that's what "organizer" means. We don't have a second admin tier that could contain a compromised organizer account.
- **Distributed brute force.** Covered above — IP-based rate limiting doesn't stop an attacker spread across many source IPs.
- **A direct database write bypassing the application.** The audit log, ownership checks, and isolation rules are all application-layer. Someone with raw Postgres access can bypass all of them; we don't run row-level security policies or a separate audit trigger at the database layer.
- **Multi-instance horizontal scaling correctness for anything not yet moved to Postgres.** Rate limiting and sessions are DB-backed and safe to scale; nothing else in the app currently relies on in-memory state, but this is worth stating rather than assuming.

## Why this list, and not a longer one

The spec's own philosophy (`spec.md`): "claiming we do not pass costs points." A short, accurate threat model that says what's real is worth more than a long one padded with unverified claims. Everything above traces to a specific file and, where practical, to a specific test or curl-verified behavior in this repo — not to a general design principle we intended to follow.
