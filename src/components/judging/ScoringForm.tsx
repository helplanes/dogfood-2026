"use client";

import { useState, useId } from "react";
import type { Criterion } from "@/contracts";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CriterionScore {
  criterion: Criterion;
  value: number | null; // null = not yet scored
}

interface ScoringFormProps {
  projectId: string;
  projectTitle: string;
  /** Pre-populated existing scores, if any */
  existingScores?: Partial<Record<Criterion, number>>;
  /**
   * Called when the judge submits scores.
   * TODO: replace body with real API call to POST /api/judge/scores once Krish wires it.
   * Must send one ScoreInput per criterion.
   */
  onSave?: (scores: Record<Criterion, number>) => Promise<void>;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CRITERIA: { key: Criterion; label: string; description: string }[] = [
  {
    key: "functionality",
    label: "Functionality",
    description: "Does it work as described? Are core features complete?",
  },
  {
    key: "quality",
    label: "Code Quality",
    description: "Is the code readable, structured, and well-tested?",
  },
  {
    key: "innovation",
    label: "Innovation",
    description: "Does it bring a novel approach or creative solution?",
  },
];

const SCORE_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Below average",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ScoringForm — DESIGN-4-HYBRID §3
 * Client component. Judges score each criterion 1–5.
 * Shows saved ✅ / error ❌ states. Keyboard accessible.
 * TODO: wire onSave to POST /api/judge/scores (ScoreInput per criterion).
 */
export function ScoringForm({
  projectId,
  projectTitle,
  existingScores = {},
  onSave,
}: ScoringFormProps) {
  const formId = useId();

  // Initialise scores from existing or null
  const [scores, setScores] = useState<Record<Criterion, number | null>>({
    functionality: existingScores.functionality ?? null,
    quality: existingScores.quality ?? null,
    innovation: existingScores.innovation ?? null,
  });

  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const allScored = Object.values(scores).every((v) => v !== null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allScored) return;

    setStatus("saving");
    setErrorMessage("");

    try {
      if (onSave) {
        // Real API call when wired by Krish
        await onSave(scores as Record<Criterion, number>);
      } else {
        // TODO: replace with real fetch to POST /api/judge/scores
        // Simulated save for demo — remove once API is wired
        await new Promise((res) => setTimeout(res, 600));
        console.log("[MOCK SAVE]", { projectId, scores });
      }
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to save scores. Please try again."
      );
    }
  }

  function handleScoreChange(criterion: Criterion, value: number) {
    setScores((prev) => ({ ...prev, [criterion]: value }));
    // Reset saved state when editing
    if (status === "saved") setStatus("idle");
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={`Scoring form for ${projectTitle}`}
      className="bg-white border border-[#e2e8f0] rounded-lg p-6 flex flex-col gap-6"
    >
      {/* Criteria */}
      {CRITERIA.map(({ key, label, description }) => {
        const currentValue = scores[key];
        const groupId = `${formId}-${key}`;

        return (
          <fieldset key={key} className="flex flex-col gap-2">
            <legend className="text-sm font-bold uppercase tracking-tight text-[#111318]">
              {label}
            </legend>
            <p className="text-xs text-slate-500 leading-relaxed mb-2">{description}</p>

            {/* Score radio buttons 1–5 */}
            <div
              className="flex items-center gap-2 flex-wrap"
              role="group"
              aria-labelledby={groupId}
            >
              <span id={groupId} className="sr-only">
                {label} score
              </span>
              {[1, 2, 3, 4, 5].map((score) => {
                const inputId = `${groupId}-${score}`;
                const isSelected = currentValue === score;

                return (
                  <label
                    key={score}
                    htmlFor={inputId}
                    className={[
                      "flex flex-col items-center justify-center w-14 h-14 rounded-lg border-2 cursor-pointer",
                      "text-sm font-bold transition-colors duration-150",
                      "focus-within:ring-2 focus-within:ring-[#fe330a]",
                      isSelected
                        ? "bg-[#fe330a] border-[#fe330a] text-white"
                        : "bg-white border-[#e2e8f0] text-[#111318] hover:border-[#fe330a]",
                    ].join(" ")}
                    title={SCORE_LABELS[score]}
                  >
                    <input
                      type="radio"
                      id={inputId}
                      name={`${formId}-${key}`}
                      value={score}
                      checked={isSelected}
                      onChange={() => handleScoreChange(key, score)}
                      className="sr-only"
                    />
                    <span aria-hidden="true">{score}</span>
                    <span className="text-[9px] font-mono uppercase tracking-wide mt-0.5 leading-none opacity-70">
                      {score === 1 ? "Poor" : score === 5 ? "Best" : ""}
                    </span>
                  </label>
                );
              })}

              {/* Current label */}
              {currentValue !== null && (
                <span className="ml-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
                  {SCORE_LABELS[currentValue]}
                </span>
              )}
            </div>
          </fieldset>
        );
      })}

      {/* Divider */}
      <div className="border-t border-[#e2e8f0]" />

      {/* Submit row */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={!allScored || status === "saving"}
          className={[
            "px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a]",
            allScored && status !== "saving"
              ? "bg-[#fe330a] text-white hover:bg-[#ff4d26] active:bg-[#e02d07]"
              : "bg-[#e2e8f0] text-slate-400 cursor-not-allowed",
          ].join(" ")}
          aria-busy={status === "saving"}
        >
          {status === "saving" ? "Saving…" : "Save Scores"}
        </button>

        {/* Status feedback */}
        {status === "saved" && (
          <span
            role="status"
            aria-live="polite"
            className="flex items-center gap-1.5 text-sm font-mono text-[#22c55e] uppercase tracking-wider"
          >
            {/* Inline SVG checkmark — no external icons per DESIGN-4-HYBRID §6 */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7.5" stroke="#22c55e" />
              <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Scores saved
          </span>
        )}

        {status === "error" && (
          <span
            role="alert"
            aria-live="assertive"
            className="flex items-center gap-1.5 text-sm font-mono text-[#ba1a1a] uppercase tracking-wider"
          >
            {/* Inline SVG x-circle — no external icons */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7.5" stroke="#ba1a1a" />
              <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#ba1a1a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {errorMessage || "Save failed"}
          </span>
        )}

        {/* Incomplete warning */}
        {!allScored && status === "idle" && (
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Score all 3 criteria to save
          </span>
        )}
      </div>
    </form>
  );
}
