import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Organizer section layout — DESIGN-4-HYBRID
 * Dark world, surface-low accent. Auth guard via src/policy (Krish).
 */
export default function OrganizerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111318] flex flex-col">
      {/* Organizer sub-header */}
      <div className="bg-[#191c20] border-b border-white/[0.08] px-4 py-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: role badge + nav */}
          <div className="flex items-center gap-0">
            <span className="text-xs font-mono uppercase tracking-widest bg-[#a855f7] text-white px-3 py-3.5 mr-4 shrink-0">
              Organizer
            </span>
            <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Organizer navigation">
              <Link href="/organizer/dashboard"   className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors whitespace-nowrap">Dashboard</Link>
              <Link href="/organizer/results"     className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors whitespace-nowrap">Results</Link>
              <Link href="/organizer/assignments" className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors whitespace-nowrap">Assignments</Link>
              <Link href="/organizer/rubric"      className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors whitespace-nowrap">Rubric</Link>
              <Link href="/organizer/audit"       className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors whitespace-nowrap">Audit Log</Link>
            </nav>
          </div>
          {/* Right: identity + event name */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hidden lg:block">
              Sample Hack 2026
            </span>
            <span className="text-xs font-mono text-slate-300 uppercase tracking-widest hidden sm:block">
              organizer {/* TODO: replace with real session once Krish wires auth */}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
