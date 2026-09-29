# ARCHITECTURE

Next.js 16 (App Router) + Postgres. One process, one database, offline.

- `src/policy`: single authorization table; every handler calls `authorize()` first.
- `src/server`: DB pool, session-cookie auth (`getActor`), JSON error helper.
- `src/repo`: schema and all queries; scores are always queried by the authenticated judge id.
- `src/domain/normalize.ts`: pure z-score ranking (unit tested).
- `src/app`: pages (server-rendered gallery) and route handlers (`/api/judge/scores`, `/api/export.csv`, `/api/organizer/*`, `/projects/new`).

Auth: the checker sends `Cookie: session=<token>`; the seed creates fixed demo tokens (demo-only). Password login is not implemented yet.
