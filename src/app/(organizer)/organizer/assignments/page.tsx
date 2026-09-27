"use client";

import React, { useState } from "react";
import Link from "next/link";

const mockJudges = [
  {
    id: "jdg_a_91bc",
    name: "Dr. Aris Thorne",
    tracks: ["Web", "GenAI"],
    assignedCount: 4,
    assignments: ["Awesome Hack", "AetherMesh", "ZeroProof ID", "NeuroTrace"],
  },
  {
    id: "jdg_b_44de",
    name: "Soren Lindqvist",
    tracks: ["Zero Knowledge", "Mobile"],
    assignedCount: 3,
    assignments: ["ZeroProof ID", "Mobile Innovators", "Soluna"],
  },
  {
    id: "jdg_c_77fa",
    name: "Elena Rostova",
    tracks: ["BioTech", "GenAI", "Web"],
    assignedCount: 5,
    assignments: ["BioSynapse", "NeuroTrace", "AetherMesh", "Awesome Hack", "HyperVapor"],
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
            <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-[#fe330a] transition-colors">
              &larr; COMMAND CENTER
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Juror Assignments. <br />
              <span className="italic text-[#fe330a]">Greedy Min-Load Allocation.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-bold uppercase tracking-wider transition-all border border-stone-700 flex items-center gap-2">
              Recalculate Load
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2">
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
              className="w-full px-4 py-2 bg-[#0c0e13] border border-stone-800/80 rounded-xl text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a]"
            />
          </div>
          <div className="hidden md:flex items-center gap-4 px-4 text-xs font-mono text-stone-500">
            <span>TARGET k=3 REVIEWS/PROJECT</span>
            <span className="text-emerald-400">CONFLICT FILTER ACTIVE</span>
          </div>
        </div>

        {/* Juror Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockJudges.map((judge) => (
            <div key={judge.id} className="p-6 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl space-y-5 flex flex-col justify-between">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-serif text-white">{judge.name}</h3>
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">
                    ID: {judge.id}
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs font-mono">
                  <span className="text-[#fe330a] font-bold">{judge.assignedCount}</span> <span className="text-stone-400">ASSIGNED</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">TRACK ELIGIBILITY</div>
                <div className="flex flex-wrap gap-2">
                  {judge.tracks.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#161a24] text-[10px] font-mono text-stone-300 border border-stone-700/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-800/50">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">ASSIGNED QUEUE</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-stone-400">
                  {judge.assignments.map(a => (
                    <span key={a} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-stone-600" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button className="text-[10px] font-mono text-[#fe330a] uppercase tracking-widest font-semibold hover:underline">
                  + Add / Remove Projects
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
