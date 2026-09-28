import type { ReactNode } from "react";
import Link from "next/link";

export default function JudgeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Judge Sleek Sub-header */}
      <div className="bg-[#0c0e13]/50 backdrop-blur-md border-b border-stone-800/50 sticky top-0 z-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: role badge + nav */}
          <div className="flex items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-[#fe330a] text-white px-3 py-1 rounded-sm mr-6 shrink-0 flex items-center gap-1.5 font-bold shadow-[0_0_8px_rgba(254,51,10,0.4)]">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              TIER 1 JUROR
            </span>
            <nav className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar" aria-label="Judge navigation">
              <Link href="/judge/dashboard"   className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">My Projects</Link>
              <Link href="/judge/guidelines"  className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-white hover:bg-stone-800/50 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium">Guidelines</Link>
            </nav>
          </div>
          {/* Right: session identity */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest hidden lg:block border border-stone-800 px-2 py-0.5 rounded-sm">
              DOUBLE BLIND REVIEW
            </span>
            <span className="flex items-center gap-2 text-xs font-mono text-stone-300 uppercase tracking-widest hidden sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]" />
              SESSION: judge_a
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#090b10]">{children}</div>
    </div>
  );
}
