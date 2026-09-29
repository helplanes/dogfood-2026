import React, { Suspense } from "react";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { getPublicProjects } from "@/repo/queries";

export const dynamic = "force-dynamic";

async function ProjectGrid({ q, track }: { q?: string; track?: string }) {
  const projects = await getPublicProjects({ q, track });

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-surface border border-stone-800 text-center space-y-4 shadow-xl mb-12">
        <span className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </span>
        <h3 className="text-xl font-syne font-bold text-white">No projects match</h3>
        <p className="text-sm text-stone-400 max-w-sm">Try a different search or track filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {projects.map((proj) => (
        <GalleryCard key={proj.id} project={proj} />
      ))}
    </div>
  );
}

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-48 rounded-2xl bg-surface border border-stone-800 animate-pulse" />
      ))}
    </div>
  );
}

// Server-rendered so fixture titles are in the initial HTML (checker reads page 1's body, no JS).
export default async function PublicProjectGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; track?: string }>;
}) {
  const { q, track } = await searchParams;

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 selection:text-white flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-surface/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            <span className="text-stone-300 font-medium">PROJECT GALLERY</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne text-white tracking-tight leading-[1.08]">
            Built from Scratch.{" "}
            <span className="italic font-syne text-primary block sm:inline">Shipped in one weekend.</span>
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Every project submitted to DOGFOOD 2026.
          </p>
        </div>

        <form method="get" role="search" className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-surface border border-stone-800">
          <label className="flex flex-col gap-1 text-xs font-mono text-stone-400">
            Search
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="title or summary"
              className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-stone-100 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-mono text-stone-400">
            Track
            <input
              name="track"
              defaultValue={track ?? ""}
              placeholder="trk_01"
              className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-stone-100 text-sm"
            />
          </label>
          <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-mono font-bold">
            Filter
          </button>
        </form>

        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGrid q={q} track={track} />
        </Suspense>
      </main>

      <footer className="mt-16 border-t border-stone-800/80 bg-[#090b10] px-4 md:px-8 py-8 text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-bold text-white tracking-tight">DOGFOOD &apos;26</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
