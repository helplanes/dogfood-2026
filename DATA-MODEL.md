# DATA-MODEL

Postgres via Drizzle (`src/repo/schema.ts`), forward-only migrations in `db/migrations`.

- `events(id, name, submission_deadline)`: DB clock is the deadline authority.
- `users(id, email, name, role, password_hash)`; `sessions(token, user_id, expires_at)`.
- `tracks(id, event_id, name)`; `judge_tracks(judge_id, track_id)` = judge eligibility.
- `teams(id, event_id, name)`; `team_members(team_id, email)`.
- `projects(id, event_id, team_id, title, summary, repo_url, track, status draft|submitted, submitted_at, duplicate_of)`.
- `scores(judge_id, project_id, criterion, value 1-5, comment)`, unique per (judge, project, criterion).

Seed: `db/seed/index.ts` loads `fixtures.json` unchanged (41 projects, 30 judges, 126 score records) and creates the demo sessions.
