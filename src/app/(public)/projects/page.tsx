import fs from "fs";
import path from "path";
import Link from "next/link";
import { PublicProject } from "@/contracts";
import { GalleryCard } from "@/components/ui/GalleryCard";

export const dynamic = "force-dynamic";

// Temporary data fetcher — maps fixtures.json to PublicProject contract
// TODO: replace with Krish's typed getPublicProjects() from src/repo when available
function getFixtureProjects(): PublicProject[] {
  const filePath = path.join(process.cwd(), "fixtures.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const trackMap: Record<string, string> = {};
  for (const t of data.tracks) trackMap[t.id] = t.name;

  const teamMap: Record<string, string> = {};
  for (const t of data.teams) teamMap[t.id] = t.name;

  return data.projects.map((p: any) => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    repoUrl: p.repo_url || null,
    track: p.track ? (trackMap[p.track] ?? p.track) : null,
    teamName: p.team ? (teamMap[p.team] ?? p.team) : null,
  }));
}

export default function ProjectsPage() {
  const projects = getFixtureProjects();

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Page hero — dark canvas with Syne title + mono subtitle per DESIGN-4-HYBRID §4 */}
      <div className="bg-[#111318] border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
          >
            Projects Gallery
          </h1>
          <p className="text-[#64748b] font-mono text-xs uppercase tracking-widest mt-2">
            {projects.length} submissions · DOGFOOD 2026
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {projects.length === 0 ? (
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] rounded-lg"
              >
                <GalleryCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
