// Bradley-Terry pairwise ranking, fit by Zermelo's iterative MLE / minorization-maximization
// (Zermelo, 1929; the MM formulation is Hunter, D.R. "MM algorithms for generalized Bradley-Terry
// models," Annals of Statistics, 2004 — standard, convergent, and order-independent: unlike a
// sequential Elo-style update, the result does not depend on what order matchups are processed
// in, which is the correctness property that makes this actually Bradley-Terry rather than an
// approximation of it).
//
// Each project i has a positive strength pi_i. P(i beats j) = pi_i / (pi_i + pi_j). Given win
// counts w_ij (times i beat j), the MLE update is:
//   pi_i^(t+1) = W_i / sum_j [ (w_ij + w_ji) / (pi_i^(t) + pi_j^(t)) ]
// where W_i is i's total win count. Repeated to convergence, then renormalized each round so the
// strengths don't drift to 0 or infinity.
//
// Sparse/disconnected comparison graphs (a judge only compares within their track, so cross-track
// strengths aren't directly comparable) are handled by adding one "ghost" match per project
// against a neutral reference opponent of strength 1 — a standard regularizer for Bradley-Terry
// with sparse data (closely related to Firth's penalized-likelihood bias correction), which also
// keeps a project that has only ever won (or only ever lost) from diverging to infinity/zero.
export interface Matchup {
  winnerId: string;
  loserId: string;
}

export interface BradleyTerryResult {
  projectId: string;
  strength: number;
  wins: number;
  losses: number;
  comparisons: number;
}

const MAX_ITERATIONS = 200;
const CONVERGENCE_TOLERANCE = 1e-9;
const GHOST_MATCHES = 1; // one win + one loss against the reference, per project

export function fitBradleyTerry(matchups: Matchup[]): BradleyTerryResult[] {
  const projectIds = new Set<string>();
  for (const m of matchups) {
    projectIds.add(m.winnerId);
    projectIds.add(m.loserId);
  }
  if (projectIds.size === 0) return [];

  // w[i][j] = number of times i beat j.
  const wins = new Map<string, Map<string, number>>();
  const winCount = new Map<string, number>();
  const totalCount = new Map<string, number>();
  for (const id of projectIds) {
    wins.set(id, new Map());
    winCount.set(id, 0);
    totalCount.set(id, 0);
  }
  for (const { winnerId, loserId } of matchups) {
    const row = wins.get(winnerId)!;
    row.set(loserId, (row.get(loserId) ?? 0) + 1);
    winCount.set(winnerId, winCount.get(winnerId)! + 1);
    totalCount.set(winnerId, totalCount.get(winnerId)! + 1);
    totalCount.set(loserId, totalCount.get(loserId)! + 1);
  }

  let strength = new Map<string, number>([...projectIds].map((id) => [id, 1]));
  const REF_STRENGTH = 1;

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    const next = new Map<string, number>();
    let maxDelta = 0;

    for (const i of projectIds) {
      // Total wins for i, including the ghost win against the reference.
      const W_i = winCount.get(i)! + GHOST_MATCHES;
      let denominator = 0;

      for (const j of projectIds) {
        if (i === j) continue;
        const w_ij = wins.get(i)!.get(j) ?? 0;
        const w_ji = wins.get(j)!.get(i) ?? 0;
        const total = w_ij + w_ji;
        if (total === 0) continue;
        denominator += total / (strength.get(i)! + strength.get(j)!);
      }
      // Ghost match against the reference (strength 1): one win, one loss.
      denominator += (2 * GHOST_MATCHES) / (strength.get(i)! + REF_STRENGTH);

      const pi = denominator > 0 ? W_i / denominator : strength.get(i)!;
      next.set(i, pi);
      maxDelta = Math.max(maxDelta, Math.abs(pi - strength.get(i)!));
    }

    // Renormalize so the geometric mean stays at 1 (prevents drift to 0/infinity across rounds).
    const logSum = [...next.values()].reduce((s, v) => s + Math.log(v), 0);
    const geoMean = Math.exp(logSum / next.size);
    for (const [id, v] of next) next.set(id, v / geoMean);

    strength = next;
    if (maxDelta < CONVERGENCE_TOLERANCE) break;
  }

  return [...projectIds]
    .map((projectId) => ({
      projectId,
      strength: strength.get(projectId)!,
      wins: winCount.get(projectId)!,
      losses: totalCount.get(projectId)! - winCount.get(projectId)!,
      comparisons: totalCount.get(projectId)!,
    }))
    .sort((a, b) => b.strength - a.strength);
}
