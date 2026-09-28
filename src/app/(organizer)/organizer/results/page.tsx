import React from "react";
import Link from "next/link";

// Mock Data matching the LeaderboardEntry contract (Waiting on Krish)
const mockResults = [
  { rank: 1, id: "prj_01", title: "Glass Signal", track: "Hardware", n_reviews: 3, rawScore: 14.5, normalizedScore: 92.4, hasVarianceWarning: false },
  { rank: 2, id: "prj_03", title: "Deep Compass", track: "Agents", n_reviews: 3, rawScore: 13.8, normalizedScore: 89.1, hasVarianceWarning: true },
  { rank: 3, id: "prj_02", title: "Small Meadow", track: "GenAI", n_reviews: 1, rawScore: 4.0, normalizedScore: 78.5, hasVarianceWarning: false }
];

export default function OrganizerResultsPage() {
  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-10 w-full">
        
        {/* Header & CSV Link */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/50">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors">
                &larr; DASHBOARD
              </Link>
              <span className="text-stone-600">/</span>
              <span className="text-xs font-mono text-primary tracking-widest uppercase">Global Results</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight leading-tight">
              Leaderboard Rankings
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              Normalized project standings based on Z-score shrinkage. Projects with incomplete reviews ({"<"}3) or zero-variance juror ratings are flagged.
            </p>
          </div>

          {/* CSV Export Button - Points to Krish's API Route */}
          <a
            href="/api/export.csv"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-hover text-stone-200 text-xs font-mono font-bold uppercase tracking-wider border border-stone-700 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </a>
        </header>

        {/* Results Table */}
        <div className="rounded-2xl bg-surface border border-stone-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-background/50 text-xs font-mono text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Reviews</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Raw Score</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Normalized</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Status Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {mockResults.map((row) => (
                  <tr key={row.id} className="hover:bg-background/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-mono font-bold text-xs ${row.rank === 1 ? "bg-primary/20 text-primary border border-primary/30" : "bg-stone-900 text-stone-300 border border-stone-800"}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-syne font-bold text-white text-base">{row.title}</span>
                        <span className="text-[10px] font-mono text-stone-500 uppercase">{row.track} &bull; {row.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono ${row.n_reviews < 3 ? "text-amber-400" : "text-stone-300"}`}>
                        {row.n_reviews} / 3
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-stone-400">
                      {row.rawScore.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-stone-200">
                      {row.normalizedScore.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                      {row.n_reviews < 3 && (
                        <span className="px-2 py-1 rounded bg-amber-950/40 text-amber-400 border border-amber-800/40 text-[10px] font-mono uppercase tracking-wider">
                          Incomplete
                        </span>
                      )}
                      {row.hasVarianceWarning && (
                        <span className="px-2 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/40 text-[10px] font-mono uppercase tracking-wider">
                          Variance Flag
                        </span>
                      )}
                      {row.n_reviews >= 3 && !row.hasVarianceWarning && (
                        <span className="text-emerald-500">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
