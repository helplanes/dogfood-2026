import fs from "fs";
import path from "path";
import Link from "next/link";
import { PublicProject } from "@/contracts";
import { GalleryCard } from "@/components/ui/GalleryCard";

export const dynamic = "force-dynamic";

// Temporary data fetcher mapping fixtures.json to PublicProject contract
function getFixtureProjects(): PublicProject[] {
  const filePath = path.join(process.cwd(), "fixtures.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Build a track ID -> name lookup map
  const trackMap: Record<string, string> = {};
  for (const t of data.tracks) trackMap[t.id] = t.name;

  // Build a team ID -> name lookup map
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
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Projects Gallery</h1>
      <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-8">
        {projects.length} submissions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] rounded-lg">
            <GalleryCard project={project} />
          </Link>
        ))}
      </div>
    </main>
  );
}

