import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { getAssignedProject } from "@/repo/queries";
import { ScoringFormClient } from "@/components/judging/ScoringFormClient";

export const dynamic = "force-dynamic";

export default async function JudgeScoringPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) redirect("/login");

  const project = await getAssignedProject(actor.userId!, projectId);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto space-y-8 w-full">
        <Link href="/judge/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors font-bold tracking-widest uppercase">
          &larr; BACK TO ASSIGNMENTS
        </Link>
        <header className="space-y-3 pb-6 border-b border-stone-800/50">
          {project.track ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-surface border border-stone-700/60 text-stone-300">
              {project.track}
            </span>
          ) : null}
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Review: {project.title}</h1>
        </header>
        <ScoringFormClient projectId={project.id} projectTitle={project.title} existingScores={project.existingScores} />
      </div>
    </div>
  );
}
