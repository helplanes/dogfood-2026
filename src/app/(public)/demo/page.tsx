"use client";

import React, { useState } from "react";
import Link from "next/link";

const SCRIPT_STEPS = [
  {
    title: "1. The Public Gallery (0:00 - 1:00)",
    objective: "Showcase the output and performance.",
    script: "Welcome to the DOGFOOD 2026 Portal. We built this from scratch in 48 hours to solve the problem of decentralized hackathon evaluation. Notice the public gallery: every project's telemetry is instantly verifiable. We've implemented a custom Obsidian Kinetic design language that loads instantly.",
    action: "Scroll through the projects at /projects. Click into 'AetherMesh' to show the Project Detail page.",
  },
  {
    title: "2. The Judge Deliberation (1:00 - 2:30)",
    objective: "Demonstrate strict role-based access and double-blind scoring.",
    script: "A hackathon is only as good as its judging integrity. Our backend uses row-level security to isolate juror assignments. Let's log in as Juror #JR-9042. You'll see their assigned queue. They cannot view peer scores, preventing anchoring bias.",
    action: "Navigate to /judge/dashboard. Show the pending/completed queue. Open the scoring form for 'ZeroProof ID', hit a 5 across the board, and submit.",
  },
  {
    title: "3. The Organizer Command Center (2:30 - 4:00)",
    objective: "Reveal the orchestration and normalization engines.",
    script: "As an Organizer, ensuring fair results across 12 judges is tough. We built a Z-Score shrinkage algorithm to penalize zero-variance judges and normalize 'hard' vs 'easy' graders. Here on the dashboard, we have full telemetry. The final consensus rankings are calculated dynamically.",
    action: "Navigate to /organizer/dashboard. Show the progress bars. Click into 'Results & Rankings' to show the data table, explicitly pointing out the Variance Warning flag (!).",
  },
  {
    title: "4. The Audit Trail (4:00 - 5:00)",
    objective: "Prove immutability and technical depth.",
    script: "Finally, trust is verified cryptographically. Every action in this portal—from project submission to rubric weights editing—is recorded in an append-only hash chain. The data cannot be silently manipulated.",
    action: "Navigate to /organizer/audit. Highlight the terminal UI. Show how 'Prev Hash' links to 'Hash'. End on a high note by hitting 'Export CSV'.",
  }
];

export default function DemoScriptPage() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = SCRIPT_STEPS[activeStep]!;

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8 border-b border-stone-800/80">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-[#fe330a] shadow-[0_0_12px_#fe330a] animate-pulse" />
          <span className="font-serif italic text-2xl text-white tracking-tight">Demo Script</span>
        </div>
        <Link href="/projects" className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono border border-stone-700 transition-colors">
          Exit to Gallery
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-6">
            5-MINUTE PRESENTATION FLOW
          </div>
          {SCRIPT_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeStep === idx
                  ? "bg-[#11141c] border-[#fe330a]/50 shadow-lg shadow-[#fe330a]/10"
                  : "bg-transparent border-stone-800/50 hover:border-stone-700 text-stone-400"
              }`}
            >
              <div className={`font-serif text-lg ${activeStep === idx ? "text-white" : ""}`}>
                {step.title.split(" ")[1]} {step.title.split(" ")[2]}
              </div>
              <div className="text-[10px] font-mono mt-1 opacity-70">
                {step.title.split("(")[1]?.replace(")", "")}
              </div>
            </button>
          ))}
        </div>

        {/* Script Content Viewer */}
        <div className="md:col-span-8">
          <div className="p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fe330a]/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <span className="text-[11px] font-mono text-[#fe330a] uppercase tracking-widest">
                OBJECTIVE: {currentStep.objective}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                {currentStep.title.split(" (")[0]?.replace(/[0-9]. /, "")}
              </h2>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">TALKING POINTS (WHAT TO SAY)</div>
              <div className="p-5 rounded-xl bg-[#090b10] border border-stone-800/70 text-base text-stone-200 leading-relaxed font-sans italic border-l-4 border-l-[#fe330a]">
                &quot;{currentStep.script}&quot;
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">SCREEN ACTION (WHAT TO DO)</div>
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-sm font-mono text-emerald-400">
                &rarr; {currentStep.action}
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center relative z-10">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-4 py-2 text-xs font-mono text-stone-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                &larr; PREVIOUS
              </button>
              <button
                disabled={activeStep === SCRIPT_STEPS.length - 1}
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#fe330a] text-white text-xs font-mono font-bold uppercase transition-all shadow-lg hover:bg-[#ff4922] disabled:opacity-30 disabled:shadow-none"
              >
                NEXT BEAT &rarr;
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
