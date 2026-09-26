# DogFood 2026 — Hackathon Submission & Judging Portal

Status: app scaffold (Next.js, contracts v0, policy stub, migration and fixtures seed). Auth, API routes and Compose seeding are not implemented yet. All application code is written during the 72-hour event window.

## Run
`docker compose up` (to be added) launches a fully seeded, offline portal.

## Docs
- [SPEC-NOTES.md](SPEC-NOTES.md) (verified official-spec facts, read first)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [DATA-MODEL.md](DATA-MODEL.md)
- [JUDGING.md](JUDGING.md)
- [TEAM-PLAN.md](TEAM-PLAN.md), [TEAM-ASSIGNMENTS.md](TEAM-ASSIGNMENTS.md), [TEAM-WORKFLOW.md](TEAM-WORKFLOW.md)

## Acceptance
Run `python3 run.py .dogfood.toml > acceptance-report.txt` and commit the result as-is.

## Local development
Requires Node 22+ and npm (do not use pnpm here).
```
npm install
npm run dev        # http://localhost:8080
npm run typecheck && npm run lint && npm test
```
Known issue: if `npm test` says `Cannot find native binding` (npm optional-deps bug), run
`npm install --no-save @rolldown/binding-darwin-arm64@$(node -p "require('rolldown/package.json').version")`
(use the binding matching your OS/CPU).

## Limitations
- `Dockerfile` and `docker-compose.yml` are unverified (Docker was not available when they were written).
- Database migrations, seed data, auth and the official `run.py`/`fixtures.json` are not in the repo yet.
