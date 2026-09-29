import { describe, expect, it } from "vitest";
import { judgeStats, rankProjects } from "@/domain/normalize";

describe("normalization", () => {
  it("flags zero-variance judges without NaN", () => {
    expect(judgeStats([4, 4, 4]).zeroVariance).toBe(true);
    expect(judgeStats([2]).zeroVariance).toBe(true);
  });

  it("ranks by z-score and never yields NaN for zero-variance judges", () => {
    const r = rankProjects([
      { judgeId: "a", projectId: "p1", value: 5 },
      { judgeId: "a", projectId: "p2", value: 1 },
      { judgeId: "z", projectId: "p2", value: 4 },
    ]);
    expect(r.every((x) => Number.isFinite(x.normalized))).toBe(true);
    expect(r[0]?.projectId).toBe("p1");
    expect(r.find((x) => x.projectId === "p2")!.hasVarianceWarning).toBe(true);
  });
});
