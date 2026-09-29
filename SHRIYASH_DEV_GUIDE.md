# Shriyash's Personal Developer Guide

Welcome back, Frontend Lead. This file is your local quick-reference for the DOGFOOD 2026 portal to ensure you stay in your lane and never trigger a merge conflict with the rest of the team.

## Your Domain (What you own)
You are the **Lead Frontend Developer** and own the largest UI scope. You ONLY edit files in these directories:
1. `src/app/(public)/projects/*` (The Gallery and Project Detail pages)
2. `src/app/(judge)/*` (The Judge Console and Scoring Rubric)
3. `src/app/(organizer)/*` (The Organizer Dashboard, Assignments, Results, and Audit Log)
4. `DESIGN.md` (The Obsidian Kinetic design system source of truth)
5. Components you create under `src/components/*`

## Off-Limits (What causes merge conflicts)
**NEVER** touch these files/directories unless explicitly requested via `HANDOFF.md`:
*   ❌ `src/app/(auth)/*` & `src/app/(participant)/*` (Owned by **Nihal**)
*   ❌ `src/app/(public)/page.tsx` & `/help/*` (Owned by **Prajwal**)
*   ❌ `src/contracts/*`, `db/*`, and `/api/*` (Owned by **Krish**)
*   ❌ `package.json` (Only Krish manages dependencies. Do not install new npm packages).

## Workflow for Zero Conflicts
1. **Pulling latest code**: Krish will merge your Pull Requests into `team/assignments`. When he tells you it's merged, update your branch:
   ```bash
   git fetch origin
   git merge origin/team/assignments
   ```
2. **Pushing your work**:
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   git push origin team/shriyash
   ```
3. **Data Requests**: Your UI is currently running on static mock data. If you need a new data shape or API endpoint, do NOT write it yourself. Add a request under your section in `HANDOFF.md` and tell Krish.

## Status Check
*   ✅ **Dependencies Installed**: `npm install` is up to date.
*   ✅ **Your UI is 100% complete**: We built the entire gallery, judge, and organizer flow. It is fully typed and lint-error free.
*   ✅ **Next Steps**: You are currently waiting for **Krish** to build the backend (Phase 3 Visual Integration). 

Your environment is pristine, dependencies are sorted, and you are locked in on the `team/shriyash` branch. When the backend APIs are ready, we will replace your `mockData` variables with actual `fetch` calls.
