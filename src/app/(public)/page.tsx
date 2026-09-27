import Link from "next/link";

/*  DESIGN SYSTEM TOKEN CLASS MAPPINGS  */
const tokens = {
  canvas: "min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  card: "bg-[#11141c] border border-stone-800/80 rounded-2xl p-6 transition-all duration-200 hover:border-stone-700 hover:shadow-xl hover:shadow-[#fe330a]/5",
  btnPrimary: "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-lg shadow-[#fe330a]/25 hover:shadow-[#fe330a]/40",
  btnSecondary: "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141822] hover:bg-[#1a202c] text-stone-300 hover:text-white border border-stone-800 text-xs font-mono uppercase tracking-wider font-semibold transition-all",
  serifHeading: "font-serif text-white tracking-tight leading-[1.08]",
};

const CHALLENGE_TRACKS = [
  {
    tag: "TRACK 01 // AUTONOMOUS AGENTS",
    pool: "$45,000 POOL",
    title: "Autonomous Multi-Agent Systems",
    desc: "Architect scalable consensus models, low-latency inter-agent state machines, and resilience under adversarial network partitioning.",
    tech: ["LangGraph", "vLLM", "libp2p", "Byzantine consensus"],
  },
  {
    tag: "TRACK 02 // CRYPTOGRAPHIC INFRA",
    pool: "$35,000 POOL",
    title: "Zero-Knowledge & Decentralized Infra",
    desc: "Deploy client-side prover acceleration, trustless computation verification, and hermetic secure enclave execution pipelines.",
    tech: ["Halo2", "Circom", "Rust", "Wasm Sandboxes"],
  },
  {
    tag: "TRACK 03 // SYSTEMS TOOLING & MICROGRIDS",
    pool: "$30,000 POOL",
    title: "Developer Tooling & Microgrids",
    desc: "Ultra-fast compilation harnesses, kernel-level telemetry capture, real-time energy telemetry streaming, and deterministic emulators.",
    tech: ["LLVM", "WebGPU", "eBPF", "Real-time Profiling"],
  },
];

const VALIDATION_COLUMNS = [
  { num: "01 // IDENTITY", title: "Double-Blind Peer Review", desc: "Obfuscated identity vectors until deliberation quorum is unlocked. Jurors judge raw code artifacts without reputational bias." },
  { num: "02 // ISOLATION", title: "Hermetic Sandboxes", desc: "100% reproducible builds execute in isolated WebContainers and hardware TEEs to measure true throughput and zero-latency states." },
  { num: "03 // FAIRNESS", title: "Algorithmic Scoring Matrix", desc: "Z-score normalization dynamically adjusts for harsh and lenient juror biases, neutralizing single-juror skew across all tracks." },
  { num: "04 // DISBURSEMENT", title: "Non-Dilutive Escrow", desc: "Automated multi-sig smart contract release upon unanimous cryptographic attestation. No equity capture, ever." },
];

const FAQS = [
  { q: "Who owns the intellectual property built during DOGFOOD 2026?", a: "100% of all intellectual property, source code, data models, and designs produced during DOGFOOD remain strictly with you and your team. We take zero equity, zero IP rights, and no future claims." },
  { q: "What is the allowed team size and remote policy?", a: "Teams can range from 1 to 4 engineers. Remote participation is 100% supported globally with synchronized online sandboxes and Discord helpdesks." },
  { q: "How is double-blind evaluation verified?", a: "All GitHub commits and author IDs are hashed into anonymous PRJ-IDs. Jurors cannot view author names or organization badges until all scores are committed to the escrow contract." },
];

export default function Home() {
  return (
    <div className={tokens.canvas}>
      {/* GLOBAL PROTOCOL HEADER */}
      <header className="sticky top-0 z-50 bg-[#0c0e13]/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#fe330a] shadow-[0_0_10px_#fe330a]" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono font-bold tracking-tight text-white text-base">DOGFOOD</span>
                <span className="font-serif italic font-bold text-[#fe330a] text-lg leading-none">2026</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-stone-400">
              <Link href="#overview" className="text-white hover:text-[#fe330a] transition-colors">Overview</Link>
              <Link href="#tracks" className="hover:text-[#fe330a] transition-colors">Tracks</Link>
              <Link href="/projects" className="hover:text-[#fe330a] transition-colors">Public Gallery</Link>
              <Link href="/help" className="hover:text-[#fe330a] transition-colors">Help</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/20">
              Submit Project
            </Link>
          </div>
        </div>
      </header>

      {/* STATUS NOTIFICATION BANNER */}
      <div className="border-b border-stone-800/80 bg-[#10141e]/80 py-2.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
            <span className="font-semibold text-white">REGISTRATION OPEN</span>
            <span className="text-stone-600">//</span>
            <span>SEP 25-28, 2026</span>
          </div>
          <div className="text-[11px] font-semibold text-[#fe330a] bg-[#fe330a]/10 px-3 py-0.5 rounded-full border border-[#fe330a]/30">
            $110,000 NON-DILUTIVE POOL
          </div>
        </div>
      </div>

      <main className="space-y-24 py-12">
        {/* 1. HERO SECTION */}
        <section id="overview" className={tokens.container}>
          <div className="space-y-8 max-w-4xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#fe330a]">
              DOGFOOD 2026 BENCHMARK SPRINT
            </div>
            <h1 className={`${tokens.serifHeading} text-5xl sm:text-6xl lg:text-7xl font-normal`}>
              Built from Scratch.{" "}
              <span className="italic text-[#fe330a] font-normal block sm:inline">
                Shipped in 48 Hours.
              </span>
            </h1>
            <p className="text-stone-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              An invitational engineering sprint for autonomous systems builders, verified cryptographers, and protocol hackers.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/register" className={tokens.btnPrimary}>
                Claim Hacker Pass &rarr;
              </Link>
              <Link href="/projects" className={tokens.btnSecondary}>
                Explore Public Gallery
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-stone-800/80">
            <div className={tokens.card}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">BENCHMARK VOLUME</span>
              <span className="text-3xl font-mono font-bold text-white block mt-1">42</span>
              <span className="text-xs text-stone-400 mt-1 block">Projects Shipped</span>
            </div>
            <div className={tokens.card}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">ATTESTATION BUS</span>
              <span className="text-3xl font-mono font-bold text-white block mt-1">1,840</span>
              <span className="text-xs text-stone-400 mt-1 block">Signed Commits</span>
            </div>
            <div className={tokens.card}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">CORE VERTICALS</span>
              <span className="text-3xl font-mono font-bold text-white block mt-1">3</span>
              <span className="text-xs text-stone-400 mt-1 block">ZK, Agents, DevTools</span>
            </div>
            <div className={tokens.card}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">DELIBERATION AUDIT</span>
              <span className="text-3xl font-mono font-bold text-[#fe330a] block mt-1">100%</span>
              <span className="text-xs text-stone-400 mt-1 block">Double-Blind Verification</span>
            </div>
          </div>
        </section>

        {/* 2. ACTIVE CHALLENGE TRACKS */}
        <section id="tracks" className={tokens.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-800/80">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block mb-2">
                STAGE 03 / BENCHMARK CATEGORIES
              </span>
              <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
                Active Challenge Tracks
              </h2>
            </div>
            <div className="text-xs font-mono text-stone-400 px-4 py-2 rounded-xl bg-[#11141c] border border-stone-800 shrink-0">
              TOTAL POOL: <strong className="text-white">$110,000 COMMITTED</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {CHALLENGE_TRACKS.map((t, idx) => (
              <div key={idx} className={`${tokens.card} group flex flex-col justify-between overflow-hidden p-0 border-t-2 border-t-[#fe330a]/50 hover:border-t-[#fe330a]`}>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#181c26] to-transparent">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono uppercase text-[#fe330a] tracking-wider block">{t.tag}</span>
                      <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-[#fe330a]/10 text-[#fe330a] border border-[#fe330a]/20">
                        {t.pool}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-white">{t.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">{t.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-800/50">
                    {t.tech.map((chip, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#11141c] text-[10px] font-mono text-stone-300 border border-stone-800">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. RAPID VALIDATION ARCHITECTURE */}
        <section className={tokens.container}>
          <div className="space-y-3 max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
              STRICT JURY PROTOCOL
            </span>
            <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
              Engineered for Rapid Validation
            </h2>
            <p className="text-sm text-stone-400">
              Double-blind execution, reproducible environments, and programmatic juror convergence remove all subjective variance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Terminal Enclave */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080a0f] border border-stone-800/90 font-mono text-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[11px] text-stone-400 ml-2">TEE_SANDBOX_V2 // RUNNER</span>
                </div>
              </div>
              <div className="space-y-2 text-stone-300 font-mono leading-relaxed overflow-hidden">
                <p className="text-stone-500">&gt; dogfood-bench --target @0x7f48a9 --strict</p>
                <p className="text-emerald-400">[INIT] Isolating container c92b8d00... OK (1.4ms)</p>
                <p>[BUILD] Wasm compilation via LLVM-18: <span className="text-cyan-400 font-semibold">VERIFIED</span></p>
                <p>[TEST_01] Byzantine partition injection... <span className="text-emerald-400">PASS (4ms)</span></p>
                <p>[TEST_02] Halo2 client-side proofs... <span className="text-emerald-400">PASS (8ms)</span></p>
                <p className="text-[#fe330a] font-bold mt-2">&gt;&gt; BENCHMARK SCORE: 98.7 / 100 <span className="text-stone-500 font-normal">HASH #E88F9</span></p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALIDATION_COLUMNS.map((col, idx) => (
                <div key={idx} className={tokens.card}>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-[#fe330a]">{col.num}</span>
                  </div>
                  <h4 className="text-base font-serif text-white mb-2">{col.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ & CALL TO ACTION */}
        <section id="faq" className={tokens.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Native Accordion FAQ (No JS) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">KNOWLEDGE BASE</span>
                <h3 className={`${tokens.serifHeading} text-3xl sm:text-4xl mt-1`}>Frequently Answered Inquiries</h3>
              </div>
              <div className="space-y-3 pt-4">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className={`${tokens.card} group cursor-pointer marker:content-['']`}>
                    <summary className="flex items-center justify-between gap-4 font-serif text-base text-white hover:text-stone-200 list-none">
                      <span>{faq.q}</span>
                      <span className="text-xs font-mono text-[#fe330a] group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed mt-4 pt-3 border-t border-stone-800">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Right: Auth Flow CTA (Replaces custom form to respect Nihal's scope) */}
            <div className="lg:col-span-5">
              <div className={`${tokens.card} p-8 space-y-6 bg-gradient-to-b from-[#181c26] to-[#11141c] border-[#fe330a]/20 shadow-2xl shadow-[#fe330a]/5`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                    <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
                    <span>ADMISSION PROTOCOL</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-white">Join the Network</h3>
                  <p className="text-sm text-stone-400 font-sans leading-relaxed">
                    Ready to build? Authenticate your developer profile and form your team to gain access to the submission portal and compute clusters.
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <Link href="/register" className={`${tokens.btnPrimary} w-full text-center`}>
                    Create Participant Account &rarr;
                  </Link>
                  <Link href="/login" className="block text-center text-xs font-mono text-stone-500 hover:text-white transition-colors">
                    Already registered? Sign in here.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* FOOTER */}
      <footer className="border-t border-stone-800/80 bg-[#080b11] py-12 px-4 sm:px-8 text-xs font-mono text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; 2026 DOGFOOD PORTAL</div>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="hover:text-stone-300">Gallery</Link>
            <Link href="/help" className="hover:text-stone-300">Help / Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
