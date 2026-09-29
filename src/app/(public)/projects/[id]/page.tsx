import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Public view: no scores, ever.
export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getPublicProject(id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-12 space-y-12">
        <div>
          <Link href="/projects" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors flex items-center gap-2 font-bold tracking-widest uppercase">
            &larr; BACK TO GALLERY
          </Link>
        </div>

        <header className="space-y-6 border-b border-stone-800/80 pb-10">
          <div className="flex items-center gap-3">
            {project.track ? (
              <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-surface border border-stone-700/60 text-stone-300">
                {project.track}
              </span>
            ) : null}
          </div>

          <h1 className="text-5xl md:text-6xl font-syne font-bold text-white tracking-tight">{project.title}</h1>

          <div className="flex items-center justify-between pt-4">
            {project.teamName ? (
              <div className="flex items-center gap-2 text-sm font-mono text-stone-400">
                <span className="tracking-widest text-[10px]">BUILT BY</span>
                <span className="text-stone-200 font-bold">{project.teamName}</span>
              </div>
            ) : <span />}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover text-stone-200 text-xs font-mono font-medium border border-stone-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                Source Code
              </a>
            ) : null}
          </div>
        </header>

        <article className="prose prose-invert prose-stone max-w-none prose-headings:font-syne prose-headings:font-bold prose-headings:text-white prose-p:font-sans prose-p:text-stone-300 prose-a:text-primary hover:prose-a:text-primary-hover">
          <p className="text-xl leading-relaxed text-stone-200">{project.summary}</p>
        </article>
      </main>
    </div>
  );
}
