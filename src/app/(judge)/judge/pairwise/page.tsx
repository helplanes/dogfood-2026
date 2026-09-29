import Link from "next/link";
import { redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { PairwiseVoter } from "@/components/judging/PairwiseVoter";

export const metadata = { title: "Pairwise Judging" };

export const dynamic = "force-dynamic";

// Bonus judging mode (spec: "Pairwise +5"). Never required, never replaces the rubric score —
// see JUDGING.md.
export default async function JudgePairwisePage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "judge:scores:read");
  if (!decision.ok) redirect("/login");

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto space-y-8 w-full">
        <div>
          <Link href="/judge/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors font-bold tracking-widest uppercase">
            &larr; BACK TO ASSIGNMENTS
          </Link>
        </div>
        <header className="space-y-3">
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">Pairwise Judging</h1>
          <p className="text-stone-400 text-sm max-w-2xl">
            Optional, bonus mode. Pick the stronger of two projects — no need to assign a number.
            This never replaces your rubric scores; it only ranks by wins and losses.
          </p>
        </header>
        <PairwiseVoter />
      </div>
    </div>
  );
}
