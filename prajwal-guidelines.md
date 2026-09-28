# Prajwal's Workflow & Scope Guidelines

These guidelines ensure proper collaboration and zero merge conflicts based on the team's rules in `TEAM-ASSIGNMENTS.md` and `TEAM-WORKFLOW.md`.

## 1. Branching & Version Control
- **Your Branch**: You will ALWAYS work on `team/prajwal`.
- **Target Branch**: You will open Pull Requests against `team/assignments`.
- **Strict Rule**: NEVER push to `main` or any other team member's branch (e.g., `team/shriyash`, `team/nihal`, `team/backend`).
- **Syncing**: When PRs are merged into `team/assignments`, pull those changes into `team/prajwal` to stay up to date.

## 2. Your Scope (Frontend ONLY)
**Mission**: Make the public first impression clear and help verify the visible experience.
- **Owned Paths**: 
  - `src/app/(public)/page.tsx` (home/landing)
  - `src/app/(public)/help/**`
  - `src/components/landing/**`
  - `docs/screens/landing/**`
  - Local assets used ONLY by these pages.
- **Out of Scope**: 
  - Backend integration, Docker, database, judging, or organizer logic (Krish's scope).
  - Auth, Participant screens (Nihal's scope).
  - You CANNOT change `src/components/ui/**`, `src/app/globals.css`, or other shared assets without Shriyash's explicit handover.

## 3. Immediate First Task
Currently, the application is **not scaffolded** (no `package.json` or code files exist yet). Based on the team rules, we MUST NOT scaffold the app ourselves.

Your exact first task is:
1. Make a **Figma sketch** for the landing hero and navigation. 
2. One clear call to action should direct users to `/projects`.
3. Wait for Shriyash to create the shared design tokens before we start implementing the code.
4. Once tokens exist, we implement the landing page, make sure it works without JS, is responsive, and then deliver a desktop/mobile screenshot pair + Figma link.

## 4. Dependencies & Extensions
Since there is currently no codebase (only documentation and planning files), there are no `npm` packages, extensions, or Docker containers to download or run right now. We are currently blocked from coding until the base scaffold is added (presumably by Krish/Shriyash). We will only focus on the Figma mockups and task briefs right now.

## 5. Handoffs
If you need any API fields or shared UI component modifications, we will request them formally by adding an entry in `HANDOFF.md` rather than directly changing Krish's or Shriyash's files.
