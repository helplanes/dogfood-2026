import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { PublicProject } from "@/contracts";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

// Temporary data fetcher — replace with Krish's typed getProjectById() from src/repo
function getProjectById(id: string): PublicProject | null {
  const filePath = path.join(process.cwd(), "fixtures.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const trackMap: Record<string, string> = {};
  for (const t of data.tracks) trackMap[t.id] = t.name;

  const teamMap: Record<string, string> = {};
  for (const t of data.teams) teamMap[t.id] = t.name;

  const p = data.projects.find((proj: any) => proj.id === id);
  if (!p) return null;

  return {
    id: p.id,
    title: p.title,
    summary: p.summary,
    repoUrl: p.repo_url || null,
    track: p.track ? (trackMap[p.track] ?? p.track) : null,
    teamName: p.team ? (teamMap[p.team] ?? p.team) : null,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero — dark canvas breadcrumb + title per DESIGN-4-HYBRID §4 */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <a
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors mb-5"
          >
            ← Back to Gallery
          </a>

          {/* Title + live status dot */}
          <div className="flex items-start justify-between gap-4">
            <h1
              className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
            >
              {project.title}
            </h1>
            {/* Telemetry pulse — reserved for detail page per DESIGN-4-HYBRID §5 */}
            <div className="relative flex h-3 w-3 mt-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe330a] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe330a]" />
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            {project.track && (
              <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-[#00f0ff]/20 text-[#00f0ff] px-3 py-1.5 rounded-sm">
                Track: {project.track}
              </span>
            )}
            {project.teamName && (
              <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider bg-[#191c20] border border-white/10 text-white px-3 py-1.5 rounded-sm">
                Team: {project.teamName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content — white card on dark world */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Project summary card — white bg, clean border per DESIGN-4-HYBRID §3 */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-8 mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Project Specification
          </h2>
          <p className="text-[#111318] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {project.summary}
          </p>
        </div>

        {/* Repo link */}
        {project.repoUrl && (
          <div className="flex items-center gap-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="px-6 py-3 text-base">
                Access Repository →
              </Button>
            </a>
          </div>
        )}

        {/* Divider + back */}
        <div className="border-t border-white/[0.08] mt-10 pt-6">
          <a
            href="/projects"
            className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#fe330a] transition-colors"
          >
            ← All Projects
          </a>
        </div>
      </main>
    </div>
  );
}
