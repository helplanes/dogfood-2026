import Link from "next/link";
import { redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { getJudgeLoads } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Auto-assign and per-judge overrides are not implemented; assignment is fixed from the fixture
// (judge_tracks). This page shows real review progress only.
export default async function OrganizerAssignmentsPage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) redirect("/login");

  const judges = await getJudgeLoads();

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/50">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors">
                &larr; DASHBOARD
              </Link>
              <span className="text-stone-600">/</span>
              <span className="text-xs font-mono text-primary tracking-widest uppercase">Judges</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight">Judge Progress</h1>
            <p className="text-stone-400 text-sm">
              Track eligibility and review progress. Assignment editing is not implemented yet.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((judge) => (
            <div key={judge.id} className="p-6 rounded-2xl bg-surface border border-stone-800 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-syne text-white font-bold">{judge.name}</h3>
                <span className="text-xs font-mono text-stone-500 uppercase">ID: {judge.id}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">PROJECTS SCORED / ASSIGNED</span>
                  <span className={judge.scored >= judge.assigned && judge.assigned > 0 ? "text-emerald-400" : "text-stone-200"}>
                    {judge.scored} / {judge.assigned}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-background overflow-hidden border border-stone-800">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${judge.assigned ? Math.min(100, (judge.scored / judge.assigned) * 100) : 0}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-4 border-t border-stone-800/80">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">Eligible Tracks</span>
                <div className="flex flex-wrap gap-2">
                  {judge.tracks.map((track) => (
                    <span key={track} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700/50 text-[10px] font-mono text-stone-300">
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
