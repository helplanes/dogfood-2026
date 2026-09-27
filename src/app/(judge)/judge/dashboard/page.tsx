import Link from "next/link";
import { PublicProject } from "@/contracts";

/**
 * Mock assigned-project data for judge_a (session: jdg_a_91bc → maps to jdg_01 in fixtures).
 * TODO: replace with Krish's typed getAssignedProjects(judgeId) from src/repo.
 * Requested in HANDOFF.md under Shriyash heading.
 *
 * Shape follows PublicProject + a scored flag per criterion.
 */
const MOCK_ASSIGNED_PROJECTS: (PublicProject & {
  scored: { functionality: boolean; quality: boolean; innovation: boolean };
})[] = [
  {
    id: "prj_01",
    title: "Glass Signal",
    summary: "A real-time distributed tracing tool for microservices with a zero-config agent.",
    repoUrl: "https://example.org/repo/01",
    track: "Developer Tools",
    teamName: "Ironforge",
    scored: { functionality: false, quality: false, innovation: false },
  },
  {
    id: "prj_05",
    title: "Helios Router",
    summary: "An edge-native request router with sub-millisecond latency and WASM plugin support.",
    repoUrl: "https://example.org/repo/05",
    track: "Infrastructure",
    teamName: "Solaris",
    scored: { functionality: true, quality: true, innovation: false },
  },
  {
    id: "prj_12",
    title: "Lattice IDE",
    summary: "A collaborative browser-based IDE with real-time conflict resolution via CRDTs.",
    repoUrl: "https://example.org/repo/12",
    track: "Developer Tools",
    teamName: "Weave",
    scored: { functionality: true, quality: true, innovation: true },
  },
];

function scoredCount(scored: { functionality: boolean; quality: boolean; innovation: boolean }) {
  return Object.values(scored).filter(Boolean).length;
}

export default function JudgeDashboardPage() {
  const total = MOCK_ASSIGNED_PROJECTS.length;
  const fullyScored = MOCK_ASSIGNED_PROJECTS.filter(
    (p) => scoredCount(p.scored) === 3
  ).length;

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Assigned Projects
          </h1>
          <p className="text-[#64748b] font-mono text-xs uppercase tracking-widest mt-2">
            {fullyScored} of {total} fully scored
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#191c20] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1 bg-[#282a2f] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#fe330a] rounded-full transition-all duration-500"
              style={{ width: `${(fullyScored / total) * 100}%` }}
              role="progressbar"
              aria-valuenow={fullyScored}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${fullyScored} of ${total} projects fully scored`}
            />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest shrink-0">
            {Math.round((fullyScored / total) * 100)}% complete
          </span>
        </div>
      </div>

      {/* Project list */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Notice banner — remove when Krish wires real data */}
        <div className="mb-8 flex items-start gap-3 bg-[#191c20] border border-[#00f0ff]/20 rounded-lg px-4 py-3">
          <span className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest shrink-0 mt-0.5">
            DEMO
          </span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Showing mock assigned projects for{" "}
            <code className="text-white font-mono">judge_a</code>. Replace with{" "}
            <code className="text-white font-mono">getAssignedProjects(judgeId)</code> from{" "}
            <code className="text-white font-mono">src/repo</code> when Krish&apos;s backend is wired.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {MOCK_ASSIGNED_PROJECTS.map((project) => {
            const done = scoredCount(project.scored);
            const isFullyScored = done === 3;

            return (
              <div
                key={project.id}
                className="bg-white border border-[#e2e8f0] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#fe330a] transition-colors duration-200"
              >
                {/* Left: project info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-base font-bold uppercase tracking-tight text-[#111318]">
                      {project.title}
                    </h2>
                    {/* Score progress pill */}
                    <span
                      className={[
                        "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full",
                        isFullyScored
                          ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30"
                          : done > 0
                          ? "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30"
                          : "bg-slate-100 text-slate-400 border border-slate-200",
                      ].join(" ")}
                    >
                      {isFullyScored ? "✓ Scored" : `${done}/3 criteria`}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {project.summary}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.track && (
                      <span className="text-xs font-mono uppercase tracking-wider bg-[#111318] text-white px-2 py-0.5 rounded-sm">
                        {project.track}
                      </span>
                    )}
                    {project.teamName && (
                      <span className="text-xs font-mono uppercase tracking-wider bg-[#f8f9fc] border border-[#e2e8f0] text-slate-600 px-2 py-0.5 rounded-sm">
                        {project.teamName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: action */}
                <Link
                  href={`/judge/dashboard/${project.id}`}
                  className={[
                    "shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a]",
                    isFullyScored
                      ? "bg-[#f8f9fc] border border-[#e2e8f0] text-slate-500 hover:border-[#fe330a] hover:text-[#fe330a]"
                      : "bg-[#fe330a] text-white hover:bg-[#ff4d26]",
                  ].join(" ")}
                >
                  {isFullyScored ? "Edit Scores" : "Score Now"}
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
