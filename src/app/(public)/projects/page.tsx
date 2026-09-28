import React, { Suspense } from "react";
import Link from "next/link";
import { PublicProject } from "@/contracts";
import { GalleryCard } from "@/components/ui/GalleryCard";

// Mock data shaped exactly like the contract.
// Must contain Glass Signal, Small Meadow, Deep Compass
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


async function ProjectGrid() {
  // TODO: const projects = await getPublicProjects();
  const projects = MOCK_PROJECTS;

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-surface border border-stone-800 text-center space-y-4 shadow-xl mb-12">
        <span className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </span>
        <h3 className="text-xl font-syne font-bold text-white">Awaiting Submissions</h3>
        <p className="text-sm text-stone-400 max-w-sm">The enclave is currently verifying inbound projects. Check back after the deadline.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {projects.map((proj) => (
        <GalleryCard key={proj.id} project={proj} />
      ))}
    </div>
  );
}

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-48 rounded-2xl bg-surface border border-stone-800 animate-pulse" />
      ))}
    </div>
  );
}

export default async function PublicProjectGalleryPage() {
  

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 selection:text-white flex flex-col font-sans">
      


      {/*  Main Content Container  */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-10">

        {/* Top Deliberation Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-surface/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#fe330a]" />
            <span className="text-stone-300 font-medium">01  REPOSITORY SHOWCASE</span>
            <span className="text-stone-600"></span>
            <span>EVERY PROJECT BUILT IN 48 HOURS</span>
          </div>
          <div className="text-[11px] text-stone-400">
            PEER VERIFICATION: <strong className="text-stone-200">BLOCK #19,420 VALIDATED</strong>
          </div>
        </div>

        {/*  Hero Section with Deliberation Protocol Card  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Headlines & Metrics */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne text-white tracking-tight leading-[1.08]">
                Built from Scratch.{" "}
                <span className="italic font-syne text-primary block sm:inline">
                  Shipped in 48 Hours.
                </span>
              </h1>
              <p className="text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore verified open-source prototypes, autonomous neural networks, and systems tooling forged during the DOGFOOD 2026 hackathon. Clean code, live sandboxes, transparent peer audits.
              </p>
            </div>

            {/* Metric Counter Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800/60">
              <div className="p-4 rounded-xl bg-surface border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">42</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Projects Shipped</span>
                <span className="text-[10px] font-mono text-stone-500">100% on-time intake</span>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">1,840</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Signed Commits</span>
                <span className="text-[10px] font-mono text-stone-500">Ed25519 verified</span>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">5 Tracks</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Bounty Scopes</span>
                <span className="text-[10px] font-mono text-stone-500">ZK, Agents, Bio, Rust</span>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-stone-800">
                <span className="text-3xl font-mono font-bold text-primary block">98.4%</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Juror Consensus</span>
                <span className="text-[10px] font-mono text-stone-500">Active quorum</span>
              </div>
            </div>
          </div>

          {/* Right: Deliberation Protocol Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-surface border border-stone-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-primary font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  STAGE 03 ACTIVE
                </span>
                <span className="text-stone-500">18:42 SYNC</span>
              </div>

              <div>
                <h2 className="text-xl font-syne text-white">Deliberation Protocol</h2>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Autonomous verifiers & tier-1 human jurors reviewing benchmark reproduction.
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">AUDITED BENCHMARKS</span>
                  <span className="text-primary font-bold">38 / 42 DONE</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-stone-800">
                  <div className="h-full bg-primary w-[90%] rounded-full shadow-[0_0_8px_#fe330a]" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-stone-500 pt-1">
                  <span>Remaining Time:</span>
                  <span className="text-stone-300 font-semibold">14h 28m 10s</span>
                </div>
              </div>
            </div>

            {/* Sandbox Enclave Footer */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-primary"></span>
                <div>
                  <span className="text-stone-300 block font-medium">TEE Sandbox</span>
                  <span className="text-stone-500 text-[10px]">Enclave isolated</span>
                </div>
              </div>
              <button className="text-primary hover:underline flex items-center gap-1 font-semibold">
                View Rules &darr;
              </button>
            </div>
          </div>

        </div>

        {/*  Project Showcase Grid  */}
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectGrid />
        </Suspense>

        {/*  Consensus Scoring Matrix Section  */}
        <section aria-labelledby="matrix-heading" className="p-6 md:p-8 rounded-2xl bg-surface border border-stone-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-primary uppercase tracking-widest block">
                02  EVALUATION CRITERIA
              </span>
              <h2 id="matrix-heading" className="text-2xl md:text-3xl font-syne text-white">
                Consensus Scoring Matrix
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                Every project submitted within the 48-hour sprint underwent strict decentralized verification by both peer jurors and automated reproduction sandboxes.
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-400 px-3 py-1.5 rounded-lg bg-background border border-stone-800">
              <span className="text-primary font-bold"></span> Formula:{" "}
              <code className="text-stone-200">W = 0.35(A) + 0.30(U) + 0.35(V)</code>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Criteria 1 */}
            <article className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-primary">35%</span>
                <span className="text-stone-500"></span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Technical Novelty & Architecture</h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Rigorous algorithmic depth, latency minimization, memory profiling under stress, and graceful fallback handling in unpredicted edge conditions.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between text-[10px] font-mono text-stone-500">
                <span>WEIGHT: 35 PTS</span>
                <span className="text-primary font-semibold">AUDIT BENCHMARK</span>
              </div>
            </article>

            {/* Criteria 2 */}
            <article className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-primary">30%</span>
                <span className="text-stone-500"></span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Open-Source Utility & DX</h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Clarity of documentation, reproducibility via hermetic Docker builds, explicit type safety, and ergonomics for third-party developer integrations.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between text-[10px] font-mono text-stone-500">
                <span>WEIGHT: 30 PTS</span>
                <span className="text-stone-400 font-semibold">PEER REVIEWED</span>
              </div>
            </article>

            {/* Criteria 3 */}
            <article className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-primary">35%</span>
                <span className="text-stone-500"></span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Cryptographic Verification & Stability</h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Proof integrity, zero runtime crashes during automated torture tests, deterministic builds, and cryptographically attested juror commit signatures.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between text-[10px] font-mono text-stone-500">
                <span>WEIGHT: 35 PTS</span>
                <span className="text-primary font-semibold">ZERO-KNOWLEDGE</span>
              </div>
            </article>

          </div>
        </section>

        {/*  Local Reproduction Callout CTA  */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-surface via-[#141824] to-surface border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-mono text-primary uppercase tracking-widest block">
              HACKATHON ESCROW SAFEGUARD
            </span>
            <h3 className="text-2xl font-syne text-white">
              Want to reproduce a project{" "}
              <span className="italic font-syne text-primary">locally?</span>
            </h3>
            <p className="text-xs text-stone-400 font-sans">
              All sandboxes are hosted inside isolated WebContainers with full source transparency and verified dependency trees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-mono text-stone-300 font-medium transition-colors">
              Download Checksums
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#ff4922] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
              <span></span> Open Playground
            </button>
          </div>
        </div>

      </main>

      {/*  Global Footer  */}
      <footer className="mt-16 border-t border-stone-800/80 bg-[#090b10] px-4 md:px-8 py-8 text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-900">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-bold text-white tracking-tight">DOGFOOD &apos;26</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1 font-sans">
                Crafted with editorial indie care for global builders. Real-time evaluations, distributed consensus, and verifiable escrow benchmarks.
              </p>
            </div>
            <div className="flex items-center gap-6 text-[11px]">
              <div>
                EVALUATION ENGINE: <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div>
                LATENCY <span className="text-stone-300 font-semibold">12ms</span>
              </div>
              <div className="text-stone-400">
                SECURED VIA PROOF-OF-DELIBERATION PROTOCOL
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div className="flex items-center gap-4 text-stone-400">
              <Link href="#" className="hover:text-stone-200">01 Criteria Matrix</Link>
              <Link href="#" className="hover:text-stone-200">02 Escrow Protocol</Link>
              <Link href="#" className="hover:text-stone-200">03 Dispute Desk</Link>
            </div>
            <div>
              &copy; 2026 DOGFOOD PORTAL  INDIE BENCHMARK ALLIANCE
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
