# DogFood 2026 — Hackathon Submission & Judging Portal

A self-hostable submission and judging platform: auth, teams, events, draft-and-edit project
submissions, backend-enforced judge isolation, organizer-configurable scoring, and an
append-only, cryptographically hash-chained audit log. All application code written during the
72-hour event window.

## Run it

```
docker compose up
```

That's the whole thing: brings up Postgres, migrates, seeds `fixtures.json`, and serves on
`http://localhost:8080`. No cloud account, no API key, no signup — the demo logins are printed in
the boot log.

To verify against the official checker:

```
python3 run.py .dogfood.toml > acceptance-report.txt
```

## Status

Claimed **T1 + T2**. `acceptance-report.txt` is the checker's own output: all 7 checks pass on a
fresh seed, verified against a containerized build with a fully dropped volume, not just a warm
local server.

**Built and verified end to end:**
- Real auth (argon2 + HttpOnly sessions), team formation by invite link, draft-and-edit
  submission editable until the deadline.
- Judge scoring with backend-enforced own-scores-only isolation, CSV export, and normalization
  that corrects for harsh/lenient judges (median/MAD with empirical-Bayes shrinkage — see
  `JUDGING.md`).
- Organizer-configurable rubric weights that actually change the ranking, event/track
  management, and an append-only audit log enforced at the database level (not just in
  application code — see `THREAT-MODEL.md`).
- All four bonus challenges: Pairwise judging, Normalization Proof, Threat Model, API First
  (`API.md`, `openapi.json`).

**Honest gaps:** automatic/load-balanced judge assignment (assignment is manual — a policy
decision, not an oversight), and the 5-minute demo video.

## Docs

- [SPEC-NOTES.md](SPEC-NOTES.md) — verified facts from the official spec, read first
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [DATA-MODEL.md](DATA-MODEL.md)
- [JUDGING.md](JUDGING.md)
- [THREAT-MODEL.md](THREAT-MODEL.md)
- [API.md](API.md) ([openapi.json](openapi.json))
