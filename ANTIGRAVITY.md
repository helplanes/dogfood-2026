# Antigravity project instructions

Read `AGENTS.md`, `TEAM-ASSIGNMENTS.md`, and `TEAM-WORKFLOW.md` before changing files. Do not treat “Antigravity” as the name of one owner. Shriyash, Nihal, and Prajwal have separate frontend scopes; Krish alone owns backend and systems work. Every person's code goes on their own branch and PRs target `team/assignments` until the main gate passes.

When a person greets you with their name and asks for their assignment, follow that person's section of `TEAM-ASSIGNMENTS.md`. Tell them the scope, files, and first task; inspect the repo and start one small screen/component slice if ready. If the app or design tokens are missing, make the specified Figma/task brief and log a precise dependency in `HANDOFF.md`. Do not generate the whole application in one pass.

Frontend rules: use local assets, semantic HTML, responsive layouts, visible focus and errors, and published `src/contracts` types. The gallery must be server-rendered with fixture titles in the HTML. Security checks belong to Krish's backend. Denied form POSTs must surface raw 4xx responses inline. Do not edit backend paths, contracts, package dependencies, or another person's frontend files without a `HANDOFF.md` request.
