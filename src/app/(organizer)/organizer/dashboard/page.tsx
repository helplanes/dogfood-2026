"use client";

import React from "react";
import Link from "next/link";

export default function OrganizerDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      
      <div className="max-w-7xl mx-auto space-y-10 w-full">
        
        {/* Top Command Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-xl bg-[#11141c]/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
            <span className="text-stone-300 font-semibold">ORGANIZER COMMAND CENTER</span>
            <span className="text-stone-600">{"//"}</span>
            <span>SYSTEM METRICS</span>
          </div>
          <div className="flex items-center gap-5 text-[11px]">
            <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
            <span className="text-stone-500">SYNC: 18:42</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 pb-6 border-b border-stone-800/50">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Event Orchestration. <br />
            <span className="italic text-[#fe330a] font-normal">Real-Time Telemetry.</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Monitor hackathon throughput, track juror quorum, adjust normalization rubrics, and audit systemic logs from the global command interface.
          </p>
        </div>

        {/* Global Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#11141c] border border-stone-800 flex flex-col justify-between h-32 shadow-lg">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">TOTAL SUBMISSIONS</span>
            <span className="text-4xl font-mono font-bold text-white">42</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#11141c] border border-stone-800 flex flex-col justify-between h-32 shadow-lg">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">JURORS ACTIVE</span>
            <span className="text-4xl font-mono font-bold text-white">12</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#11141c] border border-stone-800 flex flex-col justify-between h-32 shadow-lg col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">EVALUATION QUORUM</span>
              <span className="text-xs font-mono font-bold text-[#fe330a]">84% COMPLETE</span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-900 overflow-hidden border border-stone-800 mt-auto">
              <div className="h-full bg-[#fe330a] w-[84%] rounded-full shadow-[0_0_8px_#fe330a]" />
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          <Link href="/organizer/results" className="group p-6 rounded-2xl bg-[#11141c] hover:bg-[#141824] border border-stone-800 hover:border-[#fe330a]/50 transition-all flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-[#fe330a]/10 border border-[#fe330a]/30 flex items-center justify-center text-[#fe330a]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-white group-hover:text-[#fe330a] transition-colors">Results & Rankings</h3>
              <p className="text-xs text-stone-400 font-sans mt-1">Normalized leaderboards and CSV exports.</p>
            </div>
          </Link>

          <Link href="/organizer/assignments" className="group p-6 rounded-2xl bg-[#11141c] hover:bg-[#141824] border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">Juror Assignments</h3>
              <p className="text-xs text-stone-400 font-sans mt-1">Manage load balancing and conflict overrides.</p>
            </div>
          </Link>

          <Link href="/organizer/rubric" className="group p-6 rounded-2xl bg-[#11141c] hover:bg-[#141824] border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">Scoring Rubric</h3>
              <p className="text-xs text-stone-400 font-sans mt-1">Edit weights, criteria, and normalization rules.</p>
            </div>
          </Link>

          <Link href="/organizer/audit" className="group p-6 rounded-2xl bg-[#11141c] hover:bg-[#141824] border border-stone-800 hover:border-stone-600 transition-all flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">Append-Only Audit Log</h3>
              <p className="text-xs text-stone-400 font-sans mt-1">View cryptographic hash chains for data integrity.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
