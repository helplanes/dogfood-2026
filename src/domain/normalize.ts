// Per-judge normalization. Judges use the 1-5 scale differently — some are harsh, some generous,
// some barely spread their scores — so raw averages aren't comparable across judges.
//
// We use a modified z-score on median and MAD (median absolute deviation) rather than mean/std
// (Iglewicz & Hoaglin, "Volume 16: How to Detect and Handle Outliers", ASQC 1993; the 0.6745
// constant scales MAD to be a consistent estimator of the standard deviation under normality).
// This is standard robust-statistics practice, independent of any hackathon platform: a MAD-based
// score is far less sensitive to a single outlier review than a mean/std z-score is.
//
// A judge's own median/MAD is unreliable when they've reviewed very few projects — a judge with
// one review has MAD = 0 by construction, telling us nothing real about their spread. Rather than
// just zeroing that judge out, we shrink their per-judge stats toward the population's stats,
// weighted by how many reviews they have: empirical-Bayes (James-Stein-style) shrinkage (Efron &
// Morris, "Stein's Paradox in Statistics", Scientific American, 1977 — the classical motivating
// case for shrinkage estimation, general statistics, independent of any hackathon platform). A
// judge with many reviews is trusted almost entirely on their own numbers; a judge with one or two
// leans heavily on the population's typical spread instead of guessing from noise.
export interface RawScore {
  judgeId: string;
  projectId: string;
  value: number; // per-review mean across criteria
}

export interface JudgeStats {
  median: number;
  mad: number;
  zeroVariance: boolean;
}

const MAD_CONSTANT = 0.6745;

// Shrinkage strength: at n reviews, a judge's own stats get weight n/(n+SHRINKAGE_K). At the
// fixture's typical caseload (~4 reviews/judge) that's already ~57% own stats; a 1-review judge
// gets ~25% own stats, 75% population — enough to stop a single score from defining their scale,
// not so much that an experienced judge's real leniency gets erased.
const SHRINKAGE_K = 3;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const lo = sorted[mid - 1] ?? sorted[mid] ?? 0;
  const hi = sorted[mid] ?? lo;
  return sorted.length % 2 ? hi : (lo + hi) / 2;
}

function rawJudgeStats(values: number[]): { median: number; mad: number } {
  if (values.length === 0) return { median: 0, mad: 0 };
  const med = median(values);
  const mad = median(values.map((v) => Math.abs(v - med)));
  return { median: med, mad };
}

export interface ProjectResult {
  projectId: string;
  nReviews: number;
  rawMean: number;
  normalized: number;
  hasVarianceWarning: boolean;
}

export function rankProjects(scores: RawScore[]): ProjectResult[] {
  const byJudge = new Map<string, number[]>();
  for (const s of scores) byJudge.set(s.judgeId, [...(byJudge.get(s.judgeId) ?? []), s.value]);

  const rawStats = new Map([...byJudge].map(([j, v]) => [j, rawJudgeStats(v)]));
  const population = rawJudgeStats(scores.map((s) => s.value));

  // Shrink each judge's (median, MAD) toward the population's, weighted by their review count.
  const stats = new Map<string, JudgeStats>(
    [...rawStats].map(([judgeId, own]) => {
      const n = byJudge.get(judgeId)!.length;
      const w = n / (n + SHRINKAGE_K);
      const shrunkMedian = w * own.median + (1 - w) * population.median;
      const shrunkMad = w * own.mad + (1 - w) * population.mad;
      return [judgeId, { median: shrunkMedian, mad: shrunkMad, zeroVariance: shrunkMad < 1e-9 }];
    }),
  );

  const byProject = new Map<string, { raw: number[]; z: number[]; warn: boolean }>();
  for (const s of scores) {
    const st = stats.get(s.judgeId)!;
    const z = st.zeroVariance ? 0 : (MAD_CONSTANT * (s.value - st.median)) / st.mad;
    const p = byProject.get(s.projectId) ?? { raw: [], z: [], warn: false };
    p.raw.push(s.value);
    p.z.push(z);
    // Only flag true zero-variance judges (identical scores across many reviews), not merely
    // low-review-count judges whose stats were shrunk — shrinkage already handled that case.
    p.warn ||= st.zeroVariance;
    byProject.set(s.projectId, p);
  }
  const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
  return [...byProject]
    .map(([projectId, p]) => ({
      projectId,
      nReviews: p.raw.length,
      rawMean: avg(p.raw),
      normalized: avg(p.z),
      hasVarianceWarning: p.warn,
    }))
    .sort((a, b) => b.normalized - a.normalized || b.rawMean - a.rawMean);
}
