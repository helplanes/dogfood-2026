import type { ReactNode } from "react";

/**
 * Judge section layout — DESIGN-4-HYBRID
 * Dark world canvas with surface-low sidebar accent.
 * Auth guard is Krish's responsibility via src/policy; this shell
 * shows the structure and will receive session data once wired.
 */
export default function JudgeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111318] flex flex-col">
      {/* Judge sub-header — surface-low strip to distinguish from public pages */}
      <div className="bg-[#191c20] border-b border-white/[0.08] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Role badge */}
            <span className="text-xs font-mono uppercase tracking-widest bg-[#fe330a] text-white px-2 py-1 rounded-sm">
              Judge
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Judging Console
            </span>
          </div>
          {/* TODO: replace with real session user name once Krish wires auth */}
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            judge_a {/* demo session */}
          </span>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
