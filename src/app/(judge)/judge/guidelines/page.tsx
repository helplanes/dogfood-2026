import Link from "next/link";

/**
 * Judge Guidelines page — /judge/guidelines
 * DESIGN-4-HYBRID: dark world. Static content, no auth needed here (layout handles identity).
 */

const CRITERIA = [
  {
    key: "functionality",
    label: "Functionality",
    weight: 40,
    color: "#fe330a",
    description:
      "Does the project work as described in its submission? Are the core features complete and stable? Can a reviewer reproduce the primary use-case without significant friction?",
    levels: [
      { score: 1, label: "Poor", desc: "Core features missing or broken. Cannot be evaluated." },
      { score: 2, label: "Below Average", desc: "Many features incomplete or crash-prone." },
      { score: 3, label: "Average", desc: "Core feature works but edge cases fail or UX is rough." },
      { score: 4, label: "Good", desc: "Core feature solid and stable, minor issues only." },
      { score: 5, label: "Excellent", desc: "Feature-complete, polished, handles errors gracefully." },
    ],
  },
  {
    key: "quality",
    label: "Code Quality",
    weight: 30,
    color: "#00f0ff",
    description:
      "Is the code readable, well-structured, and maintainable? Are there tests? Is the repository documented? Reviewers should consider architecture, naming, error handling, and test coverage.",
    levels: [
      { score: 1, label: "Poor", desc: "No structure, no tests, unreadable code." },
      { score: 2, label: "Below Average", desc: "Hard to follow, inconsistent patterns, no tests." },
      { score: 3, label: "Average", desc: "Readable but minimal tests or weak architecture." },
      { score: 4, label: "Good", desc: "Clean code, some tests, clear module boundaries." },
      { score: 5, label: "Excellent", desc: "Well-tested, documented, production-grade structure." },
    ],
  },
  {
    key: "innovation",
    label: "Innovation",
    weight: 30,
    color: "#a855f7",
    description:
      "Does the project bring a novel idea, creative approach, or unique solution to a real problem? Innovation can be in the concept, the technical approach, or the combination of existing ideas in a new way.",
    levels: [
      { score: 1, label: "Poor", desc: "Straightforward tutorial-level implementation, nothing new." },
      { score: 2, label: "Below Average", desc: "Incremental, very similar to known tools." },
      { score: 3, label: "Average", desc: "Solid but expected approach for the problem." },
      { score: 4, label: "Good", desc: "A creative twist or unexpected technical choice." },
      { score: 5, label: "Excellent", desc: "Genuinely novel — rare in a hackathon context." },
    ],
  },
];

const TIPS = [
  "Score based on what you can verify — repo code, live demo, and submission description.",
  "Use the full 1–5 range. Reserve 5 for genuinely outstanding work.",
  "Do not penalise for scope — reward what is done well, not what is absent.",
  "Scores are normalized across judges; consistency matters more than calibration.",
  "If a project is in your own team's area, flag it — conflict-of-interest review is handled by the organizer.",
  "Notes are private to you and help you remember reasoning when editing scores later.",
  "All scores are locked at the event deadline. Submit before 18:00 UTC on 28 Sep 2026.",
];

export default function JudgeGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/judge/dashboard"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors mb-5"
          >
            ← Back to Dashboard
          </Link>
          <h1
            className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Judging Guidelines
          </h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mt-2">
            DOGFOOD 2026 — Official rubric and scoring guide
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        {/* Overview */}
        <section>
          <h2
            className="text-lg font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Overview
          </h2>
          <div className="bg-[#191c20] border border-white/[0.08] rounded-lg p-6 text-sm text-slate-300 leading-relaxed flex flex-col gap-3">
            <p>
              Each project is scored on <strong className="text-white">three criteria</strong> on a
              scale of <strong className="text-white">1 to 5</strong> (integers only). Scores are
              weighted as shown below to produce a single weighted average per project.
            </p>
            <p>
              Scores are <strong className="text-white">z-score normalised</strong> across all
              judges before ranking, so your calibration relative to your own average matters more
              than absolute values. Use the full range.
            </p>
            <p>
              You are only shown projects{" "}
              <strong className="text-white">assigned to you</strong>. You will never see another
              judge&apos;s scores.
            </p>
          </div>
        </section>

        {/* Weight summary bar */}
        <section>
          <h2
            className="text-lg font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Rubric Weights
          </h2>
          <div className="bg-[#191c20] border border-white/[0.08] rounded-lg p-6 flex flex-col gap-4">
            {/* Stacked bar */}
            <div className="flex rounded-full overflow-hidden h-4">
              {CRITERIA.map((c) => (
                <div
                  key={c.key}
                  className="h-full flex items-center justify-center text-[9px] font-mono font-bold text-white/90 tracking-wider uppercase"
                  style={{ width: `${c.weight}%`, backgroundColor: c.color }}
                >
                  {c.weight}%
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-1">
              {CRITERIA.map((c) => (
                <div key={c.key} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    {c.label} — {c.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Criteria detail */}
        <section className="flex flex-col gap-6">
          <h2
            className="text-lg font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Criteria Detail
          </h2>
          {CRITERIA.map((c) => (
            <div
              key={c.key}
              className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden"
            >
              {/* Criterion header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ backgroundColor: c.color }}
              >
                <h3
                  className="text-base font-black uppercase tracking-tight text-white"
                  style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
                >
                  {c.label}
                </h3>
                <span className="text-sm font-mono font-bold text-white/80">
                  {c.weight}% weight
                </span>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4">
                <p className="text-sm text-slate-600 leading-relaxed">{c.description}</p>

                {/* Score level table */}
                <div className="flex flex-col gap-2">
                  {c.levels.map((lv) => (
                    <div
                      key={lv.score}
                      className="flex items-start gap-3 py-2 border-b border-[#f1f5f9] last:border-0"
                    >
                      <span
                        className="shrink-0 w-7 h-7 rounded flex items-center justify-center text-sm font-black text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {lv.score}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight text-[#111318]">
                          {lv.label}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{lv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Judging tips */}
        <section>
          <h2
            className="text-lg font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Judging Tips
          </h2>
          <ul className="flex flex-col gap-3">
            {TIPS.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-[#191c20] border border-white/[0.08] rounded-lg px-5 py-4"
              >
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#fe330a] text-white text-[10px] font-black flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Deadline reminder */}
        <div className="bg-[#191c20] border border-[#f59e0b]/30 rounded-lg px-6 py-4 flex items-start gap-3">
          <span className="text-[#f59e0b] font-mono text-xs uppercase tracking-widest shrink-0 mt-0.5">
            Deadline
          </span>
          <p className="text-sm text-slate-300 leading-relaxed">
            All scores must be submitted before{" "}
            <strong className="text-white">Mon 28 Sep 2026 at 18:00 UTC</strong>. After the
            deadline, scores are locked and no further edits are possible.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Link
            href="/judge/dashboard"
            className="px-6 py-3 bg-[#fe330a] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#ff4d26] transition-colors"
          >
            ← Back to My Projects
          </Link>
          <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">
            DOGFOOD 2026 judging panel
          </span>
        </div>
      </main>
    </div>
  );
}
