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
    <div className="w-full h-full font-sans">
      <ScoringFormClient project={project} />
    </div>
  );
}
