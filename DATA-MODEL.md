# DATA-MODEL

Postgres via Drizzle (`src/repo/schema.ts`), forward-only migrations in `db/migrations`.

- `events(id, name, submission_deadline, prizes, created_at)`: DB clock is the deadline authority. `getEventId()` (src/repo/queries.ts) resolves "the current event" for flows that don't name one: soonest-deadline event that's still open, else the most recently created.
- `users(id, email, name, role, password_hash)`; `sessions(token, user_id, expires_at)`. `password_hash` is null for the fixture demo users (organizer/judge/participant), who authenticate only via their fixed session cookie, never a password.
- `tracks(id, event_id, name)`; `judge_tracks(judge_id, track_id)` = judge eligibility, editable by an organizer (assign/unassign).
- `teams(id, event_id, name)`; `team_members(team_id, email)`; `team_invites(token, team_id, created_at)` — the invite-link join code.
- `projects(id, event_id, team_id, title, summary, repo_url, track, status draft|submitted, submitted_at, duplicate_of)`. Draft is owner-editable (by team membership) until the event's deadline; `POST /api/projects/[id]/submit` transitions draft → submitted.
- `scores(judge_id, project_id, criterion, value 1-5, comment)`, unique per (judge, project, criterion).
- `rubric_weights(criterion, weight, updated_at)`: organizer-set weights per criterion, applied before normalization (defaults to 40/30/30 if unset). See JUDGING.md.
- `audit_log(id, actor_id, action, entity, detail, created_at)`: append-only, written by `recordAudit()`, never updated or deleted by the app. Covers score writes, project create/edit/submit, and every organizer action (event/track create, rubric update, judge assign/unassign).

Seed: `db/seed/index.ts` loads `fixtures.json` unchanged (41 projects, 30 judges, 126 score records) and creates the demo sessions.
