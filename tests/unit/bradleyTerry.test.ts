import { describe, expect, it } from "vitest";
import { fitBradleyTerry } from "@/domain/bradleyTerry";

describe("Bradley-Terry pairwise ranking", () => {
  it("ranks a project that always wins above one that always loses", () => {
    const r = fitBradleyTerry([
      { winnerId: "a", loserId: "b" },
      { winnerId: "a", loserId: "b" },
      { winnerId: "a", loserId: "b" },
    ]);
    const a = r.find((x) => x.projectId === "a")!;
    const b = r.find((x) => x.projectId === "b")!;
    expect(a.strength).toBeGreaterThan(b.strength);
    expect(Number.isFinite(a.strength)).toBe(true);
    expect(Number.isFinite(b.strength)).toBe(true);
  });

  it("is order-independent: shuffled matchup order yields the same ranking", () => {
    const matchups = [
      { winnerId: "a", loserId: "b" },
      { winnerId: "b", loserId: "c" },
      { winnerId: "a", loserId: "c" },
      { winnerId: "c", loserId: "d" },
      { winnerId: "b", loserId: "d" },
      { winnerId: "a", loserId: "d" },
    ];
    const forward = fitBradleyTerry(matchups).map((r) => r.projectId);
    const reversed = fitBradleyTerry([...matchups].reverse()).map((r) => r.projectId);
    // A naive sequential Elo update (Site 15's approach) is order-dependent; a correct
    // Bradley-Terry MLE fit is not. This is the property that distinguishes the two.
    expect(forward).toEqual(reversed);
  });

  it("never diverges to infinity for a project that has only ever won", () => {
    const r = fitBradleyTerry([
      { winnerId: "champion", loserId: "x" },
      { winnerId: "champion", loserId: "y" },
      { winnerId: "champion", loserId: "z" },
    ]);
    expect(r.every((x) => Number.isFinite(x.strength))).toBe(true);
  });

  it("connects disconnected comparison groups via the reference ghost match", () => {
    // {a,b} never compared against {c,d} directly — without a connecting mechanism, Bradley-Terry
    // strengths across disconnected groups are not identifiable (undefined relative to each other).
    const r = fitBradleyTerry([
      { winnerId: "a", loserId: "b" },
      { winnerId: "c", loserId: "d" },
    ]);
    expect(r.every((x) => Number.isFinite(x.strength))).toBe(true);
    expect(r).toHaveLength(4);
  });

  it("returns an empty ranking for no matchups", () => {
    expect(fitBradleyTerry([])).toEqual([]);
  });
});
