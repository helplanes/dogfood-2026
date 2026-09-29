# API

Bonus: API First. `openapi.json` is the source of truth — 32 documented paths, every one of them backing something the UI can actually do. This file is the human-readable index.

Load `openapi.json` into any OpenAPI viewer (Swagger UI, Redocly, Postman's "Import") to browse it interactively, or read it directly.

## Auth

A session cookie (`Cookie: session=<token>`), set by `POST /api/auth/login` or `POST /api/auth/signup`, or one of the fixed demo tokens the seed script prints (`docker compose up` output). No API key, no OAuth — one mechanism for both a human logging in through the UI and a script calling the API directly.

Every denial is a raw 4xx JSON body (`{"error": "..."}`), never a redirect — verified by `run.py`, the official checker.

## What's covered

Every route below backs a real UI action; there is no UI behavior that only exists client-side.

| Area | Routes |
|---|---|
| Auth | `POST /api/auth/{signup,login,logout}` |
| Public gallery | `GET /api/projects`, `GET /api/projects/{id}/public` |
| Teams | `POST /api/teams`, `POST /api/teams/join`, `GET /api/teams/me` |
| Submissions | `POST /projects/new`, `GET /api/projects/mine`, `GET\|PATCH /api/projects/{id}`, `POST /api/projects/{id}/submit` |
| Judging | `GET\|POST /api/judge/scores`, `GET /api/judge/assignments`, `GET /api/judge/assignments/{id}` |
| Pairwise (bonus) | `GET /api/judge/pairwise/next`, `POST /api/judge/pairwise/vote`, `GET /api/organizer/pairwise` |
| Organizer | `GET /api/organizer/{leaderboard,progress,judges,audit}`, `GET /api/export.csv`, `GET\|POST /api/organizer/events`, `PATCH /api/organizer/events/{id}`, `GET\|POST\|DELETE /api/organizer/tracks`, `GET\|PUT /api/organizer/rubric`, `POST /api/organizer/judges/{assign,unassign,invite}` |
| Misc | `GET /api/health`, `GET /api/event` |

## What's deliberately not in the API

Nothing. If you find a UI action that isn't listed in `openapi.json`, that's a gap — file it.
