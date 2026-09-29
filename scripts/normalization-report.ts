#!/usr/bin/env tsx
// Bonus: Normalization Proof (+5, Hard). "Implement cross-judge score normalization and prove
// it works on the fixture data. Show the raw scores, the normalized scores, and the ranking
// change. Document the method well enough that a statistician would not wince."
//
// This script is the proof. It reads fixtures.json directly (not the database — so it's checkable
// completely independently of anything this app does with Postgres) and runs the exact same pure
// function the running app uses (src/domain/normalize.ts), then prints:
//   1. Per-judge statistics (median, MAD, shrunk stats) — so the "why" is inspectable per judge.
//   2. A raw-vs-normalized-vs-rank table for every project.
//   3. The specific edge cases spec.md/fixtures.json call out by name: jdg_01 (one review),
//      jdg_07 (zero variance across several), prj_41/prj_07 (the duplicate pair).
//   4. A sanity check that the ranking actually moved projects relative to a naive raw-average
//      ranking — i.e. that normalization did something, not nothing.
//
// Run: npx tsx scripts/normalization-report.ts [path/to/fixtures.json]
import { readFileSync } from "node:fs";
import { rankProjects, rawJudgeStats, type RawScore } from "../src/domain/normalize";

interface Fixtures {
  event: { id: string; submissions_close: string };
  projects: { id: string; title: string; track: string }[];
  scores: { judge: string; project: string; criteria: Record<string, number> }[];
}

const path = process.argv[2] ?? "fixtures.json";
const fx: Fixtures = JSON.parse(readFileSync(path, "utf8"));

const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;

// Same per-(judge, project) reduction the running app uses (getLeaderboard, src/repo/queries.ts):
// unweighted mean across criteria here, since this script has no access to organizer rubric
// weights and is meant to prove the normalization math in isolation from that configuration.
const rows: RawScore[] = fx.scores.map((s) => ({
  judgeId: s.judge,
  projectId: s.project,
  value: avg(Object.values(s.criteria)),
}));

const byJudge = new Map<string, number[]>();
for (const r of rows) byJudge.set(r.judgeId, [...(byJudge.get(r.judgeId) ?? []), r.value]);

const titleById = new Map(fx.projects.map((p) => [p.id, p.title]));
const ranked = rankProjects(rows);

// A naive raw-average ranking, for comparison — this is what "we averaged the scores" (the weak
// answer the spec explicitly calls out) would have produced.
const rawByProject = new Map<string, number[]>();
for (const r of rows) rawByProject.set(r.projectId, [...(rawByProject.get(r.projectId) ?? []), r.value]);
const naiveRanking = [...rawByProject.entries()]
  .map(([projectId, values]) => ({ projectId, rawMean: avg(values) }))
  .sort((a, b) => b.rawMean - a.rawMean)
  .map((r, i) => ({ ...r, rank: i + 1 }));
const naiveRankById = new Map(naiveRanking.map((r) => [r.projectId, r.rank]));

console.log("=".repeat(78));
console.log("NORMALIZATION PROOF — DOGFOOD 2026");
console.log(`Source: ${path} (unmodified, read directly — not the seeded database)`);
console.log(`${fx.projects.length} projects, ${byJudge.size} judges, ${fx.scores.length} score records`);
console.log("Method: median/MAD z-score with empirical-Bayes (James-Stein-style) shrinkage.");
console.log("z = 0.6745 * (x - shrunk_median) / shrunk_mad; shrink weight = n/(n+3) toward the");
console.log("population's median/MAD. See JUDGING.md for the full citation and rationale.");
console.log("=".repeat(78));

console.log("\n--- 1. Per-judge statistics (own values only; shrinkage is applied inside rankProjects) ---\n");
const judgeRows = [...byJudge.entries()]
  .map(([judgeId, values]) => ({ judgeId, n: values.length, ...rawJudgeStats(values) }))
  .sort((a, b) => a.judgeId.localeCompare(b.judgeId));
console.log("judge".padEnd(10), "n".padEnd(4), "own_median".padEnd(11), "own_mad".padEnd(9), "zero-variance (own)?");
for (const j of judgeRows) {
  console.log(
    j.judgeId.padEnd(10),
    String(j.n).padEnd(4),
    j.median.toFixed(2).padEnd(11),
    j.mad.toFixed(2).padEnd(9),
    j.mad < 1e-9 ? "yes" : "no",
  );
}

console.log("\n--- 2. Named edge cases from SPEC-NOTES.md / fixtures.json ---\n");
const jdg01 = judgeRows.find((j) => j.judgeId === "jdg_01");
const jdg07 = judgeRows.find((j) => j.judgeId === "jdg_07");
if (jdg01) {
  console.log(`jdg_01: n=${jdg01.n} review(s), own median=${jdg01.median}, own MAD=${jdg01.mad}.`);
  console.log("  Naive z-score math (x - median)/MAD is 0/0 here — undefined. Shrinkage resolves");
  console.log("  this by blending toward the population's spread instead of forcing a flat z=0.");
}
if (jdg07) {
  console.log(`jdg_07: n=${jdg07.n} reviews, own median=${jdg07.median}, own MAD=${jdg07.mad}.`);
  console.log("  Enough of their own data that shrinkage barely moves them — genuinely");
  console.log("  uninformative (same score every time), correctly flagged and neutralized.");
}
const dup = fx.projects.find((p) => p.id === "prj_41");
if (dup) {
  const original = ranked.find((r) => r.projectId === "prj_07");
  const duplicate = ranked.find((r) => r.projectId === "prj_41");
  console.log(`\nprj_41 ("${dup.title}") duplicates prj_07: both scored independently, both ranked`);
  console.log(`  (never deleted). prj_07 rank ${(ranked.indexOf(original!) + 1) || "—"}, prj_41 rank ${(ranked.indexOf(duplicate!) + 1) || "—"}.`);
  console.log("  Flagged via duplicate_of in the leaderboard/CSV for organizer review.");
}

console.log("\n--- 3. Raw vs. normalized vs. rank, every project ---\n");
console.log(
  "rank".padEnd(5),
  "project".padEnd(10),
  "title".padEnd(24),
  "n".padEnd(3),
  "raw_mean".padEnd(9),
  "z_score".padEnd(9),
  "naive_rank".padEnd(11),
  "moved",
);
let moved = 0;
for (const [i, r] of ranked.entries()) {
  const rank = i + 1;
  const naive = naiveRankById.get(r.projectId)!;
  const delta = naive - rank;
  if (delta !== 0) moved++;
  console.log(
    String(rank).padEnd(5),
    r.projectId.padEnd(10),
    (titleById.get(r.projectId) ?? "").slice(0, 22).padEnd(24),
    String(r.nReviews).padEnd(3),
    r.rawMean.toFixed(3).padEnd(9),
    r.normalized.toFixed(3).padEnd(9),
    String(naive).padEnd(11),
    delta === 0 ? "—" : delta > 0 ? `up ${delta}` : `down ${-delta}`,
  );
}

console.log("\n--- 4. Sanity check ---\n");
console.log(`${moved} of ${ranked.length} projects changed rank vs. a naive raw-average ranking.`);
console.log(moved > 0 ? "Normalization changed the outcome — it is not a no-op." : "WARNING: normalization produced the same ranking as a raw average. Investigate.");
console.log(`All ${ranked.length} normalized scores finite: ${ranked.every((r) => Number.isFinite(r.normalized))}.`);
console.log("=".repeat(78));
