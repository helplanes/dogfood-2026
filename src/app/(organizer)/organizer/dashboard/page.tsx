import Link from "next/link";

/**
 * Organizer Progress Dashboard — /organizer/dashboard
 * Shows review counts, zero-variance judge flags, per-track completion, duplicate flag.
 * TODO: replace MOCK_* with Krish's typed server functions from src/repo.
 *
 * Fixture facts (SPEC-NOTES.md):
 *  - 41 projects, 30 judges, 126 score records
 *  - 8 projects have 2 reviews, 26 have 3, 3 have 4, 4 have 5
 *  - Zero-variance: jdg_01 (1 review, all 2s), jdg_07 (all 4s)
 *  - prj_41 duplicates prj_07 — must show flag, never delete
 */

// ─── Mock data ────────────────────────────────────────────────────────────────

const EVENT = { name: "Sample Hack 2026", deadline: "2026-03-01T18:00:00Z" };

const TRACKS = [
  { id: "trk_01", name: "Developer Tools",   projectCount: 5,  reviewedCount: 4  },
  { id: "trk_02", name: "Data & Analytics",  projectCount: 5,  reviewedCount: 5  },
  { id: "trk_03", name: "Accessibility",     projectCount: 6,  reviewedCount: 6  },
  { id: "trk_04", name: "Security",          projectCount: 7,  reviewedCount: 5  },
  { id: "trk_05", name: "Climate",           projectCount: 5,  reviewedCount: 4  },
  { id: "trk_06", name: "Health",            projectCount: 5,  reviewedCount: 4  },
  { id: "trk_07", name: "Education",         projectCount: 5,  reviewedCount: 5  },
  { id: "trk_08", name: "Open Hardware",     projectCount: 3,  reviewedCount: 2  },
];

const ZERO_VARIANCE_FLAGS = [
  { judgeId: "jdg_01", name: "Tomas Varga",  reviewCount: 1, note: "Only 1 review, all scores = 2. Weight reduced." },
  { judgeId: "jdg_07", name: "Iva Petrova",  reviewCount: 5, note: "All scores = 4 across all criteria. Zero variance — mean-centred." },
];

const DUPLICATE_FLAG = {
  projectId: "prj_41",
  title: "Dry Harbour (duplicate)",
  duplicateOf: "prj_07",
  duplicateTitle: "Dry Harbour",
  repoUrl: "https://example.org/repo/07",
};

const REVIEW_DIST = [
  { label: "2 reviews", count: 8,  color: "#ba1a1a" },
  { label: "3 reviews", count: 26, color: "#22c55e" },
  { label: "4 reviews", count: 3,  color: "#00f0ff" },
  { label: "5 reviews", count: 4,  color: "#a855f7" },
];

const TOTAL_PROJECTS = 41;
const TOTAL_SCORES   = 126;
const TOTAL_JUDGES   = 30;
const FULLY_REVIEWED = 26 + 3 + 4; // ≥3 reviews

export default function OrganizerDashboardPage() {
  const pct = Math.round((FULLY_REVIEWED / TOTAL_PROJECTS) * 100);

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Hero */}
      <div className="border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[#a855f7] font-mono text-xs uppercase tracking-widest mb-2">
              {EVENT.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Progress Dashboard
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
              Deadline closed — 1 Mar 2026 18:00 UTC
            </p>
          </div>
          <Link href="/organizer/results"
            className="px-5 py-2.5 bg-[#a855f7] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#9333ea] transition-colors shrink-0">
            View Results →
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

        {/* ── Top KPI strip ── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Projects",     value: TOTAL_PROJECTS, sub: "41 submitted",     color: "text-white",      accent: "#fe330a" },
            { label: "Judges",       value: TOTAL_JUDGES,   sub: "30 active",        color: "text-[#00f0ff]",  accent: "#00f0ff" },
            { label: "Score Records",value: TOTAL_SCORES,   sub: "126 total",        color: "text-[#22c55e]",  accent: "#22c55e" },
            { label: "≥3 Reviews",   value: `${pct}%`,      sub: `${FULLY_REVIEWED}/${TOTAL_PROJECTS} projects`, color: "text-[#a855f7]", accent: "#a855f7" },
          ].map(({ label, value, sub, color, accent }) => (
            <div key={label}
              className="bg-[#191c20] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-1"
              style={{ borderTopColor: accent, borderTopWidth: 2 }}>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{label}</p>
              <p className={`text-3xl font-black tabular-nums ${color}`}>{value}</p>
              <p className="text-xs font-mono text-slate-600">{sub}</p>
            </div>
          ))}
        </section>

        {/* ── Review distribution + overall bar ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Review distribution */}
          <div className="bg-[#191c20] border border-white/[0.08] rounded-xl p-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
              Reviews per Project
            </h2>
            <div className="flex flex-col gap-4">
              {REVIEW_DIST.map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-20 shrink-0">{label}</span>
                  <div className="flex-1 bg-white/[0.06] rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(count / TOTAL_PROJECTS) * 100}%`, backgroundColor: color }} />
                  </div>
                  <span className="text-sm font-black tabular-nums text-white w-6 text-right">{count}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <p className="text-[10px] font-mono text-slate-600 mt-4 uppercase tracking-wider">
              Minimum 3 reviews required for ranking
            </p>
          </div>

          {/* Overall progress */}
          <div className="bg-[#191c20] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
              Overall Completion
            </h2>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {/* Giant donut-ish number */}
              <div className="text-center">
                <p className="text-7xl font-black text-[#a855f7] tabular-nums">{pct}%</p>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-2">
                  projects with ≥3 reviews
                </p>
              </div>
              {/* Segmented bar */}
              <div className="flex rounded-full overflow-hidden h-3">
                {REVIEW_DIST.map(({ label, count, color }) => (
                  <div key={label} className="h-full transition-all duration-500"
                    style={{ width: `${(count / TOTAL_PROJECTS) * 100}%`, backgroundColor: color }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {REVIEW_DIST.map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Per-track completion ── */}
        <section>
          <h2 className="text-lg font-black uppercase tracking-tight text-white mb-5"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
            Track Completion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRACKS.map((t) => {
              const tPct = Math.round((t.reviewedCount / t.projectCount) * 100);
              const done = t.reviewedCount === t.projectCount;
              return (
                <div key={t.id}
                  className={[
                    "bg-[#191c20] border rounded-xl p-4 flex flex-col gap-3",
                    done ? "border-[#22c55e]/40" : "border-white/[0.08]",
                  ].join(" ")}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-tight text-white leading-tight">{t.name}</p>
                    {done && (
                      <span className="text-[9px] font-mono uppercase tracking-widest bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded-full shrink-0">
                        ✓ Done
                      </span>
                    )}
                  </div>
                  <div className="bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${tPct}%`, backgroundColor: done ? "#22c55e" : "#a855f7" }} />
                  </div>
                  <p className="text-[10px] font-mono text-slate-500">
                    <span className={done ? "text-[#22c55e]" : "text-white"}>{t.reviewedCount}</span>
                    /{t.projectCount} reviewed — {tPct}%
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Zero-variance flags ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Zero-Variance Flags
            </h2>
            <span className="text-xs font-mono bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-0.5 rounded-full">
              {ZERO_VARIANCE_FLAGS.length} flagged
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {ZERO_VARIANCE_FLAGS.map((f) => (
              <div key={f.judgeId}
                className="bg-[#191c20] border border-[#f59e0b]/30 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar initials */}
                  <div className="w-9 h-9 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-[#f59e0b]">
                      {f.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">{f.name}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{f.judgeId} · {f.reviewCount} review{f.reviewCount !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-lg px-3 py-2 sm:max-w-xs">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-hidden="true">
                    <path d="M6 1L11 10.5H1L6 1Z" stroke="#f59e0b" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M6 5v2.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="6" cy="9" r="0.6" fill="#f59e0b" />
                  </svg>
                  <p className="text-[10px] text-[#f59e0b] leading-relaxed">{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Duplicate flag ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Duplicate Submissions
            </h2>
            <span className="text-xs font-mono bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-2 py-0.5 rounded-full">
              1 flagged
            </span>
          </div>
          <div className="bg-[#191c20] border border-[#ba1a1a]/30 rounded-xl px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-sm font-bold text-white">{DUPLICATE_FLAG.title}</p>
                <span className="text-[9px] font-mono uppercase tracking-widest bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-1.5 py-0.5 rounded-full">
                  Duplicate
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                {DUPLICATE_FLAG.projectId} — same repo URL as{" "}
                <strong className="text-slate-300">{DUPLICATE_FLAG.duplicateTitle}</strong>{" "}
                ({DUPLICATE_FLAG.duplicateOf})
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Flagged for review · not deleted
              </span>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-wrap gap-4">
          {[
            { href: "/organizer/results",     label: "Results & Scores"   },
            { href: "/organizer/assignments", label: "Judge Assignments"  },
            { href: "/organizer/rubric",      label: "Rubric Editor"      },
            { href: "/organizer/audit",       label: "Audit Log"          },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">
              {label} →
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
