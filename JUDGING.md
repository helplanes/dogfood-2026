# JUDGING

## Isolation (enforced in the backend)
- `authorize()` in `src/policy` gates every route. No session => 401, wrong role => 403. Denials are raw JSON, never redirects.
- `GET /api/judge/scores` is keyed by the authenticated judge. A `?judge=` selector that is not the caller's own id is refused with 403, not filtered.
- Score writes (`POST /api/judge/scores`) require an eligible track (`judge_tracks`) and refuse the judge's own team (email match). Values are integers 1-5 over `functionality`, `quality`, `innovation`.
- Visitors and participants never see scores. Organizers see all via `/api/organizer/*` and `/api/export.csv`.

## Normalization
Judges use the 1-5 scale differently. For each judge we take the mean over criteria per project review, then z-score it against that judge's own mean and standard deviation. A project's normalized score is the mean of its z-scores; raw mean is shown alongside. Ranking sorts by normalized score, then raw mean.

Edge cases from the fixtures:
- **Zero variance** (`jdg_01`: one review, all 2s; `jdg_07`: all 4s): the std is 0, so we cannot scale. That judge contributes z = 0 (neutral) rather than NaN/Infinity, and affected projects carry `variance_warning = true` in the leaderboard and CSV.
- **Uneven review counts** (2 to 5 per project): normalized score is a mean, so counts do not inflate totals; `n_reviews` is exposed.
- **Duplicates** (`prj_41` duplicates `prj_07`): flagged via `duplicate_of`, never deleted.

Known limits: normalization with few reviews per judge is noisy; the rubric is equal-weight (organizer-configurable weights are not implemented).
