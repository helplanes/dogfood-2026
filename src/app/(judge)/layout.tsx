import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Judge section layout — DESIGN-4-HYBRID
 * Dark world canvas with surface-low sidebar accent.
 * Auth guard is Krish's responsibility via src/policy; this shell
 * shows the structure and will receive session data once wired.
 */
export default function JudgeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111318] flex flex-col">
      {/* Judge sub-header */}
      <div className="bg-[#191c20] border-b border-white/[0.08] px-4 py-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: role badge + nav links */}
          <div className="flex items-center gap-0">
            <span className="text-xs font-mono uppercase tracking-widest bg-[#fe330a] text-white px-3 py-3.5 mr-4">
              Judge
            </span>
            <nav className="flex items-center gap-1" aria-label="Judge navigation">
              <Link
                href="/judge/dashboard"
                className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors"
              >
                My Projects
              </Link>
              <Link
                href="/judge/guidelines"
                className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.05] px-3 py-3.5 transition-colors"
              >
                Guidelines
              </Link>
            </nav>
          </div>
          {/* Right: session identity */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hidden sm:block">
              Signed in as
            </span>
            <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
              judge_a {/* TODO: replace with real session user name once Krish wires auth */}
            </span>
            {/* Online indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
