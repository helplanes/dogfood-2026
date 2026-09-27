import Link from "next/link";
import { PublicProject } from "@/contracts";

/**
 * Mock assigned-project data for judge_a (session: jdg_a_91bc → maps to jdg_01 in fixtures).
 * TODO: replace with Krish's typed getAssignedProjects(judgeId) from src/repo.
 * Requested in HANDOFF.md under Shriyash heading.
 *
 * Shape follows PublicProject + scores per criterion + notes.
 */
const MOCK_ASSIGNED_PROJECTS: (PublicProject & {
  scored: { functionality: boolean; quality: boolean; innovation: boolean };
  scores: { functionality: number | null; quality: number | null; innovation: number | null };
  lastUpdated: string | null;
})[] = [
  {
    id: "prj_01",
    title: "Glass Signal",
    summary:
      "A real-time distributed tracing tool for microservices with a zero-config agent. Instruments your services automatically and surfaces latency, error rates, and dependency graphs.",
    repoUrl: "https://example.org/repo/01",
    track: "Developer Tools",
    teamName: "Ironforge",
    scored: { functionality: false, quality: false, innovation: false },
    scores: { functionality: null, quality: null, innovation: null },
    lastUpdated: null,
  },
  {
    id: "prj_05",
    title: "Helios Router",
    summary:
      "An edge-native request router with sub-millisecond latency and WASM plugin support. Routes are defined in a declarative TOML config and hot-reloaded without downtime.",
    repoUrl: "https://example.org/repo/05",
    track: "Infrastructure",
    teamName: "Solaris",
    scored: { functionality: true, quality: true, innovation: false },
    scores: { functionality: 4, quality: 4, innovation: null },
    lastUpdated: "2026-09-27T08:30:00Z",
  },
  {
    id: "prj_12",
    title: "Lattice IDE",
    summary:
      "A collaborative browser-based IDE with real-time conflict resolution via CRDTs. Supports 20+ languages via LSP and runs entirely in the browser using WebAssembly.",
    repoUrl: "https://example.org/repo/12",
    track: "Developer Tools",
    teamName: "Weave",
    scored: { functionality: true, quality: true, innovation: true },
    scores: { functionality: 5, quality: 4, innovation: 5 },
    lastUpdated: "2026-09-27T09:15:00Z",
  },
  {
    id: "prj_17",
    title: "Forge CI",
    summary:
      "A self-hosted CI/CD pipeline builder with a visual drag-and-drop stage editor, built-in secrets vault, and native Docker layer caching.",
    repoUrl: "https://example.org/repo/17",
    track: "Infrastructure",
    teamName: "Buildcraft",
    scored: { functionality: false, quality: false, innovation: false },
    scores: { functionality: null, quality: null, innovation: null },
    lastUpdated: null,
  },
  {
    id: "prj_23",
    title: "Pulsar DB",
    summary:
      "A time-series database optimised for IoT ingestion with columnar compression and a SQL-compatible query layer. Handles 500k writes/second on a single node.",
    repoUrl: "https://example.org/repo/23",
    track: "Data & Storage",
    teamName: "Meridian",
    scored: { functionality: true, quality: false, innovation: false },
    scores: { functionality: 3, quality: null, innovation: null },
    lastUpdated: "2026-09-26T17:45:00Z",
  },
];

function scoredCount(scored: { functionality: boolean; quality: boolean; innovation: boolean }) {
  return Object.values(scored).filter(Boolean).length;
}

function weightedAvg(scores: {
  functionality: number | null;
  quality: number | null;
  innovation: number | null;
}): number | null {
  const weights = { functionality: 40, quality: 30, innovation: 30 };
  const entries = Object.entries(scores) as [keyof typeof scores, number | null][];
  const filled = entries.filter(([, v]) => v !== null) as [keyof typeof scores, number][];
  if (filled.length === 0) return null;
  const totalWeight = filled.reduce((s, [k]) => s + weights[k], 0);
  const weighted = filled.reduce((s, [k, v]) => s + v * weights[k], 0);
  return Math.round((weighted / totalWeight) * 10) / 10;
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "< 1h ago";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function JudgeDashboardPage() {
  const total = MOCK_ASSIGNED_PROJECTS.length;
  const fullyScored = MOCK_ASSIGNED_PROJECTS.filter((p) => scoredCount(p.scored) === 3).length;
  const inProgress = MOCK_ASSIGNED_PROJECTS.filter(
    (p) => scoredCount(p.scored) > 0 && scoredCount(p.scored) < 3
  ).length;
  const pending = MOCK_ASSIGNED_PROJECTS.filter((p) => scoredCount(p.scored) === 0).length;

  const CRITERIA_LABELS = ["Func.", "Quality", "Innovation"] as const;
  const CRITERIA_KEYS = ["functionality", "quality", "innovation"] as const;

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
            DOGFOOD 2026 — Judging round open
          </p>
        </div>
      </div>

      {/* Stats + progress bar */}
      <div className="bg-[#191c20] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* Stat pills */}
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <StatPill
              value={total}
              label="Assigned"
              color="text-white"
              bg="bg-white/[0.06]"
              border="border-white/10"
            />
            <StatPill
              value={fullyScored}
              label="Complete"
              color="text-[#22c55e]"
              bg="bg-[#22c55e]/10"
              border="border-[#22c55e]/30"
            />
            <StatPill
              value={inProgress}
              label="In Progress"
              color="text-[#f59e0b]"
              bg="bg-[#f59e0b]/10"
              border="border-[#f59e0b]/30"
            />
            <StatPill
              value={pending}
              label="Pending"
              color="text-slate-400"
              bg="bg-white/[0.03]"
              border="border-white/10"
            />
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#282a2f] rounded-full h-2 overflow-hidden">
              {/* Green = fully scored */}
              <div className="h-full flex">
                <div
                  className="h-full bg-[#22c55e] transition-all duration-500"
                  style={{ width: `${(fullyScored / total) * 100}%` }}
                />
                <div
                  className="h-full bg-[#f59e0b] transition-all duration-500"
                  style={{ width: `${(inProgress / total) * 100}%` }}
                />
              </div>
            </div>
            <span
              className="text-xs font-mono text-slate-400 uppercase tracking-widest shrink-0"
              role="progressbar"
              aria-valuenow={fullyScored}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${fullyScored} of ${total} projects fully scored`}
            >
              {Math.round((fullyScored / total) * 100)}% scored
            </span>
          </div>
        </div>
      </div>

      {/* Project list */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Notice banner */}
        <div className="mb-8 flex items-start gap-3 bg-[#191c20] border border-[#00f0ff]/20 rounded-lg px-4 py-3">
          <span className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest shrink-0 mt-0.5">
            DEMO
          </span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Showing mock assigned projects for{" "}
            <code className="text-white font-mono">judge_a</code>. Replace with{" "}
            <code className="text-white font-mono">getAssignedProjects(judgeId)</code> from{" "}
            <code className="text-white font-mono">src/repo</code> when Krish&apos;s backend is
            wired.
          </p>
        </div>

        {/* Section headers */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            All Projects ({total})
          </h2>
          <a
            href="/judge/guidelines"
            className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#00f0ff] transition-colors"
          >
            View Rubric →
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {MOCK_ASSIGNED_PROJECTS.map((project) => {
            const done = scoredCount(project.scored);
            const isFullyScored = done === 3;
            const isInProgress = done > 0 && !isFullyScored;
            const avg = weightedAvg(project.scores);

            return (
              <div
                key={project.id}
                className={[
                  "bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-5 transition-all duration-200",
                  isFullyScored
                    ? "border-[#22c55e]/40 hover:border-[#22c55e]"
                    : isInProgress
                    ? "border-[#f59e0b]/40 hover:border-[#f59e0b]"
                    : "border-[#e2e8f0] hover:border-[#fe330a]",
                ].join(" ")}
              >
                {/* Left: project info */}
                <div className="flex-1 min-w-0">
                  {/* Title + status pill */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-bold uppercase tracking-tight text-[#111318]">
                      {project.title}
                    </h3>
                    <StatusPill done={done} isFullyScored={isFullyScored} />
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {project.summary}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
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
                    {project.lastUpdated && (
                      <span className="text-xs font-mono text-slate-400">
                        Updated {formatRelativeTime(project.lastUpdated)}
                      </span>
                    )}
                  </div>

                  {/* Per-criterion mini scores */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {CRITERIA_KEYS.map((key, i) => {
                      const val = project.scores[key];
                      return (
                        <div key={key} className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            {CRITERIA_LABELS[i]}
                          </span>
                          <span
                            className={[
                              "text-[11px] font-bold font-mono px-1.5 py-0.5 rounded",
                              val !== null
                                ? "bg-[#111318] text-white"
                                : "bg-[#f1f5f9] text-slate-400",
                            ].join(" ")}
                          >
                            {val ?? "—"}
                          </span>
                        </div>
                      );
                    })}
                    {avg !== null && (
                      <div className="flex items-center gap-1 ml-1 pl-3 border-l border-[#e2e8f0]">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Weighted
                        </span>
                        <span className="text-[11px] font-bold font-mono text-[#fe330a]">
                          {avg}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: action */}
                <div className="flex sm:flex-col gap-2 items-center sm:items-end shrink-0">
                  <Link
                    href={`/judge/dashboard/${project.id}`}
                    className={[
                      "px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a]",
                      isFullyScored
                        ? "bg-[#f8f9fc] border border-[#e2e8f0] text-slate-500 hover:border-[#fe330a] hover:text-[#fe330a]"
                        : "bg-[#fe330a] text-white hover:bg-[#ff4d26] shadow-sm",
                    ].join(" ")}
                  >
                    {isFullyScored ? "Edit Scores" : isInProgress ? "Continue →" : "Score Now"}
                  </Link>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-[#fe330a] transition-colors"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tip */}
        <p className="mt-8 text-center text-xs font-mono text-slate-600 uppercase tracking-widest">
          Tip — click any project to score it. All scores are private until the event closes.
        </p>
      </main>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function StatPill({
  value,
  label,
  color,
  bg,
  border,
}: {
  value: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${bg} ${border}`}
    >
      <span className={`text-lg font-black tabular-nums leading-none ${color}`}>{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  );
}

function StatusPill({
  done,
  isFullyScored,
}: {
  done: number;
  isFullyScored: boolean;
}) {
  if (isFullyScored) {
    return (
      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30">
        ✓ Scored
      </span>
    );
  }
  if (done > 0) {
    return (
      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30">
        {done}/3 criteria
      </span>
    );
  }
  return (
    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
      Pending
    </span>
  );
}
