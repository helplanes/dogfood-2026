"use client";

import React from "react";
import Link from "next/link";

const mockAuditLogs = [
  {
    id: 104,
    timestamp: "2026-09-27T18:42:01Z",
    action: "SCORE_SUBMITTED",
    actor: "jdg_a_91bc",
    target: "prj_04",
    hash: "0x94fc...e321",
    prevHash: "0x8fae...b7c4"
  },
  {
    id: 103,
    timestamp: "2026-09-27T18:38:14Z",
    action: "RUBRIC_UPDATED",
    actor: "org_7f2a",
    target: "event_weights",
    hash: "0x8fae...b7c4",
    prevHash: "0x7bc2...a941"
  },
  {
    id: 102,
    timestamp: "2026-09-27T18:15:00Z",
    action: "PROJECT_SUBMITTED",
    actor: "prt_2e88",
    target: "prj_04",
    hash: "0x7bc2...a941",
    prevHash: "0x6f11...8bb2"
  },
  {
    id: 101,
    timestamp: "2026-09-25T18:00:00Z",
    action: "EVENT_KICKOFF",
    actor: "system",
    target: "global",
    hash: "0x6f11...8bb2",
    prevHash: "0x0000...0000"
  },
];

export default function OrganizerAuditPage() {
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
              MODULE 04
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              Audit Log. <br />
              <span className="italic text-[#fe330a] font-medium">Append-Only Provenance.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block mr-4">
              <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">LATEST CHAIN HEIGHT</div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider mt-0.5">BLOCK #104</div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-white text-stone-900 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Export Log &darr;
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl bg-[#11141c] border border-stone-800 shadow-2xl">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0a0c10] border-b border-stone-800/80 text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
              <tr>
                <th className="px-6 py-5">Timestamp (UTC)</th>
                <th className="px-6 py-5">Action</th>
                <th className="px-6 py-5">Actor ID</th>
                <th className="px-6 py-5">Target ID</th>
                <th className="px-6 py-5 text-[#fe330a]">Hash</th>
                <th className="px-6 py-5">Prev Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50 font-mono text-stone-300 text-xs tracking-wider">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#161a24] transition-colors group">
                  <td className="px-6 py-4 text-stone-500">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-bold">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 text-stone-400">{log.actor}</td>
                  <td className="px-6 py-4 text-amber-500/70">{log.target}</td>
                  <td className="px-6 py-4 text-[#fe330a] font-bold group-hover:text-white transition-colors">{log.hash}</td>
                  <td className="px-6 py-4 text-stone-600 group-hover:text-stone-400 transition-colors">{log.prevHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Legend / Footer */}
          <div className="p-5 bg-[#0a0c10] border-t border-stone-800/80 flex items-center gap-6 text-[10px] font-mono text-stone-500 font-bold tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#fe330a] animate-pulse shadow-[0_0_5px_#fe330a]" />
              <span>WAITING FOR NEW EVENTS...</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
