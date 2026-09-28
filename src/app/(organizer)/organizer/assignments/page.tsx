"use client";

import React, { useState } from "react";
import Link from "next/link";

const mockJudges = [
  {
    id: "jdg_a_91bc",
    name: "Dr. Aris Thorne",
    tracks: ["Hardware", "GenAI"],
    assignedCount: 4,
    assignments: ["Glass Signal", "Small Meadow", "Deep Compass"],
  },
  {
    id: "jdg_b_44de",
    name: "Soren Lindqvist",
    tracks: ["Agents", "Hardware"],
    assignedCount: 3,
    assignments: ["Deep Compass", "Glass Signal"],
  },
  {
    id: "jdg_c_77fa",
    name: "Elena Rostova",
    tracks: ["GenAI", "Agents"],
    assignedCount: 5,
    assignments: ["Small Meadow", "Deep Compass"],
  },
];

export default function OrganizerAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div className="space-y-4">
            <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-[#fe330a] transition-colors font-bold">
              &larr; COMMAND CENTER
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#fe330a] font-bold mt-4">
              MODULE 02
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              Juror Assignments. <br />
              <span className="italic text-[#fe330a] font-medium">Greedy Min-Load Allocation.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-bold uppercase tracking-wider transition-all border border-stone-700 flex items-center gap-2">
              Recalculate Load
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(254,51,10,0.3)] flex items-center gap-2">
              Manual Override
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-[#11141c] border border-stone-800">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search jurors by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#0c0e13] border border-stone-800/80 rounded-xl text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors"
            />
          </div>
          <div className="hidden md:flex items-center gap-4 px-4 text-[10px] font-mono text-stone-500 font-bold tracking-widest">
            <span>TARGET k=3 REVIEWS/PROJECT</span>
            <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />CONFLICT FILTER ACTIVE</span>
          </div>
        </div>

        {/* Juror Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockJudges.map((judge) => (
            <div key={judge.id} className="p-6 rounded-2xl bg-[#11141c] border border-stone-800 hover:border-stone-700 transition-colors shadow-xl space-y-6 flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-stone-800/10 rounded-full blur-3xl group-hover:bg-[#fe330a]/5 transition-colors" />
              
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <h3 className="text-2xl font-syne font-bold text-white">{judge.name}</h3>
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">
                    ID: {judge.id}
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-[#fe330a]/10 border border-[#fe330a]/20 text-xs font-mono flex flex-col items-center justify-center">
                  <span className="text-[#fe330a] font-bold text-lg leading-none">{judge.assignedCount}</span> 
                  <span className="text-stone-400 text-[9px] tracking-widest mt-0.5">ASSIGNED</span>
                </div>
              </div>

              <div className="space-y-2.5 relative z-10">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">TRACK ELIGIBILITY</div>
                <div className="flex flex-wrap gap-2">
                  {judge.tracks.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-sm bg-[#161a24] text-[10px] font-mono text-stone-300 border border-stone-700/50 uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-stone-800/50 relative z-10 flex-1">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">ASSIGNED QUEUE</div>
                <div className="flex flex-col gap-2 text-[11px] font-mono text-stone-400 tracking-wider">
                  {judge.assignments.map(a => (
                    <span key={a} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 relative z-10">
                <button className="w-full py-2 rounded-lg border border-stone-800 text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold hover:text-white hover:bg-stone-800/50 transition-colors">
                  + Modify Allocation
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
