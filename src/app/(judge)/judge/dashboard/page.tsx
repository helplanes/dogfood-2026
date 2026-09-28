"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Criterion } from "@/contracts";

interface AssignedProject {
  id: string;
  title: string;
  summary: string;
  repoUrl: string;
  track: string;
  teamName: string;
  existingScores: Partial<Record<Criterion, number>>;
}

const mockAssignedProjects: AssignedProject[] = [
  {
    id: "prj_01",
    title: "Glass Signal",
    summary: "An innovative approach to transparent signaling.",
    repoUrl: "https://github.com/example/glass-signal",
    track: "Hardware",
    teamName: "Team Alpha",
    existingScores: { functionality: 4, quality: 5 },
  },
  {
    id: "prj_02",
    title: "Small Meadow",
    summary: "A generative ecosystem simulator.",
    repoUrl: "https://github.com/example/small-meadow",
    track: "GenAI",
    teamName: "Team Beta",
    existingScores: {},
  },
  {
    id: "prj_03",
    title: "Deep Compass",
    summary: "Advanced navigation for autonomous agents.",
    repoUrl: "https://github.com/example/deep-compass",
    track: "Agents",
    teamName: "Team Gamma",
    existingScores: {},
  }
];

export default function JudgeDashboardPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredProjects = mockAssignedProjects.filter((p) => {
    if (filter === "pending") return !(Object.keys(p.existingScores).length === 3);
    if (filter === "completed") return (Object.keys(p.existingScores).length === 3);
    return true;
  });

  const scoredCount = mockAssignedProjects.filter((p) => (Object.keys(p.existingScores).length === 3)).length;
  const pendingCount = mockAssignedProjects.length - scoredCount;

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 selection:text-white px-4 py-8 md:px-12 md:py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Deliberation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-xl bg-surface/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#fe330a]" />
            <span className="text-stone-300 font-semibold">JUROR PORTAL</span>
            <span className="text-stone-600">{"//"}</span>
            <span>ASSIGNED ROUND</span>
            <span className="text-stone-600">{"//"}</span>
            <span>DOUBLE-BLIND PROTOCOL V2.4</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AUDIT WINDOW: 04H 28M REMAINING
            </div>
            <span className="text-stone-400">JUROR ID: <strong className="text-stone-200">#JR-9042</strong></span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-stone-800/50">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary">
              01  REVIEW QUEUE  {mockAssignedProjects.length} ASSIGNED BENCHMARKS
            </div>
            <h1 className="text-4xl md:text-5xl font-syne font-normal tracking-tight text-white leading-tight">
              Your Assignments.{" "}
              <span className="italic text-primary font-normal">Deliberate & Score.</span>
            </h1>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed">
              Please review and score your assigned hackathon projects before the consensus deadline. Verified deliverables, test reproducible sandboxes, and submit rubric attestations.
            </p>
          </div>

          {/* Quick Counter Card */}
          <div className="flex items-center gap-6 p-4 md:px-8 md:py-5 rounded-2xl bg-surface-hover border border-stone-800 shadow-xl shrink-0">
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">ASSIGNED</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">{mockAssignedProjects.length}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">SCORED</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">{scoredCount}</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div className="text-center">
              <span className="block text-[11px] font-mono text-stone-500 uppercase tracking-wider">PENDING</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-amber-400">{pendingCount}</span>
            </div>
          </div>
        </div>

        {/* Filters & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#121620] border border-stone-800/80 text-xs font-mono">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "all"
                  ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              ALL ASSIGNMENTS ({mockAssignedProjects.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "pending"
                  ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              PENDING ({pendingCount})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === "completed"
                  ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              COMPLETED ({scoredCount})
            </button>
          </div>

          <div className="text-xs font-mono text-stone-400">
            ESCROW STATUS: <span className="text-stone-200">ACTIVE QUORUM 98.4%</span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-surface border transition-all duration-200 ${
                (Object.keys(project.existingScores).length === 3)
                  ? "border-stone-800/80 hover:border-stone-700 hover:shadow-lg"
                  : "border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
              }`}
            >
              <div className="space-y-4">
                {/* Header: ID + Status Pill */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase">
                    ID: {project.id}  {(Object.keys(project.existingScores).length === 3) ? "VERIFIED" : "AWAITING RUBRIC"}
                  </span>
                  {(Object.keys(project.existingScores).length === 3) ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Scored
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-950/40 text-amber-300 border border-amber-600/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Pending Review
                    </span>
                  )}
                </div>

                {/* Project Title & Summary */}
                <div className="space-y-2">
                  <h2 className="text-xl font-syne text-white group-hover:text-stone-100 transition-colors line-clamp-1">
                    {project.title}
                  </h2>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Meta details list */}
                <div className="pt-3 border-t border-stone-800/60 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-stone-400">
                    <span>TRACK:</span>
                    <span className="px-2 py-0.5 rounded bg-stone-800/60 text-stone-300 border border-stone-700/50">
                      {project.track}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-stone-400">
                    <span>TEAM:</span>
                    <span className="text-stone-200 font-medium">{project.teamName}</span>
                  </div>
                  {/* (Mock properties removed per contract request) */}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Link
                  href={`/judge/dashboard/${project.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    (Object.keys(project.existingScores).length === 3)
                      ? "bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/80"
                      : "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  }`}
                >
                  {(Object.keys(project.existingScores).length === 3) ? (
                    <>
                      Edit Scores
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Review Project &rarr;
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Policy Card */}
        <div className="p-4 md:p-6 rounded-2xl bg-[#10131a] border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-primary"></span>
            <div>
              <span className="text-stone-200 font-semibold block">Official Consensus Scoring Policy</span>
              <span className="text-stone-500">Double-blind protocol requires all ratings strictly between 1 and 5. Identity tokens obfuscated.</span>
            </div>
          </div>
          <div className="text-stone-500 shrink-0">SYNCHRONIZED: 18:42 HALIFAX</div>
        </div>

      </div>
    </div>
  );
}
