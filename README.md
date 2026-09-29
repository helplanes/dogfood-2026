# DogFood 2026 — Hackathon Submission & Judging Portal

All application code is written during the 72-hour event window.

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

## Run

```
docker compose up        # migrates, seeds fixtures.json, prints demo logins, serves :8080
python3 run.py .dogfood.toml > acceptance-report.txt
```

## Status (honest)

Claimed T1 + T2. `acceptance-report.txt` shows the checker result: all 7 checks pass on a fresh seed.

**Implemented and verified end to end** (curl against the production build, not just unit tests):

- Real auth: signup/login/logout with argon2 password hashes and HttpOnly session cookies. The
  fixture demo users (organizer/judge/participant) have no password and keep working via their
  fixed cookies; password login is correctly refused for them (401), same response as an unknown
  email, so login never reveals which emails exist.
- Team formation by invite link (`/team/join?code=...`), enforced server-side (one team per user,
  invite code single-team-scoped).
- Draft-and-edit submission: create a draft, edit it, submit it — editable until the deadline,
  ownership-checked (`404`, not `403`, to another user so we don't leak that a project id exists).
- Judge scoring, own-scores-only isolation, CSV export, z-score-family normalization (median/MAD
  with empirical-Bayes shrinkage for low-review judges — see JUDGING.md), organizer-configurable
  rubric weights that actually change the ranking, manual judge-to-track assignment, event + track
  creation and editing (deadline and prizes), and an append-only audit log covering score writes,
  project create/edit/submit, and every organizer action above.
- Bonuses attempted (all four): **Pairwise** (`/judge/pairwise`, Bradley-Terry fit by
  order-independent MLE — see JUDGING.md), **Normalization Proof** (`npm run
  normalization-report` — a standalone, reproducible proof against the raw fixture data, no
  server needed), **Threat Model** (`THREAT-MODEL.md`), **API First** (`openapi.json` + `API.md`
  — 32 documented paths, every UI action has one).
- Basic hardening: rate limiting on login/signup (in-memory, single-instance only — see
  `src/server/rateLimit.ts` for the caveat), `Secure` cookie flag outside local dev, and standard
  security response headers (`next.config.ts`).
- Light/dark theme toggle across the whole app.

**Still not implemented:** automatic/load-balanced judge assignment (manual assignment only —
auto-assign needs conflict-of-interest rules the fixture doesn't define, an organizer decision as
much as an engineering one), and the 5-minute demo video.

**Untested:** `docker compose up` — Docker was not available on the machine this was built on.
Verify it once before submitting.
