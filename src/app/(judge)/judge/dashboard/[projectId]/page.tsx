"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Criterion = "functionality" | "quality" | "innovation";

interface CriteriaConfig {
  key: Criterion;
  label: string;
  sublabel: string;
  weight: string;
  lowLabel: string;
  highLabel: string;
}

const CRITERIA: CriteriaConfig[] = [
  {
    key: "functionality",
    label: "1. Functionality",
    sublabel: "(Does it work? Features & scope)",
    weight: "WEIGHT 40%",
    lowLabel: "Non-functional",
    highLabel: "Flawless execution",
  },
  {
    key: "quality",
    label: "2. Quality",
    sublabel: "(Code cleanliness, UI/UX, reliability)",
    weight: "WEIGHT 30%",
    lowLabel: "Unmaintainable",
    highLabel: "Production grade",
  },
  {
    key: "innovation",
    label: "3. Innovation",
    sublabel: "(Originality, creative problem solving)",
    weight: "WEIGHT 30%",
    lowLabel: "Derivative",
    highLabel: "Groundbreaking",
  },
];

const mockProjectData = {
  id: "prj_01",
  title: "Awesome Hack",
  track: "Web",
  teamName: "Team Alpha",
  submissionTime: "18:42 HALIFAX",
  hash: "#3b9e4a1",
  summary:
    "A really cool project that solves a major problem using cutting-edge technology. It features a complete mobile app and a robust backend. The team worked hard to deliver this within the 48-hour window.",
  repoUrl: "https://github.com/example/awesome",
  latency: "14ms p99",
  testCoverage: "94.8% Pass",
  existingScores: {
    functionality: 5,
    quality: 4,
    innovation: 5,
  },
};

export default function ProjectScoringPage() {
  const params = useParams();
  const router = useRouter();

  const [scores, setScores] = useState<Record<Criterion, number | null>>({
    functionality: mockProjectData.existingScores.functionality || null,
    quality: mockProjectData.existingScores.quality || null,
    innovation: mockProjectData.existingScores.innovation || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleScoreSelect = (criterion: Criterion, val: number) => {
    setScores((prev) => ({ ...prev, [criterion]: val }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!scores.functionality || !scores.quality || !scores.innovation) {
      setError("Please provide a rating (1-5) for all three criteria before submission.");
      return;
    }

    setIsSubmitting(true);
    try {
      // API call simulation (e.g. POST /api/judge/scores)
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSuccess(true);
      setTimeout(() => {
        router.push("/judge/dashboard");
      }, 1200);
    } catch (err) {
      setError("Failed to record score attestation. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back navigation link */}
        <div>
          <Link
            href="/judge/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-[#fe330a] transition-colors"
          >
            &larr; BACK TO ASSIGNMENTS DASHBOARD
          </Link>
        </div>

        {/* Top Deliberation Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-xl bg-[#11141c] border border-stone-800/80 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-300 font-medium">DELIBERATION WINDOW // ACTIVE EVALUATION</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>PROJECT ID: <strong className="text-stone-200">{mockProjectData.id.toUpperCase()}</strong></span>
            <span className="text-stone-600"></span>
            <span className="text-emerald-400 font-semibold">SANDBOX VERIFIED</span>
          </div>
        </div>

        {/* Two-Column Grid: Details (Left) + Rubric Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section 1: Project Details (col-span-6 or 7) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30">
                  TRACK: {mockProjectData.track}
                </span>
                <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                  TEAM: {mockProjectData.teamName}
                </span>
                <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  DOUBLE-BLIND MODE
                </span>
              </div>

              {/* Title & Submission Meta */}
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
                  {mockProjectData.title}
                </h1>
                <p className="text-xs font-mono text-stone-500">
                  SUBMITTED {mockProjectData.submissionTime}  HASH: {mockProjectData.hash}
                </p>
              </div>

              {/* Summary Description */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  PROJECT SUMMARY & ARCHITECTURE
                </span>
                <div className="p-5 rounded-xl bg-[#090b10] border border-stone-800/70 text-sm text-stone-300 leading-relaxed font-sans">
                  {mockProjectData.summary}
                </div>
              </div>

              {/* Telemetry Benchmarks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0e1117] border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    LATENCY BENCHMARK
                  </span>
                  <span className="text-lg font-mono font-bold text-stone-100">{mockProjectData.latency}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0e1117] border border-stone-800">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    UNIT TEST COVERAGE
                  </span>
                  <span className="text-lg font-mono font-bold text-emerald-400">{mockProjectData.testCoverage}</span>
                </div>
              </div>

              {/* Repo Link */}
              <Link
                href={mockProjectData.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#0f1219] hover:bg-[#151922] border border-stone-800 hover:border-stone-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">View Code Repository</span>
                    <span className="text-xs font-mono text-stone-500">github.com/example/awesome</span>
                  </div>
                </div>
                <span className="text-[#fe330a] text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&nearr;</span>
              </Link>

            </div>
          </div>

          {/* Section 2: Official Rubric Form (col-span-6, sticky on desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-2xl space-y-6">
              
              {/* Rubric Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80">
                <div>
                  <h2 className="text-2xl font-serif text-white">Official Rubric</h2>
                  <p className="text-xs font-mono text-stone-400 mt-1">SCOREINPUT CONTRACT  1 TO 5 SCALE</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-400">
                  Weight: 40/30/30
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {CRITERIA.map((criterion) => (
                  <fieldset key={criterion.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <legend className="text-sm font-semibold text-stone-200">
                        {criterion.label}{" "}
                        <span className="text-xs font-normal text-stone-400">{criterion.sublabel}</span>
                      </legend>
                      <span className="text-[11px] font-mono text-[#fe330a]">{criterion.weight}</span>
                    </div>

                    {/* 1-5 Segmented Controller */}
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected = scores[criterion.key] === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleScoreSelect(criterion.key, val)}
                            className={`py-3 rounded-xl font-mono text-sm font-bold transition-all ${
                              isSelected
                                ? "bg-[#fe330a] text-white shadow-lg shadow-[#fe330a]/30 scale-[1.02]"
                                : "bg-[#181c26] text-stone-400 hover:text-white hover:bg-[#202534] border border-stone-800/80"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-stone-500 pt-0.5">
                      <span>{criterion.lowLabel}</span>
                      <span>{criterion.highLabel}</span>
                    </div>
                  </fieldset>
                ))}

                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-xs font-mono text-red-300">
                     {error}
                  </div>
                )}

                {/* Success Banner */}
                {success && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-600/50 text-xs font-mono text-emerald-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Scores verified & saved to draft registry. Audit hash: 0x94fc...e321 attested
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#fe330a] hover:bg-[#ff461e] disabled:opacity-50 text-white font-mono uppercase tracking-wider text-xs font-bold transition-all shadow-xl shadow-[#fe330a]/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Attesting & Submitting...
                    </>
                  ) : success ? (
                    "Attestation Complete "
                  ) : (
                    "SUBMIT SCORES &rarr;"
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
