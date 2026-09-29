"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Weights = { functionality: number; quality: number; innovation: number };

export default function OrganizerRubricPage() {
  const [weights, setWeights] = useState<Weights | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/organizer/rubric")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => body && setWeights(body.weights))
      .catch(() => {});
  }, []);

  const total = weights ? weights.functionality + weights.quality + weights.innovation : 0;
  const isInvalid = !weights || total !== 100;

  async function save() {
    if (!weights || isInvalid) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/organizer/rubric", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(weights),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-[var(--color-primary)]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div className="space-y-4">
            <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-[var(--color-primary)] transition-colors font-bold">
              &larr; DASHBOARD
            </Link>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              Scoring Rubric. <br />
              <span className="italic text-[var(--color-primary)] font-medium">Organizer Weights.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {saved && <span className="text-xs font-mono text-emerald-400">Saved</span>}
            <button
              onClick={save}
              disabled={isInvalid || saving}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              {saving ? "Saving…" : "Save Configuration"}
            </button>
          </div>
        </div>

        {isInvalid && weights && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-xs font-mono font-bold tracking-wider text-red-300">
            Weights must sum to exactly 100. Current sum: {total}.
          </div>
        )}

        {!weights ? (
          <div className="text-sm font-mono text-stone-500">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-surface border border-stone-800 shadow-xl space-y-8">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-5">
                  <h2 className="text-2xl font-syne font-bold text-white">Criteria Weights</h2>
                  <div className={`px-3 py-1.5 rounded-sm text-[11px] font-mono font-bold uppercase tracking-wider border ${isInvalid ? "bg-red-950/50 text-red-400 border-red-800/50" : "bg-stone-900/50 text-stone-300 border-stone-800"}`}>
                    SUM: {total}
                  </div>
                </div>

                {(
                  [
                    { key: "functionality", label: "Functionality", desc: "Core features and completion" },
                    { key: "quality", label: "Quality", desc: "Code hygiene, UX, and reliability" },
                    { key: "innovation", label: "Innovation", desc: "Originality and technical novelty" },
                  ] as const
                ).map((crit) => (
                  <div key={crit.key} className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold font-syne text-white tracking-wide">{crit.label}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mt-1">{crit.desc}</p>
                      </div>
                      <div className="relative w-20">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={weights[crit.key]}
                          onChange={(e) => setWeights({ ...weights, [crit.key]: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2.5 bg-background border border-stone-700 rounded-lg text-sm font-mono font-bold text-center text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={weights[crit.key]}
                      onChange={(e) => setWeights({ ...weights, [crit.key]: parseInt(e.target.value) || 0 })}
                      className="w-full accent-[var(--color-primary)] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-surface-hover to-surface border border-[var(--color-primary)]/20 shadow-xl space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  <h3 className="text-xl font-syne font-bold text-white">Normalization</h3>
                </div>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  These weights set each judge&apos;s per-project score before normalization. The
                  weighted mean is then compared against each judge&apos;s own median/MAD to correct
                  for judges who score harshly or generously.
                </p>
                <div className="space-y-4 pt-5 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest">
                    <span className="text-stone-500">ALGORITHM</span>
                    <span className="text-stone-200">MEDIAN / MAD Z-SCORE</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest">
                    <span className="text-stone-500">ZERO-VARIANCE</span>
                    <span className="text-[var(--color-primary)]">NEUTRAL (z=0)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
