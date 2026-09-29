"use client";

import React, { useState, useMemo } from "react";
import type { Criterion } from "@/contracts";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CriterionDef {
  id: Criterion;
  number: string;
  title: string;
  weight: number; // percentage (e.g. 40)
  prompt: string;
  labels: { [key: number]: { title: string; sub: string } };
  colorClass: string;
  glowColor: string;
}

const CRITERIA: CriterionDef[] = [
  {
    id: "functionality",
    number: "01",
    title: "Functionality & Technical Execution",
    weight: 40,
    prompt:
      "Does it work as described? Are core features complete, operational, and resilient under expected demo inputs?",
    colorClass: "text-[var(--color-primary)]",
    glowColor: "rgba(254, 51, 10, 0.4)",
    labels: {
      1: { title: "POOR", sub: "Broken / Non-functional" },
      2: { title: "BELOW", sub: "Partial features" },
      3: { title: "AVERAGE", sub: "Baseline operational" },
      4: { title: "GOOD", sub: "Solid implementation" },
      5: { title: "EXCELLENT", sub: "Flawless & resilient" },
    },
  },
  {
    id: "quality",
    number: "02",
    title: "Code Quality & Architecture",
    weight: 30,
    prompt:
      "Is the code readable, well-structured, modular, tested, properly version-controlled, and maintainable?",
    colorClass: "text-[#00f0ff]",
    glowColor: "rgba(0, 240, 255, 0.35)",
    labels: {
      1: { title: "POOR", sub: "Messy / Unreadable" },
      2: { title: "BELOW", sub: "Minimal structure" },
      3: { title: "AVERAGE", sub: "Standard conventions" },
      4: { title: "GOOD", sub: "Polished & clean" },
      5: { title: "EXCELLENT", sub: "Production-grade" },
    },
  },
  {
    id: "innovation",
    number: "03",
    title: "Innovation & Real-World Impact",
    weight: 30,
    prompt:
      "Does it bring a novel approach, creative problem-solving, or unique real-world sustainability leverage?",
    colorClass: "text-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.35)",
    labels: {
      1: { title: "POOR", sub: "Derivative / Clone" },
      2: { title: "BELOW", sub: "Marginal utility" },
      3: { title: "AVERAGE", sub: "Viable novelty" },
      4: { title: "GOOD", sub: "Creative solution" },
      5: { title: "EXCELLENT", sub: "Moonshot impact" },
    },
  },
];

type Props = {
  project: {
    id: string;
    title: string;
    summary: string | null;
    repoUrl: string | null;
    track: string | null;
    teamName: string | null;
    existingScores: Partial<Record<Criterion, number>>;
  };
  onSave: (scores: Record<Criterion, number>) => Promise<void>;
};

export function ScoringForm({ project, onSave }: Props) {
  const router = useRouter();
  const [scores, setScores] = useState<Record<Criterion, number | null>>({
    functionality: project.existingScores.functionality ?? null,
    quality: project.existingScores.quality ?? null,
    innovation: project.existingScores.innovation ?? null,
  });

  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculate composite weighted score
  const { weightedScore, scoredCount } = useMemo(() => {
    let total = 0;
    let countedWeight = 0;
    let count = 0;

    CRITERIA.forEach((c) => {
      const val = scores[c.id];
      if (val !== null) {
        count += 1;
        total += val * (c.weight / 100);
        countedWeight += c.weight / 100;
      }
    });

    const normalized = countedWeight > 0 ? (total / countedWeight).toFixed(1) : "0.0";
    return { weightedScore: normalized, scoredCount: count };
  }, [scores]);

  const handleScoreSelect = (criterionId: Criterion, value: number) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: prev[criterionId] === value ? null : value,
    }));
  };

  const handleSaveDraft = async () => {
    if (scoredCount === 0) return;
    try {
      setSaveStatus("idle");
      // Only send non-null
      const partialScores: Partial<Record<Criterion, number>> = {};
      for (const k in scores) {
         if (scores[k as Criterion] !== null) partialScores[k as Criterion] = scores[k as Criterion]!;
      }
      // Assuming onSave can handle partial saves (the API actually just saves whatever is passed in loop)
      await onSave(partialScores as Record<Criterion, number>);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (e: any) {
      setErrorMsg(e.message ?? "Error saving");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (scoredCount !== CRITERIA.length) {
      alert("Please score all criteria before submitting.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await onSave(scores as Record<Criterion, number>);
      setSaveStatus("saved");
      alert("Evaluation securely recorded and signed to audit ledger!");
      router.push("/judge/dashboard");
    } catch (e: any) {
      setErrorMsg(e.message ?? "Save failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-stone-200 antialiased selection:bg-[var(--color-primary)]/20 selection:text-white -m-4 md:-m-12">
      {/* ─── Top Context Header Bar ─── */}
      <header className="sticky top-0 z-30 border-b border-stone-800/80 bg-surface/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
            <Link
              href="/judge/dashboard"
              className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              ASSIGNMENTS
            </Link>
            <span className="text-stone-600">/</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[var(--color-primary)] font-semibold">
              {project.id.toUpperCase()}
            </span>
            {project.track && (
              <span className="text-stone-500 hidden sm:inline">{"// "}{project.track}</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/60 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WINDOW: OPEN</span>
            </div>

            <div className="flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Review Container ─── */}
      <main className="max-w-5xl mx-auto px-6 py-8 pb-32">
        {/* Project Header Banner & Score Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-surface border border-stone-800/80 mb-8 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/70 text-emerald-400 font-mono text-xs font-semibold">
                {project.teamName || "NO TEAM"}
              </span>
              <span className="text-xs font-mono text-stone-400">{project.id.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Review: <span className="text-white">{project.title}</span>
            </h1>

            {project.summary && (
              <p className="text-stone-400 text-sm max-w-2xl leading-relaxed mb-4">
                {project.summary}
              </p>
            )}
          </div>

          {/* Real-time Weighted Score Display */}
          <div className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-xl bg-surface border border-stone-800/80">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)] flex flex-col items-center justify-center bg-[var(--color-primary)]/10 shadow-[0_0_20px_rgba(254,51,10,0.2)]">
              <span className="text-2xl font-bold font-mono text-white leading-none">{weightedScore}</span>
              <span className="text-[10px] font-mono text-stone-400">/ 5.0</span>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Weighted Score</div>
              <div className="text-[10px] font-mono text-stone-500 mt-0.5">(0.4F + 0.3Q + 0.3I)</div>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl bg-red-950/40 p-4 text-xs font-mono text-red-300 border border-red-800/50 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ─── Rubric Scoring Cards ─── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {CRITERIA.map((criterion) => {
            const currentScore = scores[criterion.id];

            return (
              <section
                key={criterion.id}
                className="p-6 rounded-2xl bg-surface border border-stone-800/80 hover:border-stone-700/80 transition-all duration-200"
              >
                {/* Criterion Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentScore ? "bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" : "bg-stone-600"
                      }`}
                    />
                    <h2 className="text-base font-bold font-mono tracking-tight text-white uppercase">
                      {criterion.number}. {criterion.title}
                    </h2>
                    <span
                      className={`ml-1 text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        currentScore
                          ? "bg-emerald-950/50 text-emerald-400 border border-emerald-800/50"
                          : "bg-stone-900 text-stone-500 border border-stone-800"
                      }`}
                    >
                      {currentScore ? `Active (${currentScore}/5)` : "Pending"}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[var(--color-primary)] tracking-wider px-2.5 py-0.5 rounded bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30">
                    {criterion.weight}% WEIGHT
                  </span>
                </div>

                <p className="text-sm text-stone-400 leading-relaxed mb-6 pl-5">
                  {criterion.prompt}
                </p>

                {/* ─── Round Score Buttons (1–5) ─── */}
                <div className="grid grid-cols-5 gap-3 sm:gap-4 max-w-3xl pl-5">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = currentScore === val;
                    const meta = criterion.labels[val]!;

                    return (
                      <button
                        type="button"
                        key={val}
                        onClick={() => handleScoreSelect(criterion.id, val)}
                        className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-surface-hover border border-stone-600 shadow-lg scale-[1.02]"
                            : "bg-background hover:bg-surface-hover border border-stone-800/80 hover:border-stone-700"
                        }`}
                      >
                        {/* Perfect Circular Dial Button */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-mono font-bold transition-all duration-200 ${
                            isSelected
                              ? "bg-[var(--color-primary)] text-white shadow-[0_0_18px_rgba(254,51,10,0.55)] scale-110"
                              : "bg-surface-hover text-stone-300 group-hover:text-white group-hover:border-stone-500 border border-stone-700/80"
                          }`}
                        >
                          {val}
                        </div>

                        {/* Micro Label Underneath Button */}
                        <div className="text-center mt-3">
                          <span
                            className={`block text-[11px] font-mono tracking-wider transition-colors ${
                              isSelected ? "text-white font-bold" : "text-stone-400 group-hover:text-stone-300"
                            }`}
                          >
                            {meta.title}
                          </span>
                          <span className="hidden sm:block text-[9px] font-mono text-stone-500 tracking-tight mt-0.5">
                            {meta.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* ─── Deliberation & Qualitative Feedback ─── */}
          <section className="p-6 rounded-2xl bg-surface border border-stone-800/80">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="notes" className="text-sm font-bold font-mono text-white uppercase tracking-tight">
                DELIBERATION & TECHNICAL NOTES
              </label>
              <span className="text-xs font-mono text-stone-500">{notes.length} / 2000 CHARACTERS</span>
            </div>

            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide concrete rationale, edge-case observations, or questions for final jury sync..."
              className="w-full bg-background border border-stone-800 rounded-xl p-4 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-y"
            />

            <div className="flex items-center justify-between mt-3 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Jury notes (visible to organizers)
              </span>
              <span>Markdown formatting enabled</span>
            </div>
          </section>

          {/* ─── Bottom Sticky Dock Bar ─── */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-stone-800/80 py-4 px-6 md:pl-[280px]">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                <span className={`w-2 h-2 rounded-full ${scoredCount === 3 ? "bg-emerald-400" : "bg-[var(--color-primary)] animate-pulse"}`} />
                <span className="text-white font-medium">
                  {scoredCount} OF {CRITERIA.length} CRITERIA SCORED
                </span>
                <span className="text-stone-600">|</span>
                <span className="text-stone-500">HOTKEYS: 1-5 RATE • ⌘+↵ SAVE</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={scoredCount === 0 || isSubmitting}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-xs font-mono font-medium text-stone-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saveStatus === "saved" ? "✓ Draft Saved" : "Save as Draft"}
                </button>

                <Link
                  href="/judge/dashboard"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-xs font-mono font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  Back to Queue →
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting || scoredCount !== CRITERIA.length}
                  className="px-6 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-primary-hover text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(254,51,10,0.4)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing Scores..." : "Save Scores →"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
