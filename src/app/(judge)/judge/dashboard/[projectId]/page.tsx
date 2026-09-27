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
    memberCount: number;
    existingScores: Partial<Record<Criterion, number>>;
    existingNotes: string;
    submittedAt: string;
    highlights: string[];
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
    memberCount: 3,
    existingScores: {},
    existingNotes: "",
    submittedAt: "2026-09-25T14:22:00Z",
    highlights: [
      "Zero-config eBPF-based agent with < 1% CPU overhead",
      "Web UI renders dependency graphs in < 200ms",
      "Ships with OpenTelemetry exporter",
    ],
  },
  prj_05: {
    id: "prj_05",
    title: "Helios Router",
    summary:
      "An edge-native request router with sub-millisecond latency and WASM plugin support. Routes are defined in a declarative TOML config and hot-reloaded without downtime.",
    repoUrl: "https://example.org/repo/05",
    track: "Infrastructure",
    teamName: "Solaris",
    memberCount: 2,
    existingScores: { functionality: 4, quality: 4 },
    existingNotes: "Strong implementation. Innovation score still to decide — need to check novelty vs. Envoy.",
    submittedAt: "2026-09-25T11:05:00Z",
    highlights: [
      "WASM plugin sandbox with < 0.5ms overhead",
      "Hot-reload with zero dropped requests in load tests",
      "TOML DSL with full JSONSchema validation",
    ],
  },
  prj_12: {
    id: "prj_12",
    title: "Lattice IDE",
    summary:
      "A collaborative browser-based IDE with real-time conflict resolution via CRDTs. Supports 20+ languages via LSP and runs entirely in the browser using WebAssembly.",
    repoUrl: "https://example.org/repo/12",
    track: "Developer Tools",
    teamName: "Weave",
    memberCount: 4,
    existingScores: { functionality: 5, quality: 4, innovation: 5 },
    existingNotes: "Excellent all around. CRDT impl is genuinely novel for a hackathon. Minor: test coverage is thin.",
    submittedAt: "2026-09-24T20:30:00Z",
    highlights: [
      "Full LSP support for 20+ languages in-browser via Wasm",
      "CRDT conflict resolution with operational transform fallback",
      "Works offline after first load",
    ],
  },
  prj_17: {
    id: "prj_17",
    title: "Forge CI",
    summary:
      "A self-hosted CI/CD pipeline builder with a visual drag-and-drop stage editor, built-in secrets vault, and native Docker layer caching.",
    repoUrl: "https://example.org/repo/17",
    track: "Infrastructure",
    teamName: "Buildcraft",
    memberCount: 3,
    existingScores: {},
    existingNotes: "",
    submittedAt: "2026-09-25T16:48:00Z",
    highlights: [
      "Visual DAG pipeline editor with no-code stage composition",
      "Built-in secrets vault with envelope encryption",
      "Automatic Docker layer cache sharing across pipeline runs",
    ],
  },
  prj_23: {
    id: "prj_23",
    title: "Pulsar DB",
    summary:
      "A time-series database optimised for IoT ingestion with columnar compression and a SQL-compatible query layer. Handles 500k writes/second on a single node.",
    repoUrl: "https://example.org/repo/23",
    track: "Data & Storage",
    teamName: "Meridian",
    memberCount: 2,
    existingScores: { functionality: 3 },
    existingNotes: "",
    submittedAt: "2026-09-25T09:12:00Z",
    highlights: [
      "500k writes/second on commodity hardware",
      "Columnar compression with 8:1 average ratio",
      "SQL query layer compatible with standard drivers",
    ],
  },
};

// Ordered list for prev/next navigation
const PROJECT_IDS = Object.keys(MOCK_PROJECTS);

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }) + " UTC";
}

export default async function JudgeScoringPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = MOCK_PROJECTS[projectId];

  // 404 if not in this judge's assignment (real: Krish's scoped query returns null)
  if (!project) notFound();

  const currentIndex = PROJECT_IDS.indexOf(projectId);
  const prevId = currentIndex > 0 ? PROJECT_IDS[currentIndex - 1] : null;
  const nextId = currentIndex < PROJECT_IDS.length - 1 ? PROJECT_IDS[currentIndex + 1] : null;
  const scoredCount = Object.values(project.existingScores).filter((v) => v !== undefined).length;
  const isFullyScored = scoredCount === 3;

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/judge/dashboard"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors mb-5"
          >
            ← Back to Assigned Projects
          </Link>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
              >
                {project.title}
              </h1>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">
                Submitted {formatDate(project.submittedAt)}
              </p>
            </div>
            {/* Live pulse — detail page only */}
            <div className="relative flex h-3 w-3 mt-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe330a] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe330a]" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.track && (
              <span className="text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-[#00f0ff]/20 text-[#00f0ff] px-3 py-1.5 rounded-sm">
                {project.track}
              </span>
            )}
            {project.teamName && (
              <span className="text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-white/10 text-white px-3 py-1.5 rounded-sm">
                Team: {project.teamName}
              </span>
            )}
            <span className="text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-white/10 text-slate-400 px-3 py-1.5 rounded-sm">
              {project.memberCount} members
            </span>
            {/* Score status */}
            <span
              className={[
                "text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-sm border",
                isFullyScored
                  ? "bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]"
                  : scoredCount > 0
                  ? "bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]"
                  : "bg-white/[0.03] border-white/10 text-slate-500",
              ].join(" ")}
            >
              {isFullyScored ? "✓ Fully scored" : scoredCount > 0 ? `${scoredCount}/3 criteria` : "Not scored"}
            </span>
          </div>
        </div>
      </div>

      {/* Main content: 2-col on large, stacked on mobile */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left col: project info (1/3) */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            {/* Summary card */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Project Summary
              </h2>
              <p className="text-[#111318] text-sm leading-relaxed">{project.summary}</p>
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

            {/* Highlights card */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Key Highlights
              </h2>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#111318]">
                    <span className="text-[#fe330a] font-bold mt-0.5 shrink-0">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rubric quick ref */}
            <div className="bg-[#191c20] border border-white/[0.08] rounded-lg p-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Rubric Weights
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Functionality", weight: 40 },
                  { label: "Code Quality", weight: 30 },
                  { label: "Innovation", weight: 30 },
                ].map(({ label, weight }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex-1 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#fe330a] rounded-full"
                        style={{ width: `${weight}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 w-24 text-right uppercase tracking-wider">
                      {label} {weight}%
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="/judge/guidelines"
                className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-[#00f0ff] transition-colors"
              >
                Full guidelines →
              </a>
            </div>
          </aside>

          {/* Right col: scoring form (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2
              className="text-lg font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
            >
              Your Scores
            </h2>
            <ScoringForm
              projectId={project.id}
              projectTitle={project.title}
              existingScores={project.existingScores}
              existingNotes={project.existingNotes}
            />
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-white/[0.08] pt-6 mt-8 flex items-center justify-between gap-4">
          {prevId ? (
            <Link
              href={`/judge/dashboard/${prevId}`}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>{MOCK_PROJECTS[prevId!]!.title}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/judge/dashboard"
            className="text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-[#fe330a] transition-colors"
          >
            All Projects
          </Link>
          {nextId ? (
            <Link
              href={`/judge/dashboard/${nextId}`}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors group"
            >
              <span>{MOCK_PROJECTS[nextId!]!.title}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  );
}
