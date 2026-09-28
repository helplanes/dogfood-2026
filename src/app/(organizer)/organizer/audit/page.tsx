import React from "react";
import Link from "next/link";

const mockAuditLogs = [
  { id: "log_903", action: "SCORE_OVERRIDE", entity: "prj_02", actor: "org_admin", timestamp: "2026-09-27T15:01:44Z", prev_hash: "0x9a3f8c21...", hash: "0x1e7d4b99..." },
  { id: "log_902", action: "QUOTA_UPDATE", entity: "judge_b", actor: "org_admin", timestamp: "2026-09-27T14:45:12Z", prev_hash: "0x4b1cf77e...", hash: "0x9a3f8c21..." },
  { id: "log_901", action: "SCORE_SUBMIT", entity: "prj_01", actor: "judge_a", timestamp: "2026-09-27T14:22:00Z", prev_hash: "0x8f2a11b0...", hash: "0x4b1cf77e..." }
];

export default function OrganizerAuditPage() {
  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <header className="flex flex-col gap-4 pb-6 border-b border-stone-800/50">
          <div className="flex items-center gap-3">
            <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors">
              &larr; DASHBOARD
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight">Append-Only Audit Log</h1>
          <p className="text-stone-400 text-sm">
            Cryptographic hash chain verifying data integrity. No UPDATE or DELETE grants exist for this table.
          </p>
        </header>
        
        <div className="rounded-2xl bg-surface border border-stone-800 p-6 space-y-4 font-mono text-xs overflow-x-auto">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-background border border-stone-800 hover:border-stone-700 transition-colors">
              <div className="w-48 shrink-0 text-stone-500">{log.timestamp}</div>
              <div className="w-32 shrink-0">
                <span className={`px-2 py-1 rounded bg-stone-900 border ${log.action.includes('OVERRIDE') ? 'border-primary/50 text-primary' : 'border-stone-700 text-stone-300'}`}>
                  {log.action}
                </span>
              </div>
              <div className="w-32 shrink-0 text-stone-400">ACTOR: {log.actor}</div>
              <div className="w-32 shrink-0 text-stone-400">TGT: {log.entity}</div>
              <div className="flex-1 flex flex-col gap-1 text-[10px] text-stone-500 md:text-right">
                <div>PREV: <span className="text-stone-400">{log.prev_hash}</span></div>
                <div>HASH: <span className="text-emerald-400/80">{log.hash}</span></div>
              </div>
            </div>
          ))}
          <div className="p-4 text-center text-stone-500 border-t border-stone-800/80 mt-4 pt-6">
            END OF LEDGER
          </div>
        </div>
      </div>
    </div>
  );
}
