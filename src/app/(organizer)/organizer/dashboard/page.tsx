"use client";

import React from "react";
import Link from "next/link";

export default function OrganizerDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      
      <div className="max-w-7xl mx-auto space-y-10 w-full">
        
        {/* Hero Section */}
        <div className="space-y-4 pb-6 border-b border-stone-800/50">
          <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
            01 SYSTEM TELEMETRY
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne text-white tracking-tight leading-tight">
            Event Orchestration. <br />
            <span className="italic text-primary font-medium">Real-Time Telemetry.</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Monitor hackathon throughput, track juror quorum, adjust normalization rubrics, and audit systemic logs from the global command interface.
          </p>
        </div>

        {/* Global Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-stone-800 hover:border-stone-700 transition-colors flex flex-col justify-between h-36 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800/20 rounded-full blur-3xl group-hover:bg-stone-700/30 transition-colors" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block relative z-10">TOTAL SUBMISSIONS</span>
            <span className="text-5xl font-mono font-bold text-white relative z-10 tracking-tight">42</span>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-stone-800 hover:border-stone-700 transition-colors flex flex-col justify-between h-36 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800/20 rounded-full blur-3xl group-hover:bg-stone-700/30 transition-colors" />
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block relative z-10">JURORS ACTIVE</span>
            <span className="text-5xl font-mono font-bold text-white relative z-10 tracking-tight">12</span>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#11141c] to-[#161a24] border border-stone-800 hover:border-stone-700 transition-colors flex flex-col justify-between h-36 shadow-xl col-span-2 lg:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">EVALUATION QUORUM</span>
              <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 bg-primary/10 rounded border border-primary/20">84% COMPLETE</span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-900 overflow-hidden border border-stone-800 mt-auto relative z-10">
              <div className="h-full bg-primary w-[84%] rounded-full shadow-[0_0_12px_var(--color-primary)]" />
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="space-y-4 pt-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-bold">
            02 ORCHESTRATION MODULES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Link href="/organizer/results" className="group p-6 rounded-2xl bg-surface hover:bg-surface-hover border border-stone-800 hover:border-primary/50 transition-all flex flex-col gap-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-primary/15 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-syne font-bold text-white group-hover:text-primary transition-colors">Results & Rankings</h3>
                <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">Normalized leaderboards and comprehensive CSV score exports.</p>
              </div>
            </Link>

            <Link href="/organizer/assignments" className="group p-6 rounded-2xl bg-surface hover:bg-surface-hover border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-syne font-bold text-white group-hover:text-stone-200 transition-colors">Juror Assignments</h3>
                <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">Manage review load balancing, quotas, and judge conflict overrides.</p>
              </div>
            </Link>

            <Link href="/organizer/rubric" className="group p-6 rounded-2xl bg-surface hover:bg-surface-hover border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-syne font-bold text-white group-hover:text-stone-200 transition-colors">Scoring Rubric</h3>
                <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">Edit evaluation weights, criteria sets, and statistical normalization rules.</p>
              </div>
            </Link>

            <Link href="/organizer/audit" className="group p-6 rounded-2xl bg-surface hover:bg-surface-hover border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-syne font-bold text-white group-hover:text-stone-200 transition-colors">Append-Only Audit</h3>
                <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">View cryptographic hash chains for data integrity and action logs.</p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
