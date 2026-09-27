"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Organizer Rubric Editor — /organizer/rubric
 * View + edit judging criteria names and weights (must sum to 100).
 * Client component for live weight validation.
 * TODO: wire save to PATCH /api/organizer/rubric once Krish builds it.
 * Scoring values are integer 1-5 per SPEC-NOTES.md.
 */

interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  color: string;
}

const INITIAL_CRITERIA: Criterion[] = [
  {
    id: "functionality",
    name: "Functionality",
    description: "Does it work as described? Are core features complete and stable?",
    weight: 40,
    color: "#fe330a",
  },
  {
    id: "quality",
    name: "Code Quality",
    description: "Is the code readable, well-structured, tested, and maintainable?",
    weight: 30,
    color: "#00f0ff",
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Does it bring a novel approach, creative problem-solving, or unique value?",
    weight: 30,
    color: "#a855f7",
  },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function OrganizerRubricPage() {
  const [criteria, setCriteria] = useState<Criterion[]>(INITIAL_CRITERIA);
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
  const weightValid = totalWeight === 100;

  function handleWeightChange(id: string, val: string) {
    const n = parseInt(val, 10);
    if (isNaN(n) || n < 0 || n > 100) return;
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, weight: n } : c));
    setStatus("idle");
  }

  function handleNameChange(id: string, val: string) {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, name: val } : c));
    setStatus("idle");
  }

  function handleDescChange(id: string, val: string) {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, description: val } : c));
    setStatus("idle");
  }

  async function handleSave() {
    if (!weightValid) return;
    setStatus("saving");
    try {
      // TODO: replace with real PATCH /api/organizer/rubric
      await new Promise(res => setTimeout(res, 700));
      console.log("[MOCK SAVE RUBRIC]", criteria);
      setStatus("saved");
      setEditing(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Hero */}
      <div className="border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[#a855f7] font-mono text-xs uppercase tracking-widest mb-2">Sample Hack 2026</p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Rubric Editor
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
              Criteria weights must sum to exactly 100
            </p>
          </div>
          {/* Weight sum indicator */}
          <div className={[
            "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold font-mono tabular-nums shrink-0",
            weightValid
              ? "bg-[#22c55e]/10 border-[#22c55e]/40 text-[#22c55e]"
              : "bg-[#ba1a1a]/10 border-[#ba1a1a]/40 text-[#ba1a1a]",
          ].join(" ")} role="status" aria-live="polite">
            <span className="text-xl">{totalWeight}</span>
            <span className="text-xs opacity-70">/ 100</span>
            {weightValid ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="#22c55e" /><path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="#ba1a1a" /><path d="M8 5v3.5M8 10.5v.5" stroke="#ba1a1a" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

        {/* Demo notice */}
        <div className="flex items-start gap-3 bg-[#191c20] border border-[#00f0ff]/20 rounded-lg px-4 py-3">
          <span className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest shrink-0 mt-0.5">DEMO</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Edits are saved in-memory only. Wire to{" "}
            <code className="text-white font-mono">PATCH /api/organizer/rubric</code> when Krish&apos;s backend is ready. Scores are integer 1–5 per criterion.
          </p>
        </div>

        {/* Visual weight bar */}
        <div className="bg-[#191c20] border border-white/[0.08] rounded-xl p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Weight Distribution</p>
          <div className="flex rounded-full overflow-hidden h-5">
            {criteria.map(c => (
              <div key={c.id}
                className="h-full flex items-center justify-center transition-all duration-300"
                style={{ width: `${c.weight}%`, backgroundColor: c.color, minWidth: c.weight > 0 ? "1px" : 0 }}>
                {c.weight >= 10 && (
                  <span className="text-[9px] font-black text-white tracking-wider">{c.weight}%</span>
                )}
              </div>
            ))}
            {/* Remaining if > 100 */}
            {totalWeight < 100 && (
              <div className="h-full flex-1 bg-[#ba1a1a]/30" style={{ width: `${100 - totalWeight}%` }}>
                <span className="text-[9px] font-mono text-[#ba1a1a] leading-5 px-1">
                  -{100 - totalWeight}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {criteria.map(c => (
              <div key={c.id} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{c.name} — {c.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Criteria cards */}
        <div className="flex flex-col gap-4">
          {criteria.map(c => {
            const isEditing = editing === c.id;
            return (
              <div key={c.id}
                className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
                {/* Colour header bar */}
                <div className="h-1.5" style={{ backgroundColor: c.color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={c.name}
                        onChange={e => handleNameChange(c.id, e.target.value)}
                        className="text-base font-black uppercase tracking-tight text-[#111318] bg-transparent border-b-2 border-[#fe330a] outline-none flex-1 pb-0.5"
                        style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
                        aria-label="Criterion name"
                      />
                    ) : (
                      <h3 className="text-base font-black uppercase tracking-tight text-[#111318]"
                          style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
                        {c.name}
                      </h3>
                    )}
                    <button
                      onClick={() => setEditing(isEditing ? null : c.id)}
                      className="text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-[#fe330a] transition-colors shrink-0 px-2 py-1 rounded border border-[#e2e8f0] hover:border-[#fe330a]">
                      {isEditing ? "Done" : "Edit"}
                    </button>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={c.description}
                      onChange={e => handleDescChange(c.id, e.target.value)}
                      rows={2}
                      className="w-full text-sm text-slate-600 leading-relaxed bg-[#f8f9fc] border border-[#e2e8f0] rounded-lg px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-[#fe330a] transition-all mb-4"
                    />
                  ) : (
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.description}</p>
                  )}

                  {/* Weight row */}
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 shrink-0">
                      Weight %
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Decrement */}
                      <button
                        onClick={() => handleWeightChange(c.id, String(Math.max(0, c.weight - 5)))}
                        className="w-7 h-7 rounded border border-[#e2e8f0] text-slate-500 hover:border-[#fe330a] hover:text-[#fe330a] font-bold text-sm transition-colors flex items-center justify-center"
                        aria-label={`Decrease ${c.name} weight`}>
                        −
                      </button>
                      <input
                        type="number"
                        min={0} max={100}
                        value={c.weight}
                        onChange={e => handleWeightChange(c.id, e.target.value)}
                        className="w-16 text-center font-black text-[#111318] text-lg bg-transparent border-b-2 outline-none tabular-nums focus:border-[#fe330a] transition-colors"
                        style={{ borderBottomColor: c.color }}
                        aria-label={`${c.name} weight percentage`}
                      />
                      {/* Increment */}
                      <button
                        onClick={() => handleWeightChange(c.id, String(Math.min(100, c.weight + 5)))}
                        className="w-7 h-7 rounded border border-[#e2e8f0] text-slate-500 hover:border-[#fe330a] hover:text-[#fe330a] font-bold text-sm transition-colors flex items-center justify-center"
                        aria-label={`Increase ${c.name} weight`}>
                        +
                      </button>
                    </div>
                    {/* Weight bar mini */}
                    <div className="flex-1 bg-[#f1f5f9] rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${c.weight}%`, backgroundColor: c.color }} />
                    </div>
                  </div>

                  {/* Scale reminder */}
                  <p className="text-[10px] font-mono text-slate-400 mt-3 uppercase tracking-wider">
                    Score scale: 1 (Poor) → 5 (Excellent) · integer only
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save bar */}
        <div className={[
          "sticky bottom-4 flex items-center justify-between gap-4 px-5 py-4 rounded-xl border backdrop-blur-sm",
          "bg-[#111318]/90 border-white/[0.08] shadow-xl",
        ].join(" ")}>
          <div>
            {!weightValid && (
              <p className="text-xs font-mono text-[#ba1a1a]">
                Weights sum to {totalWeight} — must equal 100 before saving
              </p>
            )}
            {weightValid && (
              <p className="text-xs font-mono text-[#22c55e]">Weights sum to 100 ✓</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {status === "saved" && (
              <span className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">Saved ✓</span>
            )}
            {status === "error" && (
              <span className="text-xs font-mono text-[#ba1a1a] uppercase tracking-wider">Save failed</span>
            )}
            <button
              onClick={handleSave}
              disabled={!weightValid || status === "saving"}
              className={[
                "px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all",
                weightValid && status !== "saving"
                  ? "bg-[#a855f7] text-white hover:bg-[#9333ea]"
                  : "bg-[#282a2f] text-slate-500 cursor-not-allowed",
              ].join(" ")}
              aria-busy={status === "saving"}>
              {status === "saving" ? "Saving…" : "Save Rubric"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-6">
          <Link href="/organizer/dashboard" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">← Dashboard</Link>
          <Link href="/organizer/results"   className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">Results →</Link>
        </div>
      </main>
    </div>
  );
}
