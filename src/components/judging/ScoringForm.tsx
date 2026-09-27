"use client";

import { useState, useId, useEffect, useRef } from "react";
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
  /** Pre-populated notes, if any */
  existingNotes?: string;
  /**
   * Called when the judge submits scores.
   * TODO: replace body with real API call to POST /api/judge/scores once Krish wires it.
   * Must send one ScoreInput per criterion.
   */
  onSave?: (scores: Record<Criterion, number>, notes: string) => Promise<void>;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CRITERIA: {
  key: Criterion;
  label: string;
  description: string;
  weight: number; // percentage weight in rubric
}[] = [
  {
    key: "functionality",
    label: "Functionality",
    description: "Does it work as described? Are core features complete and stable?",
    weight: 40,
  },
  {
    key: "quality",
    label: "Code Quality",
    description: "Is the code readable, well-structured, tested, and maintainable?",
    weight: 30,
  },
  {
    key: "innovation",
    label: "Innovation",
    description: "Does it bring a novel approach, creative problem-solving, or unique value?",
    weight: 30,
  },
];

const SCORE_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Below avg",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

const SCORE_COLORS: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: "bg-[#ba1a1a]", border: "border-[#ba1a1a]", text: "text-white" },
  2: { bg: "bg-[#f59e0b]", border: "border-[#f59e0b]", text: "text-white" },
  3: { bg: "bg-[#64748b]", border: "border-[#64748b]", text: "text-white" },
  4: { bg: "bg-[#22c55e]", border: "border-[#22c55e]", text: "text-white" },
  5: { bg: "bg-[#fe330a]", border: "border-[#fe330a]", text: "text-white" },
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ─── Weighted score calculator ────────────────────────────────────────────────

function computeWeightedScore(scores: Record<Criterion, number | null>): number | null {
  const filled = CRITERIA.filter((c) => scores[c.key] !== null);
  if (filled.length === 0) return null;
  const totalWeight = filled.reduce((sum, c) => sum + c.weight, 0);
  const weighted = filled.reduce((sum, c) => sum + (scores[c.key] as number) * c.weight, 0);
  return Math.round((weighted / totalWeight) * 10) / 10;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ScoringForm — DESIGN-4-HYBRID §3
 * Client component. Judges score each criterion 1–5.
 * Shows saved ✅ / error ❌ states. Keyboard accessible.
 * Includes: notes textarea, weighted score preview, unsaved-changes guard.
 * TODO: wire onSave to POST /api/judge/scores (ScoreInput per criterion).
 */
export function ScoringForm({
  projectId,
  projectTitle,
  existingScores = {},
  existingNotes = "",
  onSave,
}: ScoringFormProps) {
  const formId = useId();

  // Initialise scores from existing or null
  const [scores, setScores] = useState<Record<Criterion, number | null>>({
    functionality: existingScores.functionality ?? null,
    quality: existingScores.quality ?? null,
    innovation: existingScores.innovation ?? null,
  });

  const [notes, setNotes] = useState(existingNotes);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasUnsaved, setHasUnsaved] = useState(false);

  const savedScoresRef = useRef({ ...scores });
  const savedNotesRef = useRef(notes);

  // Track unsaved changes
  useEffect(() => {
    const scoresChanged = CRITERIA.some(
      (c) => scores[c.key] !== savedScoresRef.current[c.key]
    );
    const notesChanged = notes !== savedNotesRef.current;
    setHasUnsaved(scoresChanged || notesChanged);
    if (status === "saved" && (scoresChanged || notesChanged)) setStatus("idle");
  }, [scores, notes, status]);

  const allScored = Object.values(scores).every((v) => v !== null);
  const weightedScore = computeWeightedScore(scores);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allScored) return;

    setStatus("saving");
    setErrorMessage("");

    try {
      if (onSave) {
        await onSave(scores as Record<Criterion, number>, notes);
      } else {
        // TODO: replace with real fetch to POST /api/judge/scores
        await new Promise((res) => setTimeout(res, 700));
        console.log("[MOCK SAVE]", { projectId, scores, notes });
      }
      setStatus("saved");
      setHasUnsaved(false);
      savedScoresRef.current = { ...scores };
      savedNotesRef.current = notes;
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to save scores. Please try again."
      );
    }
  }

  function handleScoreChange(criterion: Criterion, value: number) {
    setScores((prev) => ({ ...prev, [criterion]: value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={`Scoring form for ${projectTitle}`}
      className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden"
    >
      {/* Weighted score preview banner */}
      {weightedScore !== null && (
        <div className="bg-[#111318] px-6 py-3 flex items-center justify-between gap-4 border-b border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Weighted Preview Score
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tabular-nums">
              {weightedScore}
            </span>
            <span className="text-xs font-mono text-slate-500">/ 5.0</span>
            {/* Mini bar */}
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-[#fe330a] rounded-full transition-all duration-300"
                style={{ width: `${(weightedScore / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col gap-6">
        {/* Criteria */}
        {CRITERIA.map(({ key, label, description, weight }) => {
          const currentValue = scores[key];
          const groupId = `${formId}-${key}`;
          const colors = currentValue ? SCORE_COLORS[currentValue] : null;

          return (
            <fieldset key={key} className="flex flex-col gap-2">
              {/* Legend row with weight badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <legend className="text-sm font-bold uppercase tracking-tight text-[#111318]">
                  {label}
                </legend>
                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#f1f5f9] text-slate-500 border border-[#e2e8f0] px-1.5 py-0.5 rounded-sm">
                  {weight}% weight
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-1">{description}</p>

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
                  const c = SCORE_COLORS[score as keyof typeof SCORE_COLORS]!;

                  return (
                    <label
                      key={score}
                      htmlFor={inputId}
                      className={[
                        "flex flex-col items-center justify-center w-14 h-14 rounded-lg border-2 cursor-pointer",
                        "text-sm font-bold transition-all duration-150",
                        "focus-within:ring-2 focus-within:ring-[#fe330a] focus-within:ring-offset-1",
                        isSelected
                          ? `${c.bg} ${c.border} ${c.text}`
                          : "bg-white border-[#e2e8f0] text-[#111318] hover:border-[#fe330a] hover:scale-105",
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
                      <span aria-hidden="true" className="text-base leading-none">
                        {score}
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-wide mt-0.5 leading-none opacity-80">
                        {(SCORE_LABELS[score] ?? "").split(" ")[0]}
                      </span>
                    </label>
                  );
                })}

                {/* Current label */}
                {currentValue !== null && (
                  <span className="ml-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    — {SCORE_LABELS[currentValue]}
                  </span>
                )}
              </div>
            </fieldset>
          );
        })}

        {/* Notes textarea */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-notes`}
            className="text-sm font-bold uppercase tracking-tight text-[#111318]"
          >
            Notes{" "}
            <span className="text-xs font-normal text-slate-400 normal-case tracking-normal">
              (optional — private to you)
            </span>
          </label>
          <textarea
            id={`${formId}-notes`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add reasoning, observations, or flags for your own reference…"
            className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8f9fc] px-4 py-3 text-sm text-[#111318] placeholder:text-slate-400 resize-y focus:outline-none focus:ring-2 focus:ring-[#fe330a] focus:border-transparent transition-all"
            maxLength={2000}
          />
          <span className="text-[10px] font-mono text-slate-400 text-right tabular-nums">
            {notes.length} / 2000
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e2e8f0]" />

        {/* Submit row */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="submit"
            disabled={!allScored || status === "saving"}
            className={[
              "px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a]",
              allScored && status !== "saving"
                ? "bg-[#fe330a] text-white hover:bg-[#ff4d26] active:bg-[#e02d07] shadow-sm hover:shadow-md"
                : "bg-[#e2e8f0] text-slate-400 cursor-not-allowed",
            ].join(" ")}
            aria-busy={status === "saving"}
          >
            {status === "saving" ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Saving…
              </span>
            ) : (
              "Save Scores"
            )}
          </button>

          {/* Unsaved changes dot */}
          {hasUnsaved && status !== "saving" && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#f59e0b] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
              Unsaved changes
            </span>
          )}

          {/* Status feedback */}
          {status === "saved" && (
            <span
              role="status"
              aria-live="polite"
              className="flex items-center gap-1.5 text-sm font-mono text-[#22c55e] uppercase tracking-wider"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="#22c55e" />
                <path
                  d="M4.5 8l2.5 2.5L11.5 5.5"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="#ba1a1a" />
                <path
                  d="M5.5 5.5l5 5M10.5 5.5l-5 5"
                  stroke="#ba1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
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
      </div>
    </form>
  );
}
