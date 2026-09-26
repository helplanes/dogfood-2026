# Named team assignments and first-session instructions

**Read this after `AGENTS.md` and `SPEC-NOTES.md`.** Note: the official spec puts Figma/mockups out of scope, so Figma steps below are optional sketches; keep them short and spend the time on working, data-backed screens. These assignments are based on the human team member's name, regardless of whether their coding agent is Claude, Codex, Antigravity, or another tool. `TEAM-WORKFLOW.md` gives the exact branch/PR steps; `TEAM-PLAN.md` has the schedule. The backend lead is Krish; Prajwal, Nihal, and Shriyash own frontend work only.

## When someone introduces themselves

If the first request says `hi i am prajwal`, `hi i am nihal`, or `hi i am shriyash` (case-insensitive, spelling as shown), identify that person's section below. Read `AGENTS.md`, this file, `TEAM-WORKFLOW.md`, `HANDOFF.md`, and the relevant contracts. Then:

1. Tell them their **one-sentence assignment**, their exact first task, and the files they may edit.
2. Inspect the current repo and branch. Work on that person's branch from `team/assignments` per `TEAM-WORKFLOW.md`; never commit their task on `main` or another person's branch. Start the first task if the scaffold and files exist. If the app is not scaffolded, make only a Figma/wireframe or task brief and a precise `HANDOFF.md` request; do not scaffold or invent backend contracts.
3. Work in a small branch/PR. Report changed files, a screenshot or UI check, commands run, and blockers. Continue with the next listed task only after the first slice is reviewable.

Do not ask the person to choose a role or reread a giant task list. Do not assume that the AI tool name determines the owner. If the name is missing or different, ask who is using the agent before changing files.

## Shared boundaries for all three teammates

- Frontend only: Next.js pages, components, styles, local static assets, Figma designs, screenshots, and frontend/e2e checks in owned paths.
- Krish alone owns `src/contracts`, `src/domain`, `src/policy`, `src/judging`, `src/audit`, `src/repo`, `src/server`, `src/app/api`, `src/app/projects/new/route.ts`, `db`, Docker/Compose, migrations, seed, backend tests, `.dogfood.toml`, and backend docs. Do not let an AI assistant modify those files or `package.json`/lockfile during a frontend task.
- Use published Zod/types and the backend page-data interface. If missing, build with clearly marked contract-shaped sample data and request fields/endpoints in `HANDOFF.md`. Never invent a live API or fetch peer judge scores.
- All external fonts/images must be downloaded and committed as local assets. The portal cannot depend on Figma, Antigravity, Claude, OmniRoute, CDNs, or hosted APIs at runtime.
- Each PR should contain one screen or component slice, not an entire generated app. Run typecheck/lint if available, open the page in a browser, and capture a screenshot. Krish reviews API integration and merge readiness.

## Shriyash — largest frontend scope and frontend lead

**Mission:** own the visual system and the public, judge, and organizer experiences. Coordinate frontend consistency and review Nihal's and Prajwal's UI work, but do not change their owned page files without a handoff.

**Own these paths:** `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ui/**`, `src/components/judging/**`, `src/components/organizer/**`, `src/app/(public)/projects/**`, `src/app/(judge)/**`, `src/app/(organizer)/**`, Figma design system, and screenshots for those screens. Krish owns the backend `src/app/projects/new/route.ts`; it is not your page.

**Order of tasks:**

1. Make one Figma board: color/type/spacing/focus tokens, button/input/card/table, desktop and mobile gallery. Implement tokens, base button/input/card, and app shell in a small first PR. Share component usage with Nihal and Prajwal.
2. Build public `/projects` as a Server Component. Fixture project titles must be in initial HTML, visible without auth, and one of the first three fixture projects must be on page one. Add project detail. Use Krish's typed public read function.
3. Build the judge assigned-project list and scoring form using only assignment-scoped data supplied by Krish. Add saved/error states and keyboard-friendly controls.
4. Build organizer rubric editor, assignment board, progress dashboard, results with `n_reviews` and raw/normalized scores, CSV link, and audit viewer. Keep incomplete scores and zero-variance flags visible.
5. Run responsive/accessibility pass across the frontend and assemble the five-minute demo script with the team.

**Your exact first task:** inspect the repo, then make the Figma design board and implement **only** tokens plus one reusable gallery card after the app scaffold exists. Do not generate all screens at once. Deliver Figma link/export, changed-file list, and desktop/mobile screenshots.

**Done checks:** public gallery HTML has fixture titles; judge UI shows only assigned work; organizer views show review counts; responsive and keyboard checks pass. Backend authorization remains Krish's responsibility.

## Nihal — medium frontend scope

**Mission:** own the participant journey from sign-in through team formation and project submission.

**Own these paths:** `src/app/(auth)/**`, `src/app/(participant)/**`, `src/components/participant/**`, screenshots and frontend/e2e checks for those flows. Use Shriyash's shared UI components; request changes instead of editing `src/components/ui/**`.

**Order of tasks:**

1. Build the login form with labeled fields, validation, 401 error, and responsive layout. Use a static contract-shaped state first; connect Krish's auth API when ready.
2. Build signup/session state and participant dashboard.
3. Build team create/join/invite screens with clear success/error states.
4. Build project draft/edit/submission at `/dashboard/projects/new`, using Krish's canonical API. Handle deadline 4xx inline. The official fixture event is closed; use a separate open demo event for a successful submission flow.
5. Manually test login → team → draft → edit → submit and the closed-event rejection; add focused frontend/e2e checks if tooling exists.

**Your exact first task:** inspect the repo, then implement **only** a static login form with visible validation and server-error states using existing UI components. Show the changed-file list and desktop/mobile screenshots before wiring the API.

**Done checks:** forms are labeled and keyboard usable; denials are shown inline; no participant page assumes that hiding a button enforces permission; flows use published contracts.

## Prajwal — deliberately light frontend scope

**Mission:** make the public first impression clear and help verify the visible experience. No judge, organizer, participant, or backend implementation.

**Own these paths:** `src/app/(public)/page.tsx` (home/landing), `src/app/(public)/help/**`, `src/components/landing/**`, local assets used only by those pages, and `docs/screens/landing/**`. Ask Shriyash before changing global styles or shared components.

**Order of tasks:**

1. Sketch a simple landing hero and navigation in Figma using Shriyash's design tokens. One clear action should go to `/projects`.
2. Implement the landing page with the approved shared components. Keep it server-rendered, responsive, and readable with JavaScript off.
3. Add a short help page explaining participant, judge, and organizer paths in plain language, without claiming unfinished features work.
4. Capture mobile/desktop screenshots and manually check broken links, readable text, alt text, focus order, and overflow. Report defects to the relevant owner rather than editing their files.

**Your exact first task:** inspect the repo, then make **only** a Figma sketch for the landing hero and implement that hero after Shriyash's tokens exist. Deliver the Figma link/export, one desktop/mobile screenshot pair, and any asset sources.

**Done checks:** landing opens without auth, its `/projects` link works, the mobile layout has no horizontal overflow, and help copy matches implemented behavior.

## Copy-paste first message

Each teammate can send this exact form to their coding agent from the repository root:

> Hi, I am Prajwal. Let me know the task I am assigned and how I should get started with it.

Replace `Prajwal` with `Nihal` or `Shriyash`. The agent must follow the matching section above and start its first small task. If the tool does not automatically read repository instructions, prepend: `Read AGENTS.md and TEAM-ASSIGNMENTS.md first.`
