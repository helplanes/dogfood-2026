import React from "react";
import Link from "next/link";

const mockJudges = [
  { id: "jdg_a", name: "Judge Alpha", load: 3, quota: 5, tracks: ["Hardware", "Agents"], conflicts: ["Team Alpha"] },
  { id: "jdg_b", name: "Judge Beta", load: 5, quota: 5, tracks: ["GenAI"], conflicts: [] }
];

export default function OrganizerAssignmentsPage() {
  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/50">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors">
                &larr; DASHBOARD
              </Link>
              <span className="text-stone-600">/</span>
              <span className="text-xs font-mono text-primary tracking-widest uppercase">Orchestration</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight">Juror Assignments</h1>
            <p className="text-stone-400 text-sm">
              Manage review load balancing and manually override conflicts.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20">
            Run Auto-Assign
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJudges.map(judge => (
            <div key={judge.id} className="p-6 rounded-2xl bg-surface border border-stone-800 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-syne text-white font-bold">{judge.name}</h3>
                  <span className="text-xs font-mono text-stone-500 uppercase">ID: {judge.id}</span>
                </div>
                {judge.conflicts.length > 0 && (
                  <span className="px-2 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/40 text-[10px] font-mono uppercase tracking-wider animate-pulse">
                    Conflict
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">LOAD / QUOTA</span>
                  <span className={judge.load >= judge.quota ? "text-emerald-400" : "text-stone-200"}>{judge.load} / {judge.quota}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-background overflow-hidden border border-stone-800">
                  <div 
                    className={`h-full rounded-full transition-all ${judge.load >= judge.quota ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-primary shadow-[0_0_8px_rgba(254,51,10,0.5)]"}`}
                    style={{ width: `${(judge.load / judge.quota) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-800/80">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">Eligible Tracks</span>
                  <div className="flex flex-wrap gap-2">
                    {judge.tracks.map(track => (
                      <span key={track} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700/50 text-[10px] font-mono text-stone-300">
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
                
                {judge.conflicts.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">Recused From</span>
                    <div className="flex flex-wrap gap-2">
                      {judge.conflicts.map(team => (
                        <span key={team} className="px-2 py-0.5 rounded bg-red-950/20 border border-red-900/50 text-[10px] font-mono text-red-400">
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="mt-auto w-full py-2.5 rounded-xl bg-background hover:bg-stone-900 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
                Manage Load
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
