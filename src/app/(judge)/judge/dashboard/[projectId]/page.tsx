"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Temporary mock type. Should come from contracts later.
interface AssignedProject {
  id: string;
  title: string;
  track: string;
  teamName: string;
  existingScores: Record<string, number>;
}

const mockProject: AssignedProject = {
  id: "prj_01",
  title: "Glass Signal",
  track: "Hardware",
  teamName: "Team Alpha",
  existingScores: { functionality: 4 },
};

const criteriaList = [
  { key: "novelty", label: "Technical Novelty & Architecture", description: "Algorithmic depth, latency, and memory profiling." },
  { key: "utility", label: "Open-Source Utility & DX", description: "Clarity of documentation, reproducibility, and ergonomics." },
  { key: "verification", label: "Cryptographic Verification & Stability", description: "Proof integrity and deterministic builds." }
];

export default function JudgeScoringForm({ params }: { params: Promise<{ projectId: string }> }) {
  const router = useRouter();
  const { projectId } = use(params);
  
  const [scores, setScores] = useState<Record<string, number>>(mockProject.existingScores || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const handleScoreChange = (criterion: string, value: number) => {
    setScores(prev => ({ ...prev, [criterion]: value }));
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validation: require all 3 scores
    if (Object.keys(scores).length < criteriaList.length) {
      setStatus("error");
      setIsSubmitting(false);
      return;
    }

    setStatus("saved");
    setIsSubmitting(false);
    
    // Redirect back to assignments after success
    setTimeout(() => {
      router.push("/judge/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto space-y-10 w-full">
        
        {/* Navigation */}
        <div>
          <Link href="/judge/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors flex items-center gap-2 font-bold tracking-widest uppercase">
            &larr; BACK TO ASSIGNMENTS
          </Link>
        </div>

        <header className="space-y-4 pb-6 border-b border-stone-800/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-surface border border-stone-700/60 text-stone-300">
              {mockProject.track}
            </span>
            <span className="text-xs font-mono text-stone-400">ID: {projectId || mockProject.id}</span>
          </div>
          <h1 className="text-4xl font-syne font-bold text-white tracking-tight">
            Review: {mockProject.title}
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {criteriaList.map((crit) => (
              <fieldset key={crit.key} className="p-6 rounded-2xl bg-surface border border-stone-800 space-y-4 shadow-xl">
                <legend className="sr-only">{crit.label}</legend>
                <div>
                  <h3 className="text-xl font-syne font-bold text-white">{crit.label}</h3>
                  <p className="text-xs text-stone-400 mt-1">{crit.description}</p>
                </div>
                
                {/* Keyboard accessible radio buttons */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val} className={`flex-1 relative flex items-center justify-center py-3 rounded-xl cursor-pointer border transition-all ${scores[crit.key] === val ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_rgba(254,51,10,0.2)]" : "bg-background border-stone-700 hover:border-stone-500 text-stone-300"}`}>
                      <input 
                        type="radio" 
                        name={crit.key} 
                        value={val}
                        checked={scores[crit.key] === val}
                        onChange={() => handleScoreChange(crit.key, val)}
                        className="sr-only" 
                        aria-label={`Score ${val} for ${crit.label}`}
                      />
                      <span className="font-mono font-bold">{val}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          {/* Form Actions & Status Log */}
          <div className="p-6 rounded-2xl bg-surface border border-stone-800 flex items-center justify-between shadow-xl">
            <div>
              {status === "error" && (
                <p className="text-sm font-mono text-red-400 flex items-center gap-2" role="alert">
                  <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  ERROR: Incomplete rubric.
                </p>
              )}
              {status === "saved" && (
                <p className="text-sm font-mono text-emerald-400 flex items-center gap-2" role="status">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  SUCCESS: Cryptographic attestation recorded.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || status === "saved"}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Submitting..." : status === "saved" ? "Verified" : "Sign & Submit"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
