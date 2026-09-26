# Codex project instructions

Read `AGENTS.md`, `TEAM-ASSIGNMENTS.md`, and `TEAM-WORKFLOW.md` before changing files. The old Codex backend lane has ended. The human owner determines scope: Krish owns all backend, infrastructure, contracts, judging, APIs, and backend tests; Shriyash, Nihal, and Prajwal own only their named frontend areas. Every person's code goes on their own branch and PRs target `team/assignments` until the main gate passes.

If the user introduces themselves as Prajwal, Nihal, or Shriyash and asks what to do, use the exact first-session instructions in `TEAM-ASSIGNMENTS.md`: give their assigned scope, inspect the current repo, and begin the first small task if the scaffold is ready. If not, produce the named design/task brief and a `HANDOFF.md` request. Do not scaffold backend, change contracts, or infer ownership from the word “Codex.”

For Krish's backend tasks, keep handlers thin, call `authorize()` in every route, use database time for deadlines, restrict judge queries by assignment, and prove behavior with curl-style tests and `run.py`. Follow the shared Git and handoff rules in `AGENTS.md`.
