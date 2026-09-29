"use client";

import type { Criterion } from "@/contracts";
import { ScoringForm } from "@/components/judging/ScoringForm";

export function ScoringFormClient(props: {
  project: {
    id: string;
    title: string;
    summary: string | null;
    repoUrl: string | null;
    track: string | null;
    teamName: string | null;
    existingScores: Partial<Record<Criterion, number>>;
  };
}) {
  async function onSave(scores: Record<Criterion, number>) {
    for (const [criterion, value] of Object.entries(scores) as [Criterion, number][]) {
      const res = await fetch("/api/judge/scores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId: props.project.id, criterion, value }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
    }
  }

  return <ScoringForm project={props.project} onSave={onSave} />;
}
