import { notFound } from "next/navigation";
import Link from "next/link";
import { ScoringForm } from "@/components/judging/ScoringForm";
import { Criterion } from "@/contracts";

/**
 * Mock project data for the scoring view.
 * TODO: replace with Krish's typed getAssignedProject(judgeId, projectId) from src/repo.
 * That function must be assignment-scoped — only returns data if this judge is assigned.
 */
const MOCK_PROJECTS: Record<
  string,
  {
    id: string;
    title: string;
    summary: string;
    repoUrl: string | null;
    track: string | null;
    teamName: string | null;
    existingScores: Partial<Record<Criterion, number>>;
  }
> = {
  prj_01: {
    id: "prj_01",
    title: "Glass Signal",
    summary:
      "A real-time distributed tracing tool for microservices with a zero-config agent. Instruments your services automatically and surfaces latency, error rates, and dependency graphs in a clean web UI.",
    repoUrl: "https://example.org/repo/01",
    track: "Developer Tools",
    teamName: "Ironforge",
    existingScores: {},
  },
  prj_05: {
    id: "prj_05",
    title: "Helios Router",
    summary:
      "An edge-native request router with sub-millisecond latency and WASM plugin support. Routes are defined in a declarative TOML config and hot-reloaded without downtime.",
    repoUrl: "https://example.org/repo/05",
    track: "Infrastructure",
    teamName: "Solaris",
    existingScores: { functionality: 4, quality: 4 },
  },
  prj_12: {
    id: "prj_12",
    title: "Lattice IDE",
    summary:
      "A collaborative browser-based IDE with real-time conflict resolution via CRDTs. Supports 20+ languages via LSP and runs entirely in the browser using WebAssembly.",
    repoUrl: "https://example.org/repo/12",
    track: "Developer Tools",
    teamName: "Weave",
    existingScores: { functionality: 5, quality: 4, innovation: 5 },
  },
};

export default async function JudgeScoringPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = MOCK_PROJECTS[projectId];

  // 404 if not in this judge's assignment (real: Krish's scoped query returns null)
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/judge/dashboard"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors mb-5"
          >
            ← Back to Assigned Projects
          </Link>

          <div className="flex items-start justify-between gap-4">
            <h1
              className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
            >
              {project.title}
            </h1>
            {/* Telemetry pulse — detail page only per DESIGN-4-HYBRID §5 */}
            <div className="relative flex h-3 w-3 mt-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe330a] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe330a]" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-3">
            {project.track && (
              <span className="text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-[#00f0ff]/20 text-[#00f0ff] px-3 py-1.5 rounded-sm">
                Track: {project.track}
              </span>
            )}
            {project.teamName && (
              <span className="text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-white/10 text-white px-3 py-1.5 rounded-sm">
                Team: {project.teamName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
        {/* Project summary — white card */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Project Specification
          </h2>
          <p className="text-[#111318] text-sm md:text-base leading-relaxed">
            {project.summary}
          </p>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm font-bold uppercase tracking-widest text-[#fe330a] hover:text-[#ff4d26] transition-colors"
            >
              View Repository →
            </a>
          )}
        </div>

        {/* Scoring section */}
        <div>
          <h2
            className="text-lg font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Your Scores
          </h2>
          <ScoringForm
            projectId={project.id}
            projectTitle={project.title}
            existingScores={project.existingScores}
          />
        </div>

        {/* Back link */}
        <div className="border-t border-white/[0.08] pt-6">
          <Link
            href="/judge/dashboard"
            className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors"
          >
            ← All Assigned Projects
          </Link>
        </div>
      </main>
    </div>
  );
}
