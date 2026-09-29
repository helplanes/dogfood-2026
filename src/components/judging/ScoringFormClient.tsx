"use client";

import type { Criterion } from "@/contracts";
import { ScoringForm } from "@/components/judging/ScoringForm";

export function ScoringFormClient(props: {
  projectId: string;
  projectTitle: string;
  existingScores?: Partial<Record<Criterion, number>>;
}) {
  async function onSave(scores: Record<Criterion, number>) {
    for (const [criterion, value] of Object.entries(scores) as [Criterion, number][]) {
      const res = await fetch("/api/judge/scores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId: props.projectId, criterion, value }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
    }
  }

  return <ScoringForm {...props} onSave={onSave} />;
}
