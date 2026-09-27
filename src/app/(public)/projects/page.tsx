"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  tag: string;
  category: string;
  rating: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  hasWebGPU?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    tag: "01 // AETHER.CORE",
    category: "GenAI & Autonomous",
    rating: "9.8 / 10",
    title: "AetherMesh",
    subtitle: "Autonomous Multi-Agent Consensus",
    description:
      "Fault-tolerant agent quorum coordinating micro-transactions and real-time state synchronization over libp2p. Sub-millisecond consensus.",
    techStack: ["Rust", "LangGraph", "libp2p", "Wasm"],
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    tag: "02 // HYPER.WASM",
    category: "Dev Tooling",
    rating: "9.6 / 10",
    title: "HyperVapor",
    subtitle: "Edge WebAssembly Compiler",
    description:
      "Sub-millisecond just-in-time micro-compiler enabling instantaneous local sandboxing for serverless distributed workflows.",
    techStack: ["LLVM", "Rust", "Docker", "Cranelift"],
    imageUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    tag: "03 // ZK.VERIFY",
    category: "Zero-Knowledge",
    rating: "9.9 / 10",
    title: "ZeroProof ID",
    subtitle: "Anonymous Credentials",
    description:
      "Client-side Halo2 proving system allowing sovereign credential attestations without disclosing identity vectors on-chain.",
    techStack: ["Halo2", "SnarkJS", "Circom", "TypeScript"],
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    tag: "04 // BIO.SYNAPSE",
    category: "BioTech & Health",
    rating: "9.5 / 10",
    title: "BioSynapse",
    subtitle: "Protein Folding Explorer",
    description:
      "WebGL-accelerated browser renderer running quantized ESMFold models on consumer hardware in pure WebGPU pipelines.",
    techStack: ["WebGPU", "ONNX", "PyTorch", "Next.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "05",
    tag: "05 // TRACE.EVAL",
    category: "Neural Computing",
    rating: "9.7 / 10",
    title: "NeuroTrace",
    subtitle: "Real-Time Inference Profiler",
    description:
      "Flamegraph tracing engine tracking tensor memory leaks, cache thrashing, and compute bottlenecks down to CUDA core cycles.",
    techStack: ["CUDA", "C++20", "eBPF", "Go"],
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "06",
    tag: "06 // SOLUNA.GRID",
    category: "CleanTech Grid",
    rating: "9.4 / 10",
    title: "Soluna",
    subtitle: "Decentralized Grid Allocator",
    description:
      "Microgrid balancing oracle matching hyper-local solar surplus to dynamic EV battery bank reservoirs with zero transmission loss.",
    techStack: ["Solidity", "IoT / MQTT", "Python", "Foundry"],
    imageUrl:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "All (42)",
  "GenAI (12)",
  "ZK Infra (8)",
  "Dev Tools (14)",
  "Bio / Clean (8)",
];

export default function PublicProjectGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All (42)");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white flex flex-col font-sans">
      
      {/*  Persistent Global Navigation Header  */}
      <header className="sticky top-0 z-50 bg-[#0c0e13]/90 backdrop-blur-md border-b border-stone-800/80 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Protocol status */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono font-bold tracking-tight text-white text-base">DOGFOOD</span>
                <span className="font-serif italic font-bold text-[#fe330a] text-lg leading-none">2026</span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-2 hidden sm:inline">
                03  VERIFICATION
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141822] border border-stone-800 text-[11px] font-mono text-stone-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a]" />
              <span>STAGE 03 // DELIBERATION</span>
              <span className="text-stone-600"></span>
              <span>HALIFAX SYNC 18:42</span>
              <span className="text-stone-600"></span>
              <span className="text-amber-400">GOLDEN HOUR</span>
            </div>
          </div>

          {/* Navigation Links & Action */}
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center p-1 rounded-xl bg-[#121620] border border-stone-800 text-xs font-mono">
              <Link
                href="/projects"
                className="px-3.5 py-1.5 rounded-lg bg-stone-100 text-stone-900 font-bold"
              >
                Public Gallery
              </Link>
              <Link
                href="/judge/dashboard"
                className="px-3.5 py-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
              >
                Judge Console
              </Link>
              <Link
                href="/organizer/dashboard"
                className="px-3.5 py-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
              >
                Organizer Dashboard
              </Link>
            </nav>

            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/20"
            >
              <span>+</span>
              Submit Project
            </Link>
          </div>
        </div>
      </header>

      {/*  Main Content Container  */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-10">

        {/* Top Deliberation Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-[#11141c]/90 border border-stone-800/80 text-xs font-mono tracking-wider text-stone-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08]">
                Built from Scratch.{" "}
                <span className="italic font-serif text-[#fe330a] block sm:inline">
                  Shipped in 48 Hours.
                </span>
              </h1>
              <p className="text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore verified open-source prototypes, autonomous neural networks, and systems tooling forged during the DOGFOOD 2026 hackathon. Clean code, live sandboxes, transparent peer audits.
              </p>
            </div>

            {/* Metric Counter Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800/60">
              <div className="p-4 rounded-xl bg-[#11141c] border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">42</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Projects Shipped</span>
                <span className="text-[10px] font-mono text-stone-500">100% on-time intake</span>
              </div>
              <div className="p-4 rounded-xl bg-[#11141c] border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">1,840</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Signed Commits</span>
                <span className="text-[10px] font-mono text-stone-500">Ed25519 verified</span>
              </div>
              <div className="p-4 rounded-xl bg-[#11141c] border border-stone-800">
                <span className="text-3xl font-mono font-bold text-white block">5 Tracks</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Bounty Scopes</span>
                <span className="text-[10px] font-mono text-stone-500">ZK, Agents, Bio, Rust</span>
              </div>
              <div className="p-4 rounded-xl bg-[#11141c] border border-stone-800">
                <span className="text-3xl font-mono font-bold text-[#fe330a] block">98.4%</span>
                <span className="text-xs font-mono text-stone-300 font-semibold block mt-0.5">Juror Consensus</span>
                <span className="text-[10px] font-mono text-stone-500">Active quorum</span>
              </div>
            </div>
          </div>

          {/* Right: Deliberation Protocol Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#11141c] border border-stone-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-[#fe330a] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a] animate-pulse" />
                  STAGE 03 ACTIVE
                </span>
                <span className="text-stone-500">18:42 SYNC</span>
              </div>

              <div>
                <h2 className="text-xl font-serif text-white">Deliberation Protocol</h2>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Autonomous verifiers & tier-1 human jurors reviewing benchmark reproduction.
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">AUDITED BENCHMARKS</span>
                  <span className="text-[#fe330a] font-bold">38 / 42 DONE</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-stone-800">
                  <div className="h-full bg-[#fe330a] w-[90%] rounded-full shadow-[0_0_8px_#fe330a]" />
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
                <span className="text-[#fe330a]"></span>
                <div>
                  <span className="text-stone-300 block font-medium">TEE Sandbox</span>
                  <span className="text-stone-500 text-[10px]">Enclave isolated</span>
                </div>
              </div>
              <button className="text-[#fe330a] hover:underline flex items-center gap-1 font-semibold">
                View Rules &darr;
              </button>
            </div>
          </div>

        </div>

        {/*  Search & Category Filters Bar  */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#11141c] border border-stone-800">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 text-xs"></span>
            <input
              type="text"
              placeholder="Search by team, repository, or track..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0c0e13] border border-stone-800/80 rounded-xl text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto p-1 text-xs font-mono">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#fe330a] text-white font-semibold shadow-sm shadow-[#fe330a]/20"
                    : "bg-[#141822] text-stone-400 hover:text-white border border-stone-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/*  Project Showcase Grid (6 Cards)  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#11141c] border border-stone-800 hover:border-stone-700 hover:shadow-2xl hover:shadow-[#fe330a]/5 transition-all overflow-hidden"
            >
              {/* Card Thumbnail Container */}
              <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-[#11141c]/30 to-transparent" />

                {/* Category & Rating Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#0c0e13]/80 backdrop-blur-md text-stone-200 border border-stone-700/60">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#0c0e13]/80 backdrop-blur-md text-[#fe330a] border border-[#fe330a]/40 flex items-center gap-1">
                     {proj.rating}
                  </span>
                </div>

                {/* Sub-tag overlay */}
                <div className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-stone-400 bg-black/60 px-2 py-0.5 rounded border border-stone-800">
                  {proj.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-white tracking-tight group-hover:text-stone-100 transition-colors">
                    {proj.title} —{" "}
                    <span className="italic font-serif text-stone-300 font-normal">
                      {proj.subtitle}
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400 font-sans leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#161a24] text-[10px] font-mono text-stone-400 border border-stone-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center gap-2">
                  <Link href={`/projects/${proj.id}`} className="flex-1 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-800 flex items-center justify-center gap-1.5 transition-colors">
                    View Specs
                  </Link>
                  <Link href={`/projects/${proj.id}`} className="flex-1 py-2 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#fe330a]/20 flex items-center justify-center gap-1">
                    Enter Project &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*  Consensus Scoring Matrix Section  */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#fe330a] uppercase tracking-widest block">
                02  EVALUATION CRITERIA
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-white">
                Consensus Scoring Matrix
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                Every project submitted within the 48-hour sprint underwent strict decentralized verification by both peer jurors and automated reproduction sandboxes.
              </p>
            </div>
            <div className="text-[11px] font-mono text-stone-400 px-3 py-1.5 rounded-lg bg-[#0c0e13] border border-stone-800">
              <span className="text-[#fe330a] font-bold"></span> Formula:{" "}
              <code className="text-stone-200">W = 0.35(A) + 0.30(U) + 0.35(V)</code>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Criteria 1 */}
            <div className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-[#fe330a]">35%</span>
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
                <span className="text-[#fe330a] font-semibold">AUDIT BENCHMARK</span>
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-[#fe330a]">30%</span>
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
            </div>

            {/* Criteria 3 */}
            <div className="p-5 rounded-xl bg-[#0e1118] border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-[#fe330a]">35%</span>
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
                <span className="text-[#fe330a] font-semibold">ZERO-KNOWLEDGE</span>
              </div>
            </div>

          </div>

          {/* Live Juror Attestation Stream ticker */}
          <div className="p-4 rounded-xl bg-[#0a0d13] border border-stone-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a] animate-pulse" />
              <span>LIVE JUROR ATTESTATION STREAM</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-stone-300">Dr. Aris Thorne attested <strong className="text-white">AetherMesh</strong></span>
                <span className="text-[#fe330a] font-bold">+9.8 PTS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-300">Soren Lindqvist attested <strong className="text-white">ZeroProof ID</strong></span>
                <span className="text-[#fe330a] font-bold">+9.9 PTS</span>
              </div>
              <span className="text-stone-600">SYNCED: 10s AGO</span>
            </div>
          </div>
        </div>

        {/*  Local Reproduction Callout CTA  */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#11141c] via-[#141824] to-[#11141c] border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-mono text-[#fe330a] uppercase tracking-widest block">
              HACKATHON ESCROW SAFEGUARD
            </span>
            <h3 className="text-2xl font-serif text-white">
              Want to reproduce a project{" "}
              <span className="italic font-serif text-[#fe330a]">locally?</span>
            </h3>
            <p className="text-xs text-stone-400 font-sans">
              All sandboxes are hosted inside isolated WebContainers with full source transparency and verified dependency trees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-mono text-stone-300 font-medium transition-colors">
              Download Checksums
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#fe330a]/25 flex items-center gap-2">
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
                <span className="h-2 w-2 rounded-full bg-[#fe330a]" />
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
