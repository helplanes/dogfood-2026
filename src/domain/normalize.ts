// Per-judge normalization. Judges use the 1-5 scale differently — some are harsh, some generous,
// some barely spread their scores — so raw averages aren't comparable across judges.
//
// We use a modified z-score on median and MAD (median absolute deviation) rather than mean/std
// (Iglewicz & Hoaglin, "Volume 16: How to Detect and Handle Outliers", ASQC 1993; the 0.6745
// constant scales MAD to be a consistent estimator of the standard deviation under normality).
// This is standard robust-statistics practice, independent of any hackathon platform: a MAD-based
// score is far less sensitive to a single outlier review than a mean/std z-score is, which matters
// here because some judges only reviewed 1-2 projects (fixture: jdg_01 has one review).
//
// Zero-spread judges (MAD = 0: every review identical, or a single review) cannot be scaled at all.
// They contribute 0 (perfectly neutral) rather than NaN/Infinity, and affected projects are flagged
// via hasVarianceWarning. See JUDGING.md.
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

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const lo = sorted[mid - 1] ?? sorted[mid] ?? 0;
  const hi = sorted[mid] ?? lo;
  return sorted.length % 2 ? hi : (lo + hi) / 2;
}

export function judgeStats(values: number[]): JudgeStats {
  if (values.length === 0) return { median: 0, mad: 0, zeroVariance: true };
  const med = median(values);
  const mad = median(values.map((v) => Math.abs(v - med)));
  return { median: med, mad, zeroVariance: mad < 1e-9 };
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
  const stats = new Map([...byJudge].map(([j, v]) => [j, judgeStats(v)]));

  const byProject = new Map<string, { raw: number[]; z: number[]; warn: boolean }>();
  for (const s of scores) {
    const st = stats.get(s.judgeId)!;
    const z = st.zeroVariance ? 0 : (MAD_CONSTANT * (s.value - st.median)) / st.mad;
    const p = byProject.get(s.projectId) ?? { raw: [], z: [], warn: false };
    p.raw.push(s.value);
    p.z.push(z);
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
