import type { ReactNode } from "react";
import Link from "next/link";

export default function OrganizerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Organizer Sleek Sub-header */}
      <div className="bg-[#0c0e13]/50 backdrop-blur-md border-b border-stone-800/50 sticky top-0 z-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: role badge + nav */}
          <div className="flex items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-[#fe330a] text-white px-3 py-1 rounded-sm mr-6 shrink-0 flex items-center gap-1.5 font-bold shadow-[0_0_8px_rgba(254,51,10,0.4)]">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              ORGANIZER
            </span>
            <nav className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar" aria-label="Organizer navigation">
              <Link href="/organizer/dashboard"   className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Dashboard</Link>
              <Link href="/organizer/results"     className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Results</Link>
              <Link href="/organizer/assignments" className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Assignments</Link>
              <Link href="/organizer/rubric"      className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Rubric</Link>
              <Link href="/organizer/audit"       className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Audit Log</Link>
            </nav>
          </div>
          {/* Right: identity + event name */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest hidden lg:block border border-stone-800 px-2 py-0.5 rounded-sm">
              DOGFOOD 2026 ORCHESTRATION
            </span>
            <span className="flex items-center gap-2 text-xs font-mono text-stone-300 uppercase tracking-widest hidden sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]" />
              SESSION: ONLINE
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#090b10]">{children}</div>
    </div>
  );
}
