import fs from "fs";
import path from "path";
import { PublicProject } from "@/contracts";
import { GalleryCard } from "@/components/ui/GalleryCard";

export const dynamic = "force-dynamic";

// Temporary data fetcher mapping fixtures.json to PublicProject contract
function getFixtureProjects(): PublicProject[] {
  const filePath = path.join(process.cwd(), "fixtures.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  return data.projects.map((p: any) => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    repoUrl: p.repo_url || null,
    track: p.track || null,
    teamName: p.team || null,
  }));
}

export default function ProjectsPage() {
  const projects = getFixtureProjects();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GalleryCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
