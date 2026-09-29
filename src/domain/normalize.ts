// Per-judge z-score normalization. Judges use scales differently; we remove each judge's mean/spread.
// Zero-variance judges (all same score, or a single review) cannot be scaled: they contribute 0
// (their own mean), never NaN or Infinity. See JUDGING.md.
export interface RawScore {
  judgeId: string;
  projectId: string;
  value: number; // per-review mean across criteria
}

export interface JudgeStats {
  mean: number;
  std: number;
  zeroVariance: boolean;
}

export function judgeStats(values: number[]): JudgeStats {
  const n = values.length;
  const mean = n ? values.reduce((a, b) => a + b, 0) / n : 0;
  const variance = n ? values.reduce((a, b) => a + (b - mean) ** 2, 0) / n : 0;
  const std = Math.sqrt(variance);
  return { mean, std, zeroVariance: std < 1e-9 };
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
    const z = st.zeroVariance ? 0 : (s.value - st.mean) / st.std;
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
