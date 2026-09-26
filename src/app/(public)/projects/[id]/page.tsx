import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { PublicProject } from "@/contracts";

export const dynamic = "force-dynamic";

// Temporary function until Krish provides typed data fetcher
function getProjectById(id: string): PublicProject | null {
  const filePath = path.join(process.cwd(), "fixtures.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  const p = data.projects.find((proj: any) => proj.id === id);
  if (!p) return null;
  
  return {
    id: p.id,
    title: p.title,
    summary: p.summary,
    repoUrl: p.repo_url || null,
    track: p.track || null,
    teamName: p.team || null,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <a href="/projects" className="text-slate-500 hover:text-white uppercase font-mono tracking-widest text-xs mb-8 inline-block">
        &larr; Back to Gallery
      </a>
      
      <div className="bg-[#0c0e13] border border-white/10 rounded-lg p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Telemetry Pulse */}
        <div className="absolute top-0 right-0 p-4">
           <div className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe330a] opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe330a]"></span>
           </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {project.track && (
            <span className="inline-block bg-[#191c20] text-[#00f0ff] text-xs font-mono px-3 py-1.5 rounded-sm uppercase tracking-wider border border-[#00f0ff]/20">
              TRACK: {project.track}
            </span>
          )}
          {project.teamName && (
            <span className="inline-block bg-[#1d2024] text-white text-xs font-mono px-3 py-1.5 rounded-sm uppercase tracking-wider">
              TEAM: {project.teamName}
            </span>
          )}
        </div>

        <div className="bg-[#191c20] rounded-md p-6 border border-white/5 mb-8">
          <h3 className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">01 // PROJECT SPECIFICATION</h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {project.summary}
          </p>
        </div>

        {project.repoUrl && (
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] bg-[#fe330a] text-white shadow-[0_0_15px_rgba(254,51,10,0.4)] hover:scale-[1.02] active:scale-[0.98] px-6 py-3"
          >
            Access Repository
          </a>
        )}
      </div>
    </main>
  );
}
