# JUDGING

## Isolation (enforced in the backend)
- `authorize()` in `src/policy` gates every route. No session => 401, wrong role => 403. Denials are raw JSON, never redirects.
- `GET /api/judge/scores` is keyed by the authenticated judge. A `?judge=` selector that is not the caller's own id is refused with 403, not filtered.
- Score writes (`POST /api/judge/scores`) require an eligible track (`judge_tracks`) and refuse the judge's own team (email match). Values are integers 1-5 over `functionality`, `quality`, `innovation`.
- Visitors and participants never see scores. Organizers see all via `/api/organizer/*` and `/api/export.csv`.

## Normalization
Judges use the 1-5 scale differently. For each (judge, project) we first take the **rubric-weighted** mean across criteria — weights are organizer-configurable (`GET/PUT /api/organizer/rubric`, default 40/30/30 functionality/quality/innovation) — then normalize that weighted score against the judge's own **median and MAD** (median absolute deviation), not mean/std: `z = 0.6745 * (x - median) / MAD` (Iglewicz & Hoaglin, ASQC 1993 — the 0.6745 constant scales MAD to be a consistent estimator of std under normality). MAD is a robust statistic: a single outlier review doesn't distort a judge's whole scale the way a mean/std z-score would. A project's normalized score is the mean of its z-scores; raw mean is shown alongside. Ranking sorts by normalized score, then raw mean. Implementation: `src/domain/normalize.ts`.

**Shrinkage for low-review judges.** A judge's own median/MAD is unreliable when they've reviewed very few projects — one review gives MAD = 0 by construction, which says nothing real about that judge's spread. Rather than forcing that judge to z = 0 (contributing nothing), we blend their own (median, MAD) toward the population's, weighted by their review count: `weight = n / (n + 3)`, so a judge with ~4 reviews already relies mostly on their own numbers, while a 1-review judge leans mostly on the population's typical spread. This is empirical-Bayes (James-Stein-style) shrinkage — a standard technique for exactly this "not enough of this judge's own data to trust it alone" problem (Efron & Morris, "Stein's Paradox in Statistics", *Scientific American*, 1977), independent of any hackathon-specific implementation.

Edge cases from the fixtures:
- **`jdg_01`** (one review): shrinkage now gives them a real, regularized z-score derived mostly from the population's spread, instead of a flat neutral 0.
- **`jdg_07`** (all 4s across several reviews): with enough of their own reviews, shrinkage barely moves their stats — their MAD genuinely stays ~0, so `hasVarianceWarning` still fires and they still contribute z = 0. A judge who is truly uninformative across many reviews should be flagged; one who simply hasn't reviewed much yet shouldn't be treated the same way.
- **Uneven review counts** (2 to 5 per project): normalized score is a mean, so counts do not inflate totals; `n_reviews` is exposed.
- **Duplicates** (`prj_41` duplicates `prj_07`): flagged via `duplicate_of`, never deleted.

Known limits: `SHRINKAGE_K = 3` is a reasonable default for this dataset's caseload, not a tuned/validated constant. Automatic judge-to-track assignment (load balancing, conflict-of-interest rules) is not implemented — assignment is manual (`/organizer/assignments`).

## Bonus: pairwise judging (not implemented, evaluated and scoped)
The spec's "Pairwise +5" bonus points at Bradley-Terry / Plackett-Luce-style pairwise comparison models — instead of absolute 1-5 scores, judges pick the better of two projects, and a strength is fit from those comparisons. This is a real, well-established alternative (used in modern rating systems like TrueSkill and OpenSkill) and would need its own comparison-collection UI and a `comparisons` table, not just a scoring-layer change, so it's out of scope for this pass. Noted here rather than silently skipped.
