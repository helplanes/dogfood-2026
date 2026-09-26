import { PublicProject } from "@/contracts";

export function GalleryCard({ project }: { project: PublicProject }) {
  return (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-lg p-5 shadow-sm text-[#111318] flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_10px_30px_rgba(254,51,10,0.12)] hover:border-[#fe330a]">
      {/* Dark Preview Window / Obsidian Interior Box */}
      <div className="bg-[#0c0e13] h-32 rounded-md mb-4 border border-white/10 flex items-center justify-center">
         <span className="text-white/20 font-mono text-xs tracking-widest uppercase">01 // REPOSITORY RECON</span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-xl mb-2 text-[#111318] uppercase tracking-tight">{project.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.track && (
            <span className="inline-block bg-[#191c20] text-white text-xs font-mono px-2 py-1 rounded-sm uppercase tracking-wider">
              {project.track}
            </span>
          )}
          {project.teamName && (
            <span className="inline-block bg-[#f8f9fc] border border-[#e2e8f0] text-slate-600 text-xs font-mono px-2 py-1 rounded-sm uppercase tracking-wider">
              {project.teamName}
            </span>
          )}
        </div>
      </div>
      {project.repoUrl && (
        <a 
          href={project.repoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#fe330a] hover:text-[#ff4d26] text-sm font-bold uppercase tracking-widest mt-auto inline-flex items-center gap-1"
        >
          View Source &rarr;
        </a>
      )}
    </div>
  );
}
