import Link from "next/link";
import AiChatbot from "@/components/help/AiChatbot";

/* DESIGN SYSTEM TOKENS — Obsidian Kinetic / Editorial Serif */
const tokens = {
  canvas: "min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col",
  container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  card: "bg-[#11141c] border border-stone-800/80 rounded-2xl p-6 sm:p-7 shadow-xl transition-all duration-200 hover:border-stone-700 hover:shadow-[#fe330a]/5",
  btnPrimary: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/25",
  btnSecondary: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#141822] hover:bg-[#1a202c] text-stone-300 hover:text-white border border-stone-800 text-xs font-mono font-semibold uppercase tracking-wider transition-all",
  serifHeading: "font-serif text-white tracking-tight leading-[1.1]",
};

const ROLES = [
  {
    tag: "ROLE 01 // SUBMISSION",
    title: "Participants (Builders)",
    desc: "Build and deploy verifiable product prototypes within the 48-hour build envelope using standardized micro-containers.",
    specs: [
      { label: "Identity Attestation", detail: "Claim verified hacker pass via GitHub commit history check." },
      { label: "Sandboxed Execution", detail: "Spin up hermetic WebContainer sandboxes for inference." },
      { label: "Cryptographic Lock", detail: "Commit signed Git tags before Hour 48 deadline." },
    ],
    deliverables: ["Public repo", "Container build spec", "120s walkthrough"],
  },
  {
    tag: "ROLE 02 // DELIBERATION",
    title: "Judges (Jurors)",
    desc: "Review randomized submissions under strict double-blind conditions with sanitized repo views and reproducible runs.",
    specs: [
      { label: "Double-Blind Inspect", detail: "Anonymized UI strips sponsor ties and author credentials." },
      { label: "Live Endpoint Replay", detail: "Execute remote health checks directly against isolated staging builds." },
      { label: "Cryptographic Rubric", detail: "Submit tamper-resistant scores across Functionality, Architecture, and Innovation." },
    ],
    deliverables: ["Objective scores", "Technical critique notes", "Anomaly flags"],
  },
  {
    tag: "ROLE 03 // GOVERNANCE",
    title: "Organizers & Leads",
    desc: "Monitor real-time deliberation telemetry, calculate convergence, and trigger cryptographic payout executions.",
    specs: [
      { label: "Quorum Tracking", detail: "Ensure all projects receive 4 independent reviews with global quorum target threshold >95%." },
      { label: "Statistical Normalization", detail: "Execute automated Z-score standardization to neutralize overly harsh or excessively lenient jurors." },
      { label: "Escrow Multi-Sig", detail: "Sign final settlement payloads for automated non-dilutive smart contract distributions." },
    ],
    deliverables: ["Audited results matrix", "Dispute resolutions", "Grant release sigs"],
  },
];

const LIFECYCLE_STEPS = [
  {
    step: "01", hours: "H00 — H48", title: "Intake & Obfuscation",
    desc: "Strict commit cutoff enforced by daemon. Submission hashes are locked on-chain, and repos undergo automated PII scrubbing.",
    badge: "Identity Obfuscation"
  },
  {
    step: "02", hours: "H48 — H60", title: "Double-Blind Evaluation",
    desc: "Reviewers receive pseudo-randomized cohorts of projects. Each sandbox executes hermetically with real-time test invocation.",
    badge: "Triangulated Quorum"
  },
  {
    step: "03", hours: "H60 — H66", title: "Telemetry & Z-Score",
    desc: "Raw juror scores are ingested by our normalization microservice. Divergent grading distributions are mathematically scaled.",
    badge: "Variance Neutralization"
  },
  {
    step: "04", hours: "H66 — H72", title: "Escrow Settlement",
    desc: "Consensus proofs are finalized. Upon reaching 95%+ quorum signature convergence, non-dilutive grants execute directly.",
    badge: "Immediate Non-Custodial"
  },
];

const FAQS = [
  {
    q: "What if my container build fails?",
    a: "The intake runner automatically parses your dogfood.yml or Dockerfile. If the container exits with non-zero status during pre-flight sanity checks, an automated diagnostic log is returned to your dashboard with a 2-hour grace repair window.",
  },
  {
    q: "How are scoring disputes appealed?",
    a: "If your submission was flagged for build failure that you can prove ran cleanly, you can initiate a single-click arbitration request within Hour 60 to 64. A Protocol Lead will re-run the build container.",
  },
  {
    q: "Are prizes paid in tokens or fiat?",
    a: "All tier payouts are executed exclusively in pure native USDC directly to the verified team multi-sig or smart wallet addresses. No token vesting, zero locked governance allocations.",
  },
];

export default function HelpAndHowItWorksPage() {
  return (
    <div className={tokens.canvas}>
      {/* GLOBAL TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0c0e13]/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
            <span className="font-mono font-bold tracking-tight text-white text-base">DOGFOOD</span>
            <span className="font-serif italic font-bold text-[#fe330a] text-base">2026</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-stone-400">
            <Link href="/" className="hover:text-[#fe330a] transition-colors">Overview</Link>
            <Link href="/projects" className="hover:text-[#fe330a] transition-colors">Public Gallery</Link>
            <Link href="/help" className="text-[#fe330a] font-bold">Help & Guide</Link>
          </nav>
        </div>
      </header>

      <main className="space-y-20 py-12 sm:py-16">
        {/* 1. PAGE HEADER */}
        <section className={tokens.container}>
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
               PLATFORM MANUAL & ARCHITECTURAL GUIDE
            </span>
            <h1 className={`${tokens.serifHeading} text-4xl sm:text-5xl lg:text-6xl`}>
              How It <span className="italic text-[#fe330a]">Works</span>
            </h1>
            <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
              A transparent overview of the DOGFOOD 2026 double-blind verification pipeline, participant intake, juror scoring rubrics, and automated escrow distribution. Designed for engineering rigor, cryptographic integrity, and zero subjective friction.
            </p>
          </div>
        </section>

        {/* 2. THREE CORE OPERATIONAL ROLES */}
        <section id="roles" className={tokens.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800/80 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block mb-1">
                01 // ECOSYSTEM PARTICIPANTS
              </span>
              <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
                Three Core Operational Roles
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {ROLES.map((role, idx) => (
              <div key={idx} className={`${tokens.card} flex flex-col justify-between`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#fe330a] font-semibold">{role.tag}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white font-semibold">{role.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed mt-2">{role.desc}</p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-stone-800/60 text-xs">
                    {role.specs.map((spec, i) => (
                      <div key={i} className="space-y-1">
                        <span className="font-mono text-[11px] font-bold text-white flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a]" />
                          {spec.label}
                        </span>
                        <p className="text-stone-500 pl-3 text-[11px] leading-relaxed">{spec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-stone-800/60 mt-6 space-y-4">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-2">STRICT DELIVERABLES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.deliverables.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-stone-400">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROTOCOL LIFECYCLE */}
        <section id="lifecycle" className={tokens.container}>
          <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
              02 // 48-HOUR PROTOCOL LIFECYCLE
            </span>
            <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
              From Code Freeze to Escrow Release
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LIFECYCLE_STEPS.map((step, idx) => (
              <div key={idx} className={`${tokens.card} flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#181c26] to-[#11141c]`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-stone-800/60">
                    <span className="px-2 py-0.5 rounded bg-[#fe330a]/20 text-[#fe330a] border border-[#fe330a]/30 font-bold">{step.step}</span>
                    <span className="text-stone-500 text-[11px]">{step.hours}</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{step.desc}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0c0e13] border border-stone-800/70 space-y-1">
                  <span className="text-[10px] font-mono text-[#fe330a] font-bold uppercase tracking-wider block">
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SCORING MATRIX */}
        <section id="rubric" className={tokens.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
                  03 // DELIBERATION & SCORING RUBRIC
                </span>
                <h3 className={`${tokens.serifHeading} text-3xl sm:text-4xl mt-1`}>
                  Mathematical Weight Matrix
                </h3>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { w: "40%", t: "Functionality & Stability", d: "Does the deployed container actually run without throwing fatal unhandled exceptions? Are API calls deterministic?" },
                  { w: "30%", t: "Code Quality & Architecture", d: "Clean modular separation, sound idiomatic patterns, clear type definitions, reproducible containerization recipes." },
                  { w: "30%", t: "Novelty & Ecosystem Utility", d: "Breakthrough technical approaches, novel primitive combinations, and direct tangible utility for open-source developers." }
                ].map((item, i) => (
                  <div key={i} className={tokens.card}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#fe330a]/20 border border-[#fe330a]/30 text-[#fe330a] text-[10px] font-mono font-bold">{item.w} WEIGHT</span>
                        <h4 className="font-serif font-bold text-sm text-white">{item.t}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
                  04 // MATHEMATICAL FAIRNESS
                </span>
                <h3 className={`${tokens.serifHeading} text-3xl sm:text-4xl mt-1`}>
                  Z-Score Normalization
                </h3>
              </div>
              <div className={`${tokens.card} space-y-5 bg-[#181c26]`}>
                <div className="p-4 rounded-xl bg-[#0c0e13] border border-stone-800 text-center font-mono">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block mb-1">MATHEMATICAL MODEL</span>
                  <div className="text-lg font-bold text-[#fe330a]">z = (x - μ) / σ</div>
                  <p className="text-[11px] text-stone-400 mt-2 font-sans leading-relaxed">
                    Every reviewer score is adjusted relative to that individual juror&apos;s historical mean (μ) and standard deviation (σ).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5. INTERACTIVE AI PROTOCOL ASSISTANT */}
        <AiChatbot />

        {/* 5. NATIVE FAQ (No JS required) */}
        <section id="faq" className={tokens.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800/80 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block mb-1">
                05 // KNOWLEDGE BASE
              </span>
              <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
                Support & Troubleshooting
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <details key={idx} className={`${tokens.card} group cursor-pointer marker:content-['']`}>
                <summary className="flex items-center justify-between gap-4 font-serif text-base text-white hover:text-stone-300 list-none">
                  <span><span className="text-[#fe330a] font-mono text-sm shrink-0 mr-2">Q.</span>{faq.q}</span>
                  <span className="text-xs font-mono text-[#fe330a] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-xs text-stone-400 font-sans leading-relaxed mt-4 pt-3 border-t border-stone-800">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 6. TRIAGE BANNER */}
        <section className={tokens.container}>
          <div className="p-8 sm:p-10 rounded-3xl bg-[#fe330a]/10 border border-[#fe330a]/20 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(254,51,10,0.1)]">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-mono text-[#fe330a] uppercase tracking-wider block font-bold">
                 LIVE SUPPORT ACTIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif">
                Need direct engineering triage?
              </h3>
              <p className="text-xs text-stone-400 max-w-lg font-sans leading-relaxed">
                Our core infrastructure engineers are on standby 24/7 across dedicated Discord channels and our encrypted Telegram bridge during the entire 48-hour build window.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link href="/" className={`${tokens.btnSecondary} bg-stone-900`}>
                Discord Helpdesk
              </Link>
              <Link href="/" className={`${tokens.btnSecondary}`}>
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
