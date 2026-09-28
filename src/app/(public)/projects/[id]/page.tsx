import React from "react";
import Link from "next/link";
import { PublicProject } from "@/contracts";

// Mock Data for the Detail Page using contract shape + some extended presentation properties
const MOCK_PROJECTS: PublicProject[] = [
  {
    id: "prj_01",
    title: "Glass Signal",
    summary: "An innovative approach to transparent signaling that revolutionizes hardware diagnostics. Fault-tolerant and blazingly fast.",
    repoUrl: "https://github.com/example/glass-signal",
    track: "Hardware",
    teamName: "Team Alpha",
  },
  {
    id: "prj_02",
    title: "Small Meadow",
    summary: "A generative ecosystem simulator for studying dynamic biological interactions. Uses real-time state synchronization.",
    repoUrl: "https://github.com/example/small-meadow",
    track: "GenAI",
    teamName: "Team Beta",
  },
  {
    id: "prj_03",
    title: "Deep Compass",
    summary: "Advanced navigation for autonomous agents using decentralized coordination. Sub-millisecond latency tracking.",
    repoUrl: "https://github.com/example/deep-compass",
    track: "Agents",
    teamName: "Team Gamma",
  }
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  // Find project or fallback to first one if not found (for mock purposes)
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0]!;

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white flex flex-col font-sans">
      
      {/* Navigation Header */}
      <div className="bg-[#0c0e13]/50 border-b border-stone-800/50 px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-[#fe330a] transition-colors">
          &larr; BACK TO GALLERY
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-stone-500 border border-stone-800 px-2.5 py-1 rounded-md bg-[#11141c]">
            VERIFICATION ID: <span className="text-stone-300">#{project.id}</span>
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-10 space-y-12">

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30">
              {project.track}
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-stone-800 text-stone-300 border border-stone-700">
              {project.teamName}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.05]">
            {project.title}. <br/>
            <span className="italic font-serif text-[#fe330a]">Open Source Verified</span>
          </h1>
        </div>

        {/* Hero Image Replacement (Gradient Block) */}
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl overflow-hidden border border-stone-800 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e13] via-transparent to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-8 space-y-10">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                <span className="text-[#fe330a] font-mono text-sm">01</span>
                Architecture Overview
              </h2>
              <div className="p-6 rounded-2xl bg-[#11141c] border border-stone-800/80 text-sm text-stone-300 leading-relaxed font-sans">
                {project.summary}
                <br/><br/>
                Built entirely during the 48-hour sprint, the team utilized parallel processing to ensure thread safety without compromising on the rapid throughput required for live order matching.
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                <span className="text-[#fe330a] font-mono text-sm">02</span>
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Rust", "TypeScript", "Docker", "Wasm"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-[#11141c] text-xs font-mono text-stone-200 border border-stone-800 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Column: Sticky Meta Data & Actions */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            
            {/* Primary Action Card */}
            <div className="p-6 rounded-2xl bg-[#11141c] border border-stone-800 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
                  TEAM REGISTRY
                </div>
                <div className="text-lg font-serif text-white">
                  {project.teamName}
                </div>
                <div className="flex gap-2 pt-1 text-xs font-mono text-[#fe330a]">
                  <span>@member_1</span>
                  <span>@member_2</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4 border-y border-stone-800/80 text-xs font-mono">
                <div>
                  <div className="text-stone-500 mb-1">LATENCY</div>
                  <div className="text-stone-200 font-bold">0.8ms p99</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">COVERAGE</div>
                  <div className="text-emerald-400 font-bold">98.2%</div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={project.repoUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-bold border border-stone-700 flex items-center justify-between transition-colors"
                >
                  View Source Code <span className="text-[#fe330a]">&nearr;</span>
                </Link>
                <button
                  className="w-full py-3 px-4 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#fe330a]/25 flex items-center justify-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Launch Sandbox Enclave
                </button>
              </div>

            </div>

            {/* Escrow Hash Card */}
            <div className="p-4 rounded-xl bg-[#0a0d13] border border-stone-800 flex items-start gap-3">
              <span className="text-[#fe330a] mt-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  CRYPTOGRAPHIC SNAPSHOT
                </div>
                <div className="text-xs font-mono text-stone-300 break-all">
                  0x9a8f22b7c4d3...e8a2
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
