# Team handoffs

Updated 26 Sep 2026. Each owner adds requests and status under their heading. A request changes ownership only when the owner accepts it.

Shared workflow: `TEAM-WORKFLOW.md` records where each owner pushes and how PRs reach the integration branch. Agents must read it before starting their first task.

## Backend lead (Krish)

- Own all backend, contracts, policy, data, judging, infrastructure, APIs, tests, and checker integration.
- Provide frontend contracts and typed page-data functions before teammates connect real data.
- 27 Sep: scaffold on `team/backend` (npm, Next 16, Tailwind 4, Drizzle, Vitest). `src/contracts/index.ts` is contract v0; `/api/health` works. Placeholder `layout.tsx`, `globals.css`, `(public)/page.tsx`, `(public)/projects/page.tsx` exist only so routes build; their owners replace them wholesale. Package changes go through Krish.

**Requests from Nihal:**
- **App Scaffolding:** I am ready to build the login form, but the Next.js app has not been scaffolded yet (`package.json`, `src/`, etc.). Please run the initial setup and provide the base repository.
- **Auth Contract:** I need the API shape for `/api/v1/auth` (login).
  - **Screen:** Login Page (`/login`)
  - **Fields Needed:** `email` (string), `password` (string).
  - **Expected Returns:** Success (session token/cookie setup) or Error messages (e.g., "Invalid credentials").

## Shriyash

- Ownership change requested by the backend lead: own the largest frontend scope—design system, shared UI, public gallery/project pages, judge console, and organizer views. Do not take backend files.
- The old tool-based lanes have been replaced with person-based routing in `AGENTS.md`, `TEAM-ASSIGNMENTS.md`, `CLAUDE.md`, `CODEX.md`, and `ANTIGRAVITY.md`.

## Nihal

- Ownership change requested by the backend lead: own the medium frontend scope—auth and participant/team/project editing flows. Do not take backend files.

## Prajwal

- Ownership change requested by the backend lead: own the light frontend scope—landing/help pages and visual QA/screenshots. Do not take backend files.
