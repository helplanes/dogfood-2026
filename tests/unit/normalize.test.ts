import { describe, expect, it } from "vitest";
import { rankProjects } from "@/domain/normalize";

describe("normalization", () => {
  it("never yields NaN or Infinity, even for a judge with a single review", () => {
    const r = rankProjects([
      { judgeId: "a", projectId: "p1", value: 5 },
      { judgeId: "a", projectId: "p2", value: 1 },
      { judgeId: "z", projectId: "p2", value: 4 }, // z has exactly one review
    ]);
    expect(r.every((x) => Number.isFinite(x.normalized))).toBe(true);
    expect(r[0]?.projectId).toBe("p1");
  });

  it("shrinks a low-review judge toward the population instead of forcing z = 0", () => {
    // Population is spread out (1..5). A one-review judge who gives the top score should get a
    // real, non-zero, positive z-score derived from the population's spread, not a flat neutral
    // 0 the way a naive "can't measure spread from n=1" rule would force.
    const r = rankProjects([
      { judgeId: "a", projectId: "p1", value: 1 },
      { judgeId: "a", projectId: "p2", value: 3 },
      { judgeId: "a", projectId: "p3", value: 5 },
      { judgeId: "b", projectId: "p1", value: 1 },
      { judgeId: "b", projectId: "p2", value: 3 },
      { judgeId: "b", projectId: "p3", value: 5 },
      { judgeId: "one-review", projectId: "p3", value: 5 },
    ]);
    const p3 = r.find((x) => x.projectId === "p3")!;
    expect(Number.isFinite(p3.normalized)).toBe(true);
    expect(p3.normalized).toBeGreaterThan(0);
    // p3 got the top score from every judge (including the shrunk one-review judge), so it
    // should outrank p1, which got the bottom score from everyone.
    expect(r[0]?.projectId).toBe("p3");
  });

  it("still flags a judge whose scores have genuinely no spread across many reviews", () => {
    const r = rankProjects([
      { judgeId: "flat", projectId: "p1", value: 3 },
      { judgeId: "flat", projectId: "p2", value: 3 },
      { judgeId: "flat", projectId: "p3", value: 3 },
      { judgeId: "flat", projectId: "p4", value: 3 },
      { judgeId: "flat", projectId: "p5", value: 3 },
      { judgeId: "flat", projectId: "p6", value: 3 },
    ]);
    expect(r.every((x) => x.hasVarianceWarning)).toBe(true);
    expect(r.every((x) => x.normalized === 0)).toBe(true);
  });
});
