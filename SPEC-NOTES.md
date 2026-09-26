# Official spec: what the team needs to know (read this first)

Source: `spec.md`, `run.py`, `fixtures.json` (all official, do not edit) and the DOGFOOD website. This file **corrects** anything in other planning docs that disagrees with it. Last updated 27 Sep 2026.

## How we are scored
Tier completion and correctness 40% (verified by `run.py`), judging integrity 25%, adoptability and operability 20% (one command, seeded, docs), code quality and innovation 15%. Bonuses only break ties. **Freeze: Mon 28 Sep 18:00 UTC.** Claiming a tier we do not pass costs points; a clean T2 beats a broken T4.

## The 7 checker requests (no login; it sends our fixed cookie)
| # | Request | Must return |
|---|---|---|
| 1 | GET `/projects`, no auth | 200 |
| 2 | same body | contains one of the first 3 fixture titles: **Glass Signal, Small Meadow, Deep Compass** |
| 3 | POST `/projects/new` as participant (JSON) | 4xx (fixture deadline is in the past) |
| 4 | GET `/api/judge/scores` as judge_a | 200 |
| 5 | GET `/api/judge/scores?judge=judge_a` as judge_b | 401/403 |
| 6 | GET `/api/judge/scores` as participant | 401/403 |
| 7 | GET `/api/export.csv` as organizer | 200, first line has a comma |

Denials are raw 4xx, never redirects (the checker follows redirects and would see 200). Run: `python3 run.py .dogfood.toml > acceptance-report.txt`.

## Fixture facts (verified by script)
- 1 event (closes 2026-03-01T18:00Z), 8 tracks, 30 judges, 40 teams, **41 projects**, 126 score records.
- Scores: 3 criteria `functionality`, `quality`, `innovation`; integer **1-5 scale** (values seen: 2-5).
- `prj_41` duplicates `prj_07` ("Dry Harbour", same repo): flag it for organizer review, never delete.
- Zero-variance judges: `jdg_01` (one review, all 2s) and `jdg_07` (all 4s). Normalization must not divide by zero.
- Reviews per project: 8 have 2, 26 have 3, 3 have 4, 4 have 5. No judge reviews their own team; every score is inside the judge's track.
- Demo logins (seed prints them): organizer `org_7f2a`; judge_a `jdg_a_91bc` = fixture `jdg_24`; judge_b `jdg_b_44de` = fixture `jdg_26`; participant `prt_2e88`.

## Corrections to other docs
1. **Figma/mockups are out of scope for scoring.** Keep design light: tokens plus working screens beat a Figma board. A frontend with hardcoded data is explicitly penalised, so wire real data.
2. **Track isolation is required too:** a judge must never see another track's projects (site role matrix), not only peer scores. Visitor/participant see no scores. Organizer/admin see all, including the audit log.
3. **Score contract is integer 1-5**, three named criteria. Anything showing 0-10 is wrong.
4. **T1 also lists:** event creation with configurable dates/tracks/prizes, team formation by invite link, draft-and-edit submission, gallery **search and filter**.
5. **Deliverables:** README, ARCHITECTURE, DATA-MODEL, JUDGING, `docker compose up` (offline, seeded), `acceptance-report.txt`, LICENSE, `.dogfood.toml`, and a 5-minute demo video (create, submit, judge, publish).
6. **Bonus points** (tie-breaks only): Normalization Proof +5, Pairwise +5, Threat Model +3, API First +3.
