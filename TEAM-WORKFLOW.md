# Where the four people push code

**Repository:** `https://github.com/helplanes/hackit` (`origin` in this clone). Everyone uses this one repository. Figma is for design; source code, local assets, docs, and tests go to GitHub. No one deploys or publishes a separate frontend/backend repository.

**Temporary integration base:** `team/assignments` contains the named onboarding instructions. Until the application passes clean `docker compose up` and `run.py`, use it as the shared integration branch. `main` stays untouched. Check that this branch is visible on GitHub before telling teammates to clone it; local Git has a tracking ref, but remote availability must be confirmed.

## One branch and one PR per person

| Human | Branch | Pushes | PR base | Reviewer |
| --- | --- | --- | --- | --- |
| Krish | `team/backend` | contracts, DB, APIs, judging, Docker, tests | `team/assignments` | Krish runs backend and checker gates; another teammate may review UI-facing contract clarity |
| Shriyash | `team/shriyash` | shared UI, gallery, judge and organizer pages | `team/assignments` | Krish for integration/security; Nihal for a second UI look when available |
| Nihal | `team/nihal` | auth and participant pages | `team/assignments` | Shriyash for UI; Krish for API connection |
| Prajwal | `team/prajwal` | landing/help pages and screenshots | `team/assignments` | Shriyash for visual consistency |

Each person pushes **only their own branch** to `origin`. They open a GitHub pull request with **base `team/assignments`** and compare set to their own branch. GitHub lets the PR author choose the base branch; verify it before creating the PR. Do not push directly to `main` or another person's branch.

## First-time setup for a teammate

1. Krish invites each teammate as a collaborator to the GitHub repository. Each person uses their own GitHub account and clone on their own machine.
2. Confirm `team/assignments` is visible in GitHub's branch list. Clone the repo, fetch branches, and create the personal branch from `origin/team/assignments`.
3. Start the coding agent **from the repo root** and send: `Hi, I am Shriyash. Let me know the task I am assigned and how I should get started with it.` Substitute the person's own name. If the tool does not load repository rules automatically, prepend `Read AGENTS.md and TEAM-ASSIGNMENTS.md first.`
4. Complete only the first small task from `TEAM-ASSIGNMENTS.md`. Commit it with a clear message, push the personal branch, and open a PR to `team/assignments`. Include screenshots, commands run, and any backend contract request.

The Git commands for Shriyash, after cloning, are:

```sh
git fetch origin
git switch -c team/shriyash origin/team/assignments
# work on owned files, then:
git add <owned-files>
git commit -m "feat(frontend): add gallery card"
git push -u origin team/shriyash
```

Nihal and Prajwal replace `team/shriyash` with their own branch name. Krish uses `team/backend`. In later sessions, `git push` sends commits to the person's own branch after the first `-u` push.

## Daily rhythm and integration

1. At each short sync, every person posts **done / next / blocked** and a PR link. Backend field requests go under Krish's heading in `HANDOFF.md` with screen, field, example value, and error states.
2. Keep PRs to one screen or component slice. The reviewer checks file ownership, screenshots, accessibility, contracts, and no runtime network calls. Krish checks every API-facing PR.
3. Krish merges reviewed PRs into `team/assignments`. After each merge, the team fetches that branch into their personal branch. Do not force-push or edit another person's branch to resolve a conflict; ask the owner.
4. Krish runs typecheck, lint, focused tests, and the seven checker requests as the app becomes available. If integration breaks, fix it on the responsible personal branch before adding new screens.
5. Only after a clean seeded Compose start, offline runtime check, and honest `run.py` report does Krish bring the integrated work to `main`, following the repo's main-branch gate. Protect `main` from direct pushes and require a PR review; GitHub supports these branch protection options.

## What goes where

- **GitHub repository:** all code, local assets, tests, docs, migrations, and final acceptance report.
- **Personal branches:** unfinished work. A push is a backup and a way to open a PR; it does not change integration or `main`.
- **`team/assignments`:** reviewed work the whole team can build against during the sprint.
- **`main`:** the verified submission state. Never use it as a scratchpad.
- **Figma:** one shared design file led by Shriyash. Export required assets into the repo; the running app does not call Figma.
- **`HANDOFF.md`:** requests that cross ownership boundaries. The GitHub PR is the place for code review and screenshots.

GitHub references: [creating a pull request and choosing its base](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request), [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
