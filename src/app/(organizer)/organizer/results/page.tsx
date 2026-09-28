"use client";

import React from "react";
import Link from "next/link";

// Mock Results Data containing exactly what the DAG/Specs mandate
const mockResults = [
  {
    rank: 1,
    id: "prj_01",
    title: "Glass Signal",
    track: "Hardware",
    nReviews: "5 / 5",
    rawScore: 14.8,
    normalizedScore: 14.92,
    hasVarianceWarning: false,
  },
  {
    rank: 2,
    id: "prj_02",
    title: "Small Meadow",
    track: "GenAI",
    nReviews: "3 / 3",
    rawScore: 14.2,
    normalizedScore: 14.15,
    hasVarianceWarning: false,
  },
  {
    rank: 3,
    id: "prj_03",
    title: "Deep Compass",
    track: "Agents",
    nReviews: "2 / 3", // Incomplete
    rawScore: 13.9,
    normalizedScore: 13.50,
    hasVarianceWarning: true, // e.g. a judge gave all 5s (zero variance)
  }
];

export default function OrganizerResultsPage() {
  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div className="space-y-4">
            <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-[#fe330a] transition-colors">
              &larr; COMMAND CENTER
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Final Consensus <span className="italic text-[#fe330a]">Rankings.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block mr-4">
              <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">NORMALIZATION ALGORITHM</div>
              <div className="text-xs font-mono text-emerald-400">Z-SCORE SHRINKAGE APPLIED</div>
            </div>
            {/* The actual export endpoint specified in `run.py` */}
            <a
              href="/api/export.csv"
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-white text-stone-900 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
            >
              Export CSV &darr;
            </a>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl bg-[#11141c] border border-stone-800 shadow-2xl">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0a0c10] border-b border-stone-800/80 text-[11px] font-mono uppercase tracking-widest text-stone-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Rank</th>
                <th className="px-6 py-4 font-semibold">Project Name</th>
                <th className="px-6 py-4 font-semibold">Track</th>
                <th className="px-6 py-4 font-semibold">Reviews</th>
                <th className="px-6 py-4 font-semibold">Raw Mean</th>
                <th className="px-6 py-4 font-semibold text-[#fe330a]">Normalized Score</th>
                <th className="px-6 py-4 font-semibold text-center">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50 font-mono text-stone-300">
              {mockResults.map((row) => {
                const isComplete = row.nReviews.split(" / ")[0] === row.nReviews.split(" / ")[1];
                
                return (
                  <tr key={row.id} className="hover:bg-[#161a24] transition-colors">
                    <td className="px-6 py-4">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                        row.rank === 1 ? "bg-[#fe330a] text-white shadow-[0_0_10px_#fe330a]" : "bg-stone-900 text-stone-400 border border-stone-800"
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-serif text-lg text-white">{row.title}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">ID: {row.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-xs text-stone-400">
                        {row.track}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs ${isComplete ? "text-emerald-400" : "text-amber-400"}`}>
                        {row.nReviews}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-400">{row.rawScore.toFixed(2)}</td>
                    <td className="px-6 py-4 text-[#fe330a] font-bold">{row.normalizedScore.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      {row.hasVarianceWarning ? (
                        <span 
                          title="Zero-Variance Judge Detected (Mean-Centered)" 
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-950/50 text-amber-500 border border-amber-500/30 cursor-help"
                        >
                          !
                        </span>
                      ) : (
                        <span className="text-stone-700">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Legend */}
          <div className="p-4 bg-[#0a0c10] border-t border-stone-800/80 flex items-center gap-6 text-[10px] font-mono text-stone-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500/50" />
              <span>INCOMPLETE QUORUM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-500 flex items-center justify-center">!</span>
              <span>ZERO-VARIANCE (MEAN-CENTERED)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
