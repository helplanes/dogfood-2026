import React from "react";
import Link from "next/link";
import { PublicProject } from "@/contracts";

export function GalleryCard({ project }: { project: PublicProject }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-surface border border-stone-800 hover:border-stone-700 hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden">
      {/* Card Thumbnail Container */}
      <div className="relative h-48 w-full bg-gradient-to-br from-stone-800 to-stone-900 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

        {/* Category & Rating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-background/80 backdrop-blur-md text-stone-200 border border-stone-700/60">
            {project.track}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-background/80 backdrop-blur-md text-primary border border-primary/40 flex items-center gap-1">
             OPEN SOURCE
          </span>
        </div>

        {/* Sub-tag overlay */}
        <div className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-stone-400 bg-black/60 px-2 py-0.5 rounded border border-stone-800">
          {project.teamName}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-syne font-bold text-white tracking-tight group-hover:text-stone-100 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-stone-400 font-sans leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-800/80 flex items-center gap-2">
          <Link href={`/projects/${project.id}`} className="flex-1 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-800 flex items-center justify-center gap-1.5 transition-colors">
            View Specs
          </Link>
          <Link href={`/projects/${project.id}`} className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1">
            Enter Project &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
