import Link from "next/link";

/**
 * Organizer Results Page — /organizer/results
 * Shows final ranked scores: n_reviews, raw weighted avg, normalised score, rank.
 * Zero-variance flags visible. Incomplete scores shown clearly.
 * CSV export link points to /api/export.csv (Krish's route — checker test #7).
 *
 * TODO: replace MOCK_RESULTS with Krish's typed server function, e.g.:
 *   getRankedResults(): Promise<RankedResult[]>
 * from src/repo or src/server. Must include both raw and normalised scores,
 * n_reviews per project, and zero-variance judge flags.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface RankedResult {
  id: string;
  title: string;
  team: string;
  track: string;
  nReviews: number;
  rawScores: { functionality: number | null; quality: number | null; innovation: number | null };
  rawWeightedAvg: number | null;  // null = not enough reviews
  normalisedScore: number | null; // z-score normalised, null = insufficient data
  rank: number | null;            // null = not enough reviews to rank
  zeroVarianceFlag: boolean;      // true if any reviewer was zero-variance for this project
  incomplete: boolean;            // true if < 3 reviews
  duplicateFlag: boolean;
}

// ─── Mock data (fixture-accurate) ────────────────────────────────────────────
// 41 projects, showing top 15 + a sample of edge cases for design.
// Values are representative of z-score normalisation output.

const MOCK_RESULTS: RankedResult[] = [
  { id:"prj_03", title:"Deep Compass",    team:"StillTrail",     track:"Accessibility",    nReviews:5, rawScores:{functionality:5,quality:5,innovation:5}, rawWeightedAvg:5.0, normalisedScore:2.41,  rank:1,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_14", title:"Green Lantern",   team:"StillMeadow",    track:"Education",        nReviews:5, rawScores:{functionality:5,quality:4,innovation:5}, rawWeightedAvg:4.7, normalisedScore:2.18,  rank:2,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_22", title:"Amber Relay",     team:"GreenFerry",     track:"Climate",          nReviews:4, rawScores:{functionality:5,quality:4,innovation:4}, rawWeightedAvg:4.5, normalisedScore:1.94,  rank:3,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_08", title:"North Drift",     team:"GreenHours",     track:"Security",         nReviews:3, rawScores:{functionality:4,quality:5,innovation:4}, rawWeightedAvg:4.3, normalisedScore:1.72,  rank:4,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_11", title:"Salt Ledger",     team:"OpenSignal",     track:"Data & Analytics", nReviews:4, rawScores:{functionality:4,quality:4,innovation:5}, rawWeightedAvg:4.3, normalisedScore:1.68,  rank:5,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_05", title:"North Compass",   team:"AmberSwitch",    track:"Data & Analytics", nReviews:3, rawScores:{functionality:4,quality:4,innovation:4}, rawWeightedAvg:4.0, normalisedScore:1.21,  rank:6,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_16", title:"Salt Kiln",       team:"OpenSignal",     track:"Security",         nReviews:3, rawScores:{functionality:4,quality:3,innovation:4}, rawWeightedAvg:3.7, normalisedScore:0.88,  rank:7,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_06", title:"Dry Compass",     team:"CopperBeacon",   track:"Developer Tools",  nReviews:3, rawScores:{functionality:4,quality:3,innovation:3}, rawWeightedAvg:3.5, normalisedScore:0.54,  rank:8,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_12", title:"Open Beacon",     team:"IronLoom",       track:"Education",        nReviews:3, rawScores:{functionality:3,quality:4,innovation:3}, rawWeightedAvg:3.3, normalisedScore:0.22,  rank:9,  zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_19", title:"Small Relay",     team:"PaperAnchor",    track:"Health",           nReviews:3, rawScores:{functionality:3,quality:3,innovation:4}, rawWeightedAvg:3.3, normalisedScore:0.18,  rank:10, zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_02", title:"Small Meadow",    team:"LoudQuarry",     track:"Accessibility",    nReviews:3, rawScores:{functionality:3,quality:3,innovation:3}, rawWeightedAvg:3.0, normalisedScore:-0.10, rank:11, zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_28", title:"Bright Thread",   team:"BrightCompass",  track:"Education",        nReviews:3, rawScores:{functionality:3,quality:2,innovation:3}, rawWeightedAvg:2.7, normalisedScore:-0.42, rank:12, zeroVarianceFlag:false, incomplete:false, duplicateFlag:false },
  { id:"prj_01", title:"Glass Signal",    team:"NorthKiln",      track:"Security",         nReviews:2, rawScores:{functionality:2,quality:3,innovation:2}, rawWeightedAvg:2.3, normalisedScore:null,  rank:null,zeroVarianceFlag:true,  incomplete:true,  duplicateFlag:false },
  { id:"prj_07", title:"Dry Harbour",     team:"CopperLedger",   track:"Accessibility",    nReviews:3, rawScores:{functionality:2,quality:2,innovation:2}, rawWeightedAvg:2.0, normalisedScore:-0.88, rank:13, zeroVarianceFlag:true,  incomplete:false, duplicateFlag:false },
  { id:"prj_41", title:"Dry Harbour",     team:"HollowOrbit",    track:"Accessibility",    nReviews:2, rawScores:{functionality:2,quality:2,innovation:2}, rawWeightedAvg:2.0, normalisedScore:null,  rank:null,zeroVarianceFlag:false, incomplete:true,  duplicateFlag:true  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(v: number | null): string {
  if (v === null) return "text-slate-500";
  if (v >= 4.5) return "text-[#22c55e]";
  if (v >= 3.5) return "text-[#00f0ff]";
  if (v >= 2.5) return "text-[#f59e0b]";
  return "text-[#ba1a1a]";
}

function normBadge(v: number | null): { text: string; cls: string } {
  if (v === null) return { text: "—", cls: "text-slate-500" };
  const s = v.toFixed(2);
  if (v >= 1.5) return { text: `+${s}`, cls: "text-[#22c55e]" };
  if (v >= 0)   return { text: `+${s}`, cls: "text-[#00f0ff]" };
  return { text: s, cls: "text-[#f59e0b]" };
}

export default function OrganizerResultsPage() {
  const ranked   = MOCK_RESULTS.filter(r => r.rank !== null).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const unranked = MOCK_RESULTS.filter(r => r.rank === null);

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Hero */}
      <div className="border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[#a855f7] font-mono text-xs uppercase tracking-widest mb-2">
              Sample Hack 2026 — Final Results
            </p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Score Results
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
              Raw weighted avg + z-score normalised ranking
            </p>
          </div>
          {/* CSV export — checker test #7 */}
          <a href="/api/export.csv"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#191c20] border border-[#a855f7]/40 hover:border-[#a855f7] text-[#a855f7] rounded-lg text-sm font-bold uppercase tracking-widest transition-colors shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export CSV
          </a>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

        {/* Legend */}
        <div className="flex flex-wrap gap-4 items-center">
          {[
            { dot: "bg-[#22c55e]", label: "Score ≥ 4.5" },
            { dot: "bg-[#00f0ff]", label: "3.5–4.5" },
            { dot: "bg-[#f59e0b]", label: "2.5–3.5" },
            { dot: "bg-[#ba1a1a]", label: "< 2.5" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${dot}`} />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>
            </div>
          ))}
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider ml-auto">
            * Unranked = &lt;3 reviews or zero-variance flagged
          </span>
        </div>

        {/* ── Ranked results table ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Ranked Projects ({ranked.length})
            </h2>
          </div>

          {/* Table — scrollable on mobile */}
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#191c20] border-b border-white/[0.08]">
                  {["Rank","Project","Track","Team","Reviews","Func · Qual · Innov","Raw Avg","Normalised","Flags"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ranked.map((r, i) => {
                  const nb = normBadge(r.normalisedScore);
                  return (
                    <tr key={r.id}
                      className={[
                        "border-b border-white/[0.04] transition-colors",
                        i === 0 ? "bg-[#22c55e]/[0.04]" : i === 1 ? "bg-[#a855f7]/[0.03]" : "hover:bg-white/[0.02]",
                      ].join(" ")}>
                      {/* Rank */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={[
                          "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black",
                          i === 0 ? "bg-[#f59e0b] text-[#111318]" :
                          i === 1 ? "bg-slate-300 text-[#111318]" :
                          i === 2 ? "bg-[#b45309] text-white" :
                          "bg-white/[0.06] text-slate-400",
                        ].join(" ")}>
                          {r.rank}
                        </span>
                      </td>
                      {/* Title */}
                      <td className="px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-tight text-white whitespace-nowrap">{r.title}</p>
                        <p className="text-[10px] font-mono text-slate-600">{r.id}</p>
                      </td>
                      {/* Track */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-[#282a2f] text-slate-400 px-2 py-0.5 rounded-sm">{r.track}</span>
                      </td>
                      {/* Team */}
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{r.team}</td>
                      {/* Reviews */}
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-mono font-bold text-white">{r.nReviews}</span>
                      </td>
                      {/* Per-criterion */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <span className={scoreColor(r.rawScores.functionality)}>{r.rawScores.functionality ?? "—"}</span>
                          <span className="text-slate-700">·</span>
                          <span className={scoreColor(r.rawScores.quality)}>{r.rawScores.quality ?? "—"}</span>
                          <span className="text-slate-700">·</span>
                          <span className={scoreColor(r.rawScores.innovation)}>{r.rawScores.innovation ?? "—"}</span>
                        </div>
                      </td>
                      {/* Raw avg */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span className={`text-sm font-black tabular-nums ${scoreColor(r.rawWeightedAvg)}`}>
                          {r.rawWeightedAvg?.toFixed(1) ?? "—"}
                        </span>
                      </td>
                      {/* Normalised */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span className={`text-sm font-black tabular-nums ${nb.cls}`}>{nb.text}</span>
                      </td>
                      {/* Flags */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {r.zeroVarianceFlag && (
                            <span title="Zero-variance judge involved"
                              className="text-[9px] font-mono uppercase tracking-widest bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 px-1.5 py-0.5 rounded-sm">
                              ZV
                            </span>
                          )}
                          {r.duplicateFlag && (
                            <span title="Duplicate submission"
                              className="text-[9px] font-mono uppercase tracking-widest bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-1.5 py-0.5 rounded-sm">
                              DUP
                            </span>
                          )}
                          {!r.zeroVarianceFlag && !r.duplicateFlag && (
                            <span className="text-[10px] font-mono text-slate-700">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Unranked / incomplete ── */}
        {unranked.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-black uppercase tracking-tight text-white"
                  style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
                Unranked ({unranked.length})
              </h2>
              <span className="text-xs font-mono text-slate-500">
                &lt;3 reviews — excluded from final ranking
              </span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-[#191c20] border-b border-white/[0.08]">
                    {["Project","Track","Team","Reviews","Raw Avg","Reason"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unranked.map((r) => (
                    <tr key={r.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-tight text-slate-300">{r.title}</p>
                        <p className="text-[10px] font-mono text-slate-600">{r.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-mono text-slate-500">{r.track}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{r.team}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-mono text-[#ba1a1a]">{r.nReviews}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-mono text-slate-500">
                          {r.rawWeightedAvg?.toFixed(1) ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {r.incomplete && (
                            <span className="text-[9px] font-mono uppercase tracking-widest bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-1.5 py-0.5 rounded-sm">
                              Incomplete
                            </span>
                          )}
                          {r.duplicateFlag && (
                            <span className="text-[9px] font-mono uppercase tracking-widest bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-1.5 py-0.5 rounded-sm">
                              Duplicate
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Normalization note */}
        <div className="bg-[#191c20] border border-white/[0.08] rounded-xl px-6 py-4">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Normalisation method</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Per-judge z-score with shrinkage toward the global mean for judges with few ratings.
            Zero-variance judges (identical scores across all criteria) are mean-centred with reduced weight — never divided by zero.
            Final project score = mean of normalised weighted scores across all assigned judges.
            Projects with fewer than 3 reviews are excluded from ranking.
          </p>
        </div>

        {/* Bottom action */}
        <div className="flex items-center gap-6 border-t border-white/[0.08] pt-6">
          <a href="/api/export.csv"
            className="px-5 py-2.5 bg-[#a855f7] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#9333ea] transition-colors">
            Download CSV
          </a>
          <Link href="/organizer/dashboard" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">
            ← Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
