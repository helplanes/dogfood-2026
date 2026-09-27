import { PublicProject } from "@/contracts";

interface GalleryCardProps {
  project: PublicProject;
  /**
   * When true, renders the repo URL as a real <a> link.
   * Set false (default) when the card is already wrapped in a <Link>
   * to avoid invalid nested <a> elements and hydration errors.
   */
  showRepoLink?: boolean;
}

/**
 * GalleryCard — DESIGN-4-HYBRID §3
 * Structure: Title → Summary (2 lines) → Track badge → Team badge → Repo indicator
 * Background: pure white #ffffff. NO inner dark box. NO decorative text.
 * Hover: border turns #fe330a only. No lift, no glow. Clean and subtle.
 *
 * IMPORTANT: Do NOT wrap this in a <Link> AND pass showRepoLink={true} at the
 * same time — that would create nested <a> elements (invalid HTML).
 * Gallery usage: wrap in <Link>, leave showRepoLink={false} (default).
 * Detail page usage: do not wrap in Link, pass showRepoLink={true}.
 */
export function GalleryCard({ project, showRepoLink = false }: GalleryCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 flex flex-col h-full transition-colors duration-200 hover:border-[#fe330a]">
      {/* Title — Syne font-black uppercase */}
      <h3 className="text-lg font-bold uppercase tracking-tight text-[#111318] mb-2">
        {project.title}
      </h3>

      {/* Summary — 2 line clamp */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 flex-1">
        {project.summary}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.track && (
          <span className="text-xs font-mono uppercase tracking-wider bg-[#111318] text-white px-2 py-1 rounded-sm">
            {project.track}
          </span>
        )}
        {project.teamName && (
          <span className="text-xs font-mono uppercase tracking-wider bg-[#f8f9fc] border border-[#e2e8f0] text-slate-600 px-2 py-1 rounded-sm">
            {project.teamName}
          </span>
        )}
      </div>

      {/* Repo indicator */}
      {project.repoUrl && (
        showRepoLink ? (
          /* Real link — safe only when card is NOT inside another <a> */
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fe330a] hover:text-[#ff4d26] text-sm font-bold uppercase tracking-widest mt-auto inline-flex items-center gap-1 transition-colors"
          >
            View Source →
          </a>
        ) : (
          /* Plain indicator — no <a> inside the card when wrapped in Link */
          <span className="text-[#fe330a] text-sm font-bold uppercase tracking-widest mt-auto inline-flex items-center gap-1">
            View Source →
          </span>
        )
      )}
    </div>
  );
}
