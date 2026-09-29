import Link from "next/link";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { getAssignedProjects } from "@/repo/queries";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CRITERIA_COUNT = 3;

export default async function JudgeDashboardPage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) redirect("/login");

  const projects = await getAssignedProjects(actor.userId!);
  const scoredCount = projects.filter((p) => Object.keys(p.existingScores).length === CRITERIA_COUNT).length;
  const pendingCount = projects.length - scoredCount;

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 selection:text-white px-4 py-8 md:px-12 md:py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-xl bg-surface/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            <span className="text-stone-300 font-semibold">JUDGE DASHBOARD</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-stone-800/50">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary">
              {projects.length} ASSIGNED PROJECTS
            </div>
            <h1 className="text-4xl md:text-5xl font-syne font-normal tracking-tight text-white leading-tight">
              Your Assignments.{" "}
              <span className="italic text-primary font-normal">Review & Score.</span>
            </h1>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed">
              Only projects in your assigned tracks are shown here. You never see another judge&apos;s scores.
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 md:px-8 md:py-5 rounded-2xl bg-surface-hover border border-stone-800 shadow-xl shrink-0">
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">ASSIGNED</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">{projects.length}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">SCORED</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">{scoredCount}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">PENDING</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-amber-400">{pendingCount}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const done = Object.keys(project.existingScores).length === CRITERIA_COUNT;
            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between p-6 rounded-2xl bg-surface border transition-all duration-200 ${
                  done ? "border-stone-800/80 hover:border-stone-700" : "border-amber-500/30 hover:border-amber-500/60"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase">ID: {project.id}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                        done
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                          : "bg-amber-950/40 text-amber-300 border-amber-600/40"
                      }`}
                    >
                      {done ? "Scored" : "Pending"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-syne text-white line-clamp-1">{project.title}</h2>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">{project.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/60 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-stone-400">
                      <span>TRACK:</span>
                      <span className="px-2 py-0.5 rounded bg-stone-800/60 text-stone-300 border border-stone-700/50">
                        {project.track}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-stone-400">
                      <span>TEAM:</span>
                      <span className="text-stone-200 font-medium">{project.teamName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/judge/dashboard/${project.id}`}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                      done
                        ? "bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/80"
                        : "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25"
                    }`}
                  >
                    {done ? "Edit Scores" : "Review Project"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
