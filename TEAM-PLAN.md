# DOGFOOD Portal: four-person execution plan

Updated 26 Sep 2026. Code freeze: **28 Sep 2026, 18:00 UTC**. Krish owns the entire backend. Shriyash owns the largest frontend scope, Nihal a medium scope, and Prajwal a light scope. Their exact first-session instructions are in `TEAM-ASSIGNMENTS.md`; branch, push, and PR steps are in `TEAM-WORKFLOW.md`.

## 0. Source of truth and current state

- Read `AGENTS.md`, `PROJECT-GUIDE.md`, and the [official event spec](https://doogfoodhack.com/spec/) before coding. The official [checker](https://doogfoodhack.com/spec/run.py), [fixture data](https://doogfoodhack.com/spec/fixtures.json), and [spec.md](https://doogfoodhack.com/spec/spec.md) are downloadable now. Save the original files in the repo; do not rewrite the checker or fixture data.
- This repo now has a `main` branch and the team instructions, but still needs the official files and application scaffold. Inspect current state before following any setup step.
- `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, and `ANTIGRAVITY.md` now route by **human name**, not AI tool. `TEAM-ASSIGNMENTS.md` is the current scope map.
- The fixture uses `event.submissions_close`; map it explicitly to the database's `events.submission_deadline`. The fixture deadline must remain in the past.
- The official checker allows configurable URLs through `.dogfood.toml`. This project keeps the specified `POST /projects/new` checker path. Make it a thin backend route alias; put the human editor at `/dashboard/projects/new`. Next.js does not allow `page.tsx` and `route.ts` at the same URL. Keep `/api/v1/projects` as the canonical mutation API.

## 1. People and file ownership

| Person | Owns | Deliverables | Must not change without a handoff |
| --- | --- | --- | --- |
| **Krish: backend lead and integrator** | `src/contracts`, `src/domain`, `src/policy`, `src/judging`, `src/audit`, `src/repo`, `src/server`, `src/app/api`, `src/app/projects/new/route.ts`, `db`, Docker, seed, API/unit tests, backend docs and checker config | Data model, typed contracts, auth, all authorization, deadlines, scoring, exports, seeded Compose, final integration | Frontend page/component files |
| **Shriyash: frontend lead, largest scope** | Design system, shared UI, public gallery/project detail, judge console, organizer views | Visual system, SSR gallery, judge/organizer workflow, responsive integration, demo script | Backend code or Nihal/Prajwal pages |
| **Nihal: participant frontend, medium scope** | Login/signup, team/invite flow, participant dashboard, project draft/edit/submission | Complete participant journey, inline 4xx handling, keyboard and no-JS reading behavior | Backend, shared UI, judge/organizer pages |
| **Prajwal: public landing, light scope** | Landing and help pages, local assets for those pages, screenshots and visible QA | Simple public first impression, working `/projects` link, responsive/help checks | Backend, shared UI, participant/judge/organizer pages |

Shriyash owns shared components, but Nihal and Prajwal can request additions via `HANDOFF.md`. All frontend pages consume Krish's contracts and server read functions or API endpoints. They do not query PostgreSQL directly or implement permission checks as the security boundary. Krish reviews every API-facing change before merge.

## 2. What everyone needs before starting

**Shared files/accounts:** one shared Git repository; the three official files above; `.dogfood.toml` created from the official example; `HANDOFF.md`, `DECISIONS.md`, `TODO.md`; an OSI-approved license selected by the team; a single board with owner, dependency, and acceptance criterion for each task. Only one person changes package dependencies and lockfile (you).

**Local tools:** Git, Node **22** (the current local `node` is 24.9.0, so pin 22 with `.nvmrc` or the team's version manager), npm, Python 3, Docker Engine/Desktop with Compose, and a browser. Docker is not currently on this machine's `PATH`; install or make it available before promising a Compose test. Figma is optional; export any used assets locally. No paid accounts or hosted services are needed at runtime.

**Skills to learn just in time:** all three teammates need only the minimum TypeScript/React needed to edit a component, Next.js App Router page vs Client Component, semantic HTML, accessible forms, Tailwind classes, typed API consumption, and Git branch/PR workflow. Give each teammate a 20-minute walkthrough of the running scaffold and one example page before assigning a flow. Shriyash focuses on design, SSR and dense judging screens; Nihal on forms and errors; Prajwal on a simple landing page and visible QA.

**Optional AI skill packs:** if using this Codex setup, Shriyash can use `frontend-design:frontend-design` for visual direction; Nihal and Prajwal can use `vercel:nextjs` for App Router conventions; the final integrator can use `vercel:verification`. The team does **not** need to author custom `SKILL.md` files during this sprint. Install no plugin that introduces a network runtime dependency. Keep generated images and fonts in the repository.

**Their actual tool workflow:** Shriyash makes one small Figma board with colors, typography, buttons, fields, gallery card, and desktop/mobile gallery layouts. Antigravity turns one approved Figma screen at a time into code. Claude reviews the generated code against the shared contract and checklist, then helps fix one defect at a time. If they use [OmniRoute](https://github.com/yusatrn/omniroute), treat it only as a development-time model gateway; never put its client, keys, URL, or provider calls in the portal. They do not need all three AI tools open for every task. One implementation tool and one review pass is enough.

**Beginner-safe working loop for every screen:**

1. Read the one-page task brief and the exact contract types. List the screen's visible states: normal, empty, loading, validation error, 401/403, and narrow mobile layout.
2. Sketch or select the Figma frame. Ask you to approve the fields and flow before generating code.
3. Ask Antigravity for **one page or component**, with the allowed file paths in the prompt. Run the page locally and take a screenshot.
4. Ask Claude to review the changed diff for wrong imports, invented API fields, browser-only rendering, missing labels, and forbidden backend edits. Fix only the defects it identifies that are supported by the contract.
5. Run `npm run typecheck` and `npm run lint` if present, then manually test the screen with the seeded role. Paste a screenshot and the exact command output into the PR. Ask you to merge it.

When blocked by a missing backend field, they create a `HANDOFF.md` request with the screen, field name, example value, and why it is needed. They continue with another static screen while you decide the contract change. Do not let an AI tool silently edit `package.json`, route handlers, contracts, or policy as part of a frontend screen task.

## 3. First 2–3 hours: establish the contract

1. **You:** download and inspect the official files. Confirm actual fixture keys, first three project titles, judge identities, and the checker's exact request behavior. Record differences from `AGENTS.md` in `DECISIONS.md` and update the shared instructions.
2. **Krish:** use the existing `main` branch, then create one branch/worktree or clone per person. Add `.gitignore`, `.nvmrc`, package manifest and lockfile, and `TODO.md`/`DECISIONS.md`. `HANDOFF.md` already exists. Suggested branches: `team/backend`, `team/shriyash`, `team/nihal`, `team/prajwal`.
3. **You:** publish `src/contracts` first: entity types, Zod request/response schemas, endpoint table, role/action table, and a typed server-side page-data interface. Define nullable/missing scores and review counts. Commit this small slice before teammates bind pages to data.
4. **Shriyash:** produce design tokens, type scale, spacing, colors, focus styles, base component inventory, and a gallery wireframe. Build with local assets only; use contract-shaped fixture objects while backend is pending.
5. **Nihal:** map login, team, and project form states; request backend reads/mutations in `HANDOFF.md`; begin a static login form.
6. **Prajwal:** sketch a landing hero in Figma and wait for Shriyash's tokens before implementing it. Request only the public fields needed for a simple event summary.

**Gate 0:** everyone can run the scaffold; contracts compile; owners agree on route names and response shapes; the first fixture titles and past deadline are recorded. No teammate invents a private API shape.

**Starter tasks for newcomers:** Shriyash's first PR is tokens + one gallery card; Nihal's is a static login form with labeled inputs and error state; Prajwal's is a landing hero after tokens are ready. Each should touch at most a few frontend files. Review those PRs immediately, then assign the next screen.

**Target checkpoints (UTC, adjust to the team's actual availability):**

| By | Gate | Decision if missed |
| --- | --- | --- |
| 26 Sep 19:00 | Repo, official files, contracts, design direction, first tiny frontend PRs | Stop new screen work; unblock setup/contracts. |
| 27 Sep 07:00 | T1 checker checks 1–3, participant happy path on a separate open event | Move people from polish to T1 bugs. |
| 27 Sep 22:00 | T2 checker checks 4–7 and judge/organizer core flows | Cut extra views and T3; fix isolation/export first. |
| 28 Sep 08:00 | Clean seeded Compose, docs and normalization proof | Freeze features. |
| 28 Sep 14:00 | Video, final report and submission package ready | Use remaining four hours only for urgent fixes and submission. |

These are integration targets, not a request that anyone work nonstop. Assign a backup reviewer when you sleep so small frontend PRs keep moving; backend contract changes still wait for you.

## 4. T1 build: core portal

**You:** create forward-only SQL migration; idempotent fixture importer and exact fixed demo sessions; DB-backed session lookup, argon2id password auth, `authorize()` deny-by-default policy, event/team/project repositories, and server-clock deadline check. Provide public page-data functions for event/gallery/detail and authenticated page-data functions for participant pages. Make `POST /projects/new` a backend alias returning a raw 4xx for the closed fixture event. Create a second, clearly labeled open demo event if the live demo needs a successful submission; never alter the official fixture deadline.

**Shriyash:** build public gallery/detail pages. `/projects` must send project titles in initial HTML, require no cookie, and show one of the first three fixture projects on page one. Add search/filter only after that works. Own the base layout and reusable components that Nihal/Prajwal consume.

**Nihal:** build login/signup, team invite, draft editor, and closed-deadline states. Put the human editor at `/dashboard/projects/new`; send mutations to the canonical backend API. Show the server's 4xx message inline. Do not redirect a denied form POST to a successful page.

**Prajwal:** build the landing and help pages, then check links and mobile layout. Record defects in others' pages for their owners to fix.

**Gate T1:** clean seeded Compose serves `localhost:8080`; checker items 1–3 PASS; a separate open event can complete sign in → team → draft → submit; unauthorized curl requests fail with 401/403; T1 docs reflect reality.

## 5. T2 build: judging integrity and operations

**You:** implement rubric validation (weights total 100), track-eligible conflict-aware assignments, score upsert with `(judge, project, criterion)` uniqueness, assignment-scoped judge reads/writes, organizer progress and CSV, duplicate flags, audit chain, and normalization. For zero-variance judges, avoid division by zero and document reduced weight; include `n_reviews` in every result. Build raw → normalized → rank-change proof from fixture data. Add API tests for `judge_b` asking for judge A's scores, participant access, unassigned projects, path/query variations, and export/dashboard bypasses.

**Shriyash:** wire assigned-project list and keyboard-friendly scoring form first, then rubric editor, assignment board, organizer dashboard/results, CSV link, and audit viewer. Show incomplete reviews and zero-variance flags honestly. Never fetch peer scores from a judge session.

**Nihal:** finish participant error states and browser checks. **Prajwal:** capture screenshots and report visible layout/link issues. Avoid T3 while T2 has gaps.

**Gate T2:** all seven official checks PASS; another judge's scores never leave the backend for a judge session; participant cannot use judge routes; organizer CSV starts with a comma-separated header; normalization proof is reproducible from fixtures.

## 6. Freeze preparation and launch evidence

1. Run `tsc --noEmit`, lint, unit tests, API tests, and the seven official checker requests after every integration merge. Vitest alone does not type-check.
2. Test from a fresh database. Build/pull images and install dependencies first, then turn off Wi-Fi and run the already-built stack to prove **runtime** independence. Verify fonts/images are local and app-to-Postgres traffic still works on the Compose network.
3. Finish `README.md` (one-command run, credentials, limitations), `ARCHITECTURE.md`, `DATA-MODEL.md`, `JUDGING.md`, LICENSE and `docs/DEMO-SCRIPT.md`. Capture the five-minute video: public gallery → participant on a new open event → team/draft/submit → judge scoring → organizer dashboard/CSV/results → isolation check.
4. Run `python3 run.py .dogfood.toml > acceptance-report.txt` and commit its output unchanged. Claim only verified tiers. Keep an explicit limitation list for any unfinished workflow.
5. Reserve the final **four hours before 28 Sep 18:00 UTC** for bug fixes, clean-start verification, docs, video/upload, and submission. Add T3 only if all T1/T2 gates are green and the demo is secure.

## 7. Collaboration cadence and merge rules

- Hold a 10-minute kickoff and two 10-minute syncs each day. Each person reports **done / next / blocked / contract change needed** with a branch or commit link.
- Every PR has one owner and one reviewer. Krish reviews backend/security and all API integration; Shriyash reviews visual consistency in Nihal's and Prajwal's pages; Nihal can review Prajwal's simple form/link behavior. Keep PRs small enough to merge within an hour.
- Do not merge a broken `main`. Rebase before merge, run the relevant tests, then rerun the checker after merging. Log contract changes in `HANDOFF.md` before implementation and update types in one backend-owned commit.
- Escalate spec contradictions, unverified tier claims, runtime network needs, data deletion, force-push, and license changes to you immediately. Prefer dropping scope to weakening security or falsifying the checker report.

## 8. Copy-ready prompts

For a one-line start, each teammate can simply introduce themselves as shown in `TEAM-ASSIGNMENTS.md`; the repo instructions route them. The longer prompts below are for assigning a later phase explicitly.

### Shared preamble

> Read `AGENTS.md`, `TEAM-ASSIGNMENTS.md`, `PROJECT-GUIDE.md`, and `TEAM-PLAN.md`. The official source is https://doogfoodhack.com/spec/. Krish owns the entire backend. Shriyash, Nihal, and Prajwal have separate frontend scopes, with Shriyash the largest and Prajwal the lightest. Work only in your assigned files and branch. Use published `src/contracts`; request changes in `HANDOFF.md` instead of inventing API fields. Keep all runtime assets local. Before a PR, report files changed, screenshots or curl/test evidence, known gaps, and any contract request. Never claim a checker result you did not run.

### Prompt for you: backend lead

> Own contracts, database, seed, auth/policy, repository, judging, API routes, Docker, tests, and checker integration. Begin by reading the actual `fixtures.json` and `run.py`, then publish Zod schemas and the endpoint/page-data contract. Use PostgreSQL time for submission deadlines and `authorize()` on every route. Make judge reads assignment-scoped in the repository. Seed the four exact demo sessions and map `submissions_close` to the DB deadline. Get checker checks 1–3 green before T2, then 4–7. Supply typed server read functions and documented mutation APIs for the frontend team. Each handoff must include endpoint, method, input/output schema, auth role, error statuses, example data, and whether it is ready or mocked. Run tests, checker, and clean seeded Compose before merging.

### Prompt for Shriyash: design, public, judge, and organizer frontend

> Own shared visual tokens/components, public gallery/project-detail, judge console, and organizer pages. Start with a compact, accessible design system using self-hosted assets and Tailwind. Build `/projects` as a Server Component that emits fixture project titles in the initial HTML; show first fixture projects on page one. Then build assigned judge scoring and organizer rubric, assignment, dashboard, results, CSV and audit views using Krish's contracts. Deliver responsive desktop/mobile views, focus states, error states, component guidance, screenshots, and a demo script. Do not edit backend/contracts or Nihal/Prajwal pages; log missing fields in `HANDOFF.md`.

> **First AI task:** Create one Figma frame and implement only the gallery card plus tokens. Show me the Figma frame, changed file list, and desktop/mobile screenshots. Wait for review before building the entire gallery.

### Prompt for Nihal: participant frontend

> Own login/signup, team/invite, participant dashboard, and project draft/edit/submission screens. Build the editor at `/dashboard/projects/new`; use the published backend mutation API. Handle 401/403 and passed-deadline 4xx responses inline with clear text. Make forms keyboard usable, keep labels and validation messages accessible, and support reading with JavaScript disabled. Use typed contracts only; request missing fields in `HANDOFF.md`. Demonstrate login → join/create team → draft → edit → submit on a separate open event, and show the closed fixture event refusing submission.

> **First AI task:** Implement only a static login form with visible validation and server-error states. Use existing shared inputs/buttons if available. Show the changed file list and a screenshot before connecting the API.

### Prompt for Prajwal: landing and visible QA

> Own only the public landing/help pages and visible UI QA. Sketch a simple landing hero in Figma using Shriyash's tokens, then implement it with one clear `/projects` link. Add a short help page that describes only implemented flows. Keep the pages server-rendered, responsive, readable without JavaScript, and accessible. Capture desktop/mobile screenshots and report broken links, overflow, or accessibility issues to the page owner. Do not edit backend/contracts, shared UI, judge/organizer, or participant pages.

> **First AI task:** Sketch only the landing hero in Figma; after Shriyash's tokens exist, implement just that hero. Show the Figma frame, changed file list, and desktop/mobile screenshots before building the help page.

### Copy-ready review prompt for Claude after every frontend PR

> Review this frontend diff against `AGENTS.md`, `TEAM-PLAN.md`, and `src/contracts`. List only concrete defects with file/line references: invented fields or endpoints, changed backend/security files, accessibility problems, client-only rendering of public content, wrong 4xx handling, runtime network dependencies, and TypeScript errors. Do not redesign the page. Suggest the smallest fixes and a manual browser check. If a contract is missing, write a proposed `HANDOFF.md` request instead of changing backend code.

## 9. References to copy patterns from

- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components): default server rendering for gallery and page-data calls.
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) and [authentication guide](https://nextjs.org/docs/app/guides/authentication): request parsing and per-handler authorization with raw 401/403 responses.
- [Next.js route resolution](https://nextjs.org/docs/app/getting-started/route-handlers): do not place `page.tsx` and `route.ts` at the same URL.
- [Drizzle migrations](https://orm.drizzle.team/docs/migrations) and [configuration](https://orm.drizzle.team/docs/drizzle-config-file): generate and apply committed SQL. Pin ORM and Kit to compatible versions; do not mix 0.x and v1 migration formats.
- [Docker Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/): database healthcheck, completed migration/seed job, then app.
- [Next.js standalone output](https://nextjs.org/docs/pages/api-reference/config/next-config-js/output): explicitly copy `public` and `.next/static` into a standalone image.
