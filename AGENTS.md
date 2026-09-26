# AGENTS.md: Shared Rules for Every AI Agent

Read this fully before touching anything. **Read `SPEC-NOTES.md` too: it holds verified facts from the official spec/fixtures and corrects this file where they differ (e.g. 41 projects, 1-5 integer scores, track isolation, Figma out of scope).** Human-friendly overview: `PROJECT-GUIDE.md`. **Current person-based ownership and first tasks: `TEAM-ASSIGNMENTS.md`.** Git branches and PR flow: `TEAM-WORKFLOW.md`. Schedule and prompts: `TEAM-PLAN.md`. Tool-specific notes: `CLAUDE.md`, `CODEX.md`, `ANTIGRAVITY.md`.

## 0. Identify the human before choosing work

The human using the coding agent determines ownership; the AI tool's name does not. The backend lead (Krish) owns **all backend and hardcore systems**. Shriyash owns the largest frontend scope, Nihal the medium frontend scope, and Prajwal a deliberately light frontend scope. The exact paths, task order, first task, and done checks are in `TEAM-ASSIGNMENTS.md`.

If a user greets you with `hi i am prajwal`, `hi i am nihal`, or `hi i am shriyash` and asks for their task, read `TEAM-ASSIGNMENTS.md`, tell them their assignment, inspect the repo, and begin that person's first small task if the scaffold is ready. If it is not ready, make the specified design/task brief and a precise handoff request. Do not assign work by Claude/Codex/Antigravity lane. If the name is unknown, ask who is using the agent before editing files.

## 1. Mission
Build **DOGFOOD Portal**: an open-source, self-hostable hackathon submission and judging platform for the DOGFOOD 2026 hackathon (freeze **Mon 28 Sep 2026 18:00 UTC**). It will be graded by the official checker `run.py` plus human review of code, docs and a 5-minute demo.

Target: **T1 + T2 fully correct**, T3 partial if time remains, bonus: Normalization Proof (then Threat Model, then OpenAPI).

## 2. Non-negotiable rules
1. **No external network dependency at runtime.** No CDNs, hosted DBs, auth providers, analytics, remote fonts or APIs. It must run with Wi-Fi off.
2. **`docker compose up` = seeded, working portal on http://localhost:8080.** Never break this on `main`.
3. **All authorization lives in the backend.** Every route calls `authorize()` from `src/policy`. Hiding UI is never enough. A curl test must fail for unauthorized access.
4. **Denials are raw `401`/`403` (or `4xx`). Never redirect to `/login` or another page for API or form POST denial.** The checker follows redirects and would see `200`.
5. **The gallery (`/projects`) is server-rendered HTML** containing project titles in the body, public, no auth, and the first fixture projects must appear on page one.
6. **Deadline is enforced server-side** using the database clock against `events.submission_deadline`. The sample event's deadline is in the past, so `POST /projects/new` from a participant must return 4xx.
7. **Judges only ever query through assignment-scoped repository functions.** No function returns another judge's scores to a judge.
8. **Tolerate messy fixtures:** a judge with identical scores everywhere, projects with 2 vs 5 reviews, one duplicate submission. No crashes, no division by zero, no silent deletes.
9. **All project code written after kickoff (25 Sep 18:00 UTC).** No copied platforms. Libraries are fine.
10. **Be honest.** Do not claim what isn't verified. Update `README.md` limitations whenever a gap is found.
11. Never commit secrets. Fixed demo tokens from the seed are allowed (they are documented, demo-only).

## 3. Stack (decided)
TypeScript strict, Node 22, Next.js App Router (server-rendered pages + `/api/v1/*` route handlers), PostgreSQL 16, Drizzle ORM + SQL migrations, Zod schemas (feed OpenAPI), argon2id, DB-backed opaque session tokens, Vitest, Docker multi-stage build, Compose. Tailwind, self-hosted fonts.

## 4. Repo layout (owners in brackets)
```
.
├─ AGENTS.md TEAM-ASSIGNMENTS.md TEAM-WORKFLOW.md TEAM-PLAN.md HANDOFF.md PROJECT-GUIDE.md
├─ CLAUDE.md CODEX.md ANTIGRAVITY.md
├─ README.md ARCHITECTURE.md DATA-MODEL.md JUDGING.md LICENSE
├─ .dogfood.toml  run.py  fixtures.json  acceptance-report.txt
├─ docker-compose.yml  Dockerfile  .env.example
├─ db/
│  ├─ migrations/          [KRISH]   SQL migrations, forward-only
│  └─ seed/                [KRISH]   fixtures importer + fixed demo tokens
├─ src/
│  ├─ contracts/           [KRISH]   Zod schemas + types = shared API contract (write FIRST)
│  ├─ domain/ policy/      [KRISH]   business rules and authorization
│  ├─ judging/ audit/      [KRISH]   scoring integrity and append-only log
│  ├─ repo/ server/        [KRISH]   DB and typed page-data access
│  ├─ app/api/             [KRISH]   thin route handlers calling domain+policy
│  ├─ app/(public)/projects/ [SHRIYASH] SSR gallery and project detail
│  ├─ app/(judge)/ app/(organizer)/ [SHRIYASH] judging and organizer pages
│  ├─ app/(auth)/ app/(participant)/ [NIHAL] auth and participant pages
│  ├─ app/(public)/page.tsx app/(public)/help/ [PRAJWAL] landing and help
│  └─ components/          [PERSON-SCOPED] see TEAM-ASSIGNMENTS.md
├─ tests/
│  ├─ unit/ api/           [KRISH]   math, policy, curl-style API checks
│  └─ e2e/                 [FRONTEND OWNER] browser flows in owned area
└─ scripts/                [KRISH]   acceptance.sh, offline-check.sh
```
Never edit a file in another person's scope without a note in `HANDOFF.md`. If you need a change there, add a request under that person's heading. `TEAM-ASSIGNMENTS.md` resolves any abbreviated path ownership here.

## 5. People and order of work
| Phase | Krish (all backend) | Shriyash (largest frontend) | Nihal (medium frontend) | Prajwal (light frontend) |
|---|---|---|---|---|
| 0 Contract | scaffold; `src/contracts`; policy; DB/seed foundation | Figma system, tokens, base components, gallery card | static login form and flow map | landing hero Figma sketch |
| 1 T1 | auth, teams, projects, deadline, seed, checker 1–3 | public SSR gallery, project detail, app shell | auth, team, draft/edit/submit UI | landing + help pages, link/mobile checks |
| 2 T2 | assignments, rubric, normalization, scoped queries, score/API/CSV, audit, checker 4–7 | judge console and organizer views | participant flow QA and form/error polish | screenshots and visible UI QA |
| 3 Proof | backend docs, tests, Compose/offline and report | visual integration, demo script, e2e | participant e2e and demo assist | screenshots, accessibility/link audit |
| 4 Stretch | T3/bonus only after T1+T2 verified | frontend stretch only after core verified | assist owned flows | no new complex features |

Rule: **contracts first.** Krish publishes `src/contracts` (types for every entity and endpoint) before frontend binds to live data. Teammates may build static UI with clearly marked contract-shaped fixture data in parallel. Only Krish changes a contract; requests go in `HANDOFF.md`.

## 6. The acceptance contract (`run.py`)
Config `.dogfood.toml`:
```toml
[portal]
base_url = "http://localhost:8080"
[tiers]
claimed = ["T1", "T2"]
pitch = "Self-hostable hackathon platform with backend-enforced judging isolation and documented score normalization."
[auth]
organizer   = "Cookie: session=org_7f2a"
judge_a     = "Cookie: session=jdg_a_91bc"
judge_b     = "Cookie: session=jdg_b_44de"
participant = "Cookie: session=prt_2e88"
[routes]
gallery      = "/projects"
submit       = "/projects/new"
judge_scores = "/api/judge/scores"
peer_scores  = "/api/judge/scores?judge=judge_a"
csv_export   = "/api/export.csv"
```
The seed must create these exact sessions, expire them never (demo), and print them on boot. `judge_a` and `judge_b` are different judges, both with scores in the fixtures. `?judge=judge_a` must resolve to judge A's identity; when the caller is judge B it must return 403.

The seven checks and expected statuses:
1. GET gallery no auth -> 200
2. gallery body contains one of the first 3 fixture titles
3. POST submit as participant -> 4xx (deadline past)
4. GET judge_scores as judge_a -> 200
5. GET peer_scores as judge_b -> 401/403
6. GET judge_scores as participant -> 401/403
7. GET csv_export as organizer -> 200, first line contains a comma

Run: `python3 run.py .dogfood.toml > acceptance-report.txt`. Commit the report as-is.

## 7. Domain decisions (do not re-litigate)
- **Roles:** visitor, participant, judge, organizer, admin. Role per user globally plus per-event membership where needed.
- **Score storage:** one row per (judge, project, criterion). Unique constraint. Missing rows are legal (incomplete batches).
- **Rubric:** per-event criteria with weights; validated to sum to 100.
- **Assignment:** k>=3 judges per project; greedy min-load with track eligibility from fixture `judges[].tracks`; exclude judges whose email appears in the project's team; manual override always allowed.
- **Normalization:** per-judge z-score with shrinkage toward the global mean for judges with few ratings; zero-variance judges flagged and mean-centered with reduced weight, never divided by zero; final project score = mean of normalized weighted scores, with `n_reviews` always reported. Full raw -> normalized -> rank-change table generated from fixtures.
- **Duplicates:** normalized title and repo_url comparison; flag for organizer review; never delete.
- **Audit log:** append-only table, each row stores `prev_hash` and `hash`; no UPDATE/DELETE granted to the app role.
- **Timestamps:** UTC everywhere; DB clock is the authority for deadlines.
- **IDs:** keep fixture string ids in the import (e.g. `prj_01`), or map them via `external_id`.

## 8. Definition of done (per task)
- Type-checks, lints, unit and API tests pass.
- Role and deadline behavior verified by a curl-style test, not just UI.
- Works from a clean `docker compose up` with network disabled.
- Docs touched if behavior or schema changed (`DATA-MODEL.md`, `JUDGING.md`).
- `run.py` pass count did not regress.

## 9. Git workflow (four people)
- Follow `TEAM-WORKFLOW.md`: one shared repo, personal branches `team/backend`, `team/shriyash`, `team/nihal`, `team/prajwal`, and PRs into the temporary integration branch `team/assignments`. Use separate clones or worktrees. The current repo already has `main`; do not initialize it again.
- Keep commits and PRs small. Update personal branches from `team/assignments` as contracts and UI merge. Merge integrated work to `main` only when `docker compose up` and `run.py` are green.
- Commit style: `type(scope): message` e.g. `feat(judging): shrinkage z-score`.
- Do not force-push `main`. Do not rewrite others' commits.
- Commit only after kickoff time; never include node_modules, `.env`, uploads.

## 10. Communication files
- `HANDOFF.md`: cross-person requests and status, one heading per person. Read it before starting, update it after finishing.
- `DECISIONS.md`: one line per architectural decision with reason (feeds ARCHITECTURE.md and the Write-Up Quest post).
- `TODO.md`: prioritized backlog with owner tags.

## 11. Escalate to the human when
- The spec or Discord contradicts anything here.
- A tier claim can't be verified by the checker.
- A dependency needs the network at runtime.
- You are about to delete data, force-push, or change the license.
