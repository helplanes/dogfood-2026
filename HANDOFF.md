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

- **29 Sep (Krish, repository owner):** End-to-end verification authorized fixes in Shriyash's UI scope: SSR-safe theme/scroll reveal hydration, organizer dashboard authorization and real metrics, accurate pairwise vote error handling, and an accurate review count in results. These changes are being made in the integration checkout for the walkthrough; Shriyash should review them before merging to his personal branch.

- Ownership change requested by the backend lead: own the largest frontend scope—design system, shared UI, public gallery/project pages, judge console, and organizer views. Do not take backend files.
- The old tool-based lanes have been replaced with person-based routing in `AGENTS.md`, `TEAM-ASSIGNMENTS.md`, `CLAUDE.md`, `CODEX.md`, and `ANTIGRAVITY.md`.
- **REQUEST FOR KRISH (27 Sep):** Judge console (Task 3) is scaffolded with mock data at `src/app/(judge)/dashboard/`. Need two typed page-data functions from `src/repo` or `src/server`:
  1. `getAssignedProjects(judgeId: string): Promise<AssignedProject[]>` — returns only projects assigned to this judge, with existing scores per criterion.
  2. `getAssignedProject(judgeId: string, projectId: string): Promise<AssignedProject | null>` — returns a single assigned project or null if not assigned (frontend shows 404 on null).
  - `AssignedProject` needs: `id`, `title`, `summary`, `repoUrl`, `track`, `teamName`, `existingScores: Partial<Record<Criterion, number>>`.
  - These must be assignment-scoped — must never return another judge's score data.

- **REQUEST FOR KRISH (27 Sep):** Organizer console (Task 4) and Public Gallery (Task 2) are scaffolded visually. Need the following typed accessors:
  1. `getPublicProjects(filter?: string): Promise<PublicProject[]>` — for the gallery.
  2. `getOrganizerLeaderboard(): Promise<LeaderboardEntry[]>` — needs `rank`, `id`, `title`, `track`, `n_reviews`, `rawScore`, `normalizedScore`, and `hasVarianceWarning`.
  3. `getAuditLogs(limit?: number): Promise<AuditLog[]>` — for the append-only audit viewer.
  4. `/api/export.csv` — Route handler needs to be wired up for the CSV export button.


- **STATUS (28 Sep):** Task 1 (Design Tokens + Base UI) is complete. Built the GalleryCard. Task 2 (Project Detail layout) is statically scaffolded, awaiting Krish's getPublicProjects and getPublicProject database accessors. Task 3 (Judge Console & Scoring Form) is functionally built with mock states and strict UI tokens, awaiting getAssignedProject.

- **STATUS FINAL (28 Sep):** Shriyash has functionally scaffolded all assigned frontend pages (Tasks 1-4). We are now fully ready for Backend Integration.

## Nihal

- Ownership change requested by the backend lead: own the medium frontend scope—auth and participant/team/project editing flows. Do not take backend files.
- **29 Sep (Krish, repository owner):** End-to-end walkthrough found that the participant dashboard checklist kept the repository and submission steps unchecked after a successful submission, and demo role switching failed after a password login left an HttpOnly cookie. The integration checkout now derives checklist steps from project data and clears the prior session before applying a demo profile. Please review before your next merge.

## Prajwal

- Ownership change requested by the backend lead: own the light frontend scope—landing/help pages and visual QA/screenshots. Do not take backend files.
