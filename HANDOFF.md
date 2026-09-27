# Team handoffs

Updated 26 Sep 2026. Each owner adds requests and status under their heading. A request changes ownership only when the owner accepts it.

Shared workflow: `TEAM-WORKFLOW.md` records where each owner pushes and how PRs reach the integration branch. Agents must read it before starting their first task.

## Backend lead (Krish)

- Own all backend, contracts, policy, data, judging, infrastructure, APIs, tests, and checker integration.
- Provide frontend contracts and typed page-data functions before teammates connect real data.
- 27 Sep: scaffold on `team/backend` (npm, Next 16, Tailwind 4, Drizzle, Vitest). `src/contracts/index.ts` is contract v0; `/api/health` works. Placeholder `layout.tsx`, `globals.css`, `(public)/page.tsx`, `(public)/projects/page.tsx` exist only so routes build; their owners replace them wholesale. Package changes go through Krish.

## Shriyash

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

## Nihal

- Ownership change requested by the backend lead: own the medium frontend scope—auth and participant/team/project editing flows. Do not take backend files.

## Prajwal

- Ownership change requested by the backend lead: own the light frontend scope—landing/help pages and visual QA/screenshots. Do not take backend files.
