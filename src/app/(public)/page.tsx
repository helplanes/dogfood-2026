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

const VALIDATION_COLUMNS = [
  { num: "01 // ANONYMOUS REVIEW", title: "Double-Blind Peer Review", desc: "Judges review code artifacts and demos without seeing team names or author identities to remove reputational bias." },
  { num: "02 // TRACK ISOLATION", title: "Strict Track Assignment", desc: "Judges are assigned specific tracks and only review projects within those tracks. Cross-track visibility is strictly restricted." },
  { num: "03 // FAIRNESS", title: "Z-Score Normalization", desc: "Scoring uses per-judge z-score normalization with shrinkage toward the global mean, neutralizing overly harsh or lenient grading." },
  { num: "04 // ENFORCED TIMELINES", title: "Server-side Deadlines", desc: "Submissions and edits are strictly enforced by the server clock. Late submissions are automatically rejected with a 4xx error." },
];

const FAQS = [
  { q: "Who owns the intellectual property built during DOGFOOD 2026?", a: "100% of all intellectual property, source code, data models, and designs produced during DOGFOOD remain strictly with you and your team." },
  { q: "What is the allowed team size?", a: "Teams can range from 1 to 4 engineers." },
  { q: "How is the scoring structured?", a: "Projects are graded on an integer scale of 1-5 across three criteria: Functionality, Quality, and Innovation." },
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
              <Link href="/projects" className="hover:text-[#fe330a] transition-colors">Public Gallery</Link>
              <Link href="/help" className="hover:text-[#fe330a] transition-colors">Help</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/20">
              Explore Projects
            </Link>
          </div>
        </div>
      </header>

      {/* STATUS NOTIFICATION BANNER */}
      <div className="border-b border-stone-800/80 bg-[#10141e]/80 py-2.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
            <span className="font-semibold text-white">SUBMISSIONS OPEN</span>
            <span className="text-stone-600">&#47;&#47;</span>
            <span>SEP 25-28, 2026</span>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        {/* Dynamic mesh gradients */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 blur-[140px] bg-gradient-to-r from-[#fe330a] to-orange-600 rounded-full mix-blend-screen"></div>
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] opacity-10 blur-[120px] bg-indigo-500/20 rounded-full mix-blend-screen"></div>
        <div className="absolute top-40 -right-40 w-[600px] h-[600px] opacity-10 blur-[120px] bg-[#fe330a]/20 rounded-full mix-blend-screen"></div>
      </div>

      <main className="space-y-24 py-12 relative z-10">
        {/* 1. HERO SECTION */}
        <section id="overview" className={tokens.container}>
          <div className="space-y-8 max-w-4xl pt-12 md:pt-24 text-center mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141822]/80 backdrop-blur-sm border border-[#fe330a]/30 text-[11px] font-mono text-stone-300 mx-auto shadow-[0_0_20px_rgba(254,51,10,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
              <span className="tracking-widest">DOGFOOD 2026 HACKATHON</span>
            </div>
            
            <h1 className={`${tokens.serifHeading} text-5xl sm:text-7xl lg:text-[5.5rem] font-normal leading-[1.05]`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-stone-400">
                Built from Scratch.
              </span>
              <br />
              <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#fe330a] via-[#ff4d26] to-orange-500 font-medium block sm:inline mt-2">
                Shipped in 72 Hours.
              </span>
            </h1>
            
            <p className="text-stone-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
              An open-source, self-hostable hackathon platform featuring strict track isolation, double-blind reviews, and normalized z-score judging.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link href="/projects" className={tokens.btnPrimary}>
                Explore Public Gallery &rarr;
              </Link>
              <Link href="/signup" className={`${tokens.btnSecondary} bg-transparent backdrop-blur-md hover:bg-[#141822]`}>
                Sign Up as Participant
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 pt-8 border-t border-stone-800/80 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#fe330a]/50 to-transparent"></div>
            
            <div className={`${tokens.card} bg-transparent backdrop-blur-sm`}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">SUBMITTED PROJECTS</span>
              <span className="text-4xl font-mono font-bold text-white block mt-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-500">41</span>
              <span className="text-xs text-stone-400 mt-1 block">Live in Gallery</span>
            </div>
            <div className={`${tokens.card} bg-transparent backdrop-blur-sm`}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">EVALUATION TRACKS</span>
              <span className="text-4xl font-mono font-bold text-white block mt-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-500">8</span>
              <span className="text-xs text-stone-400 mt-1 block">Isolated Categories</span>
            </div>
            <div className={`${tokens.card} bg-transparent backdrop-blur-sm`}>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">EXPERT JUDGES</span>
              <span className="text-4xl font-mono font-bold text-white block mt-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-500">30</span>
              <span className="text-xs text-stone-400 mt-1 block">Active on Panel</span>
            </div>
            <div className={`${tokens.card} bg-transparent backdrop-blur-sm relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe330a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block relative z-10">SCORE RECORDS</span>
              <span className="text-4xl font-mono font-bold text-[#fe330a] block mt-2 relative z-10 drop-shadow-[0_0_8px_rgba(254,51,10,0.5)]">126</span>
              <span className="text-xs text-stone-400 mt-1 block relative z-10">Peer Reviews Logged</span>
            </div>
          </div>
        </section>

        {/* 2. RAPID VALIDATION ARCHITECTURE */}
        <section className={tokens.container}>
          <div className="space-y-3 max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fe330a] block">
              STRICT JURY PROTOCOL
            </span>
            <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
              Engineered for Fairness
            </h2>
            <p className="text-sm text-stone-400">
              Double-blind review isolation, strict server-side deadlines, and programmatic juror z-score normalization remove subjective variance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </section>

        {/* 3. FAQ & CALL TO ACTION */}
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

            {/* Right: Auth Flow CTA */}
            <div className="lg:col-span-5">
              <div className={`${tokens.card} p-8 space-y-6 bg-gradient-to-b from-[#181c26] to-[#11141c] border-[#fe330a]/20 shadow-2xl shadow-[#fe330a]/5`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                    <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
                    <span>PUBLIC GALLERY</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-white">Explore Submissions</h3>
                  <p className="text-sm text-stone-400 font-sans leading-relaxed">
                    View all 41 live projects, source code links, and 5-minute demo videos built during the 72-hour sprint.
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <Link href="/projects" className={`${tokens.btnPrimary} w-full text-center`}>
                    Open Project Gallery &rarr;
                  </Link>
                  <Link href="/signup" className="block text-center text-xs font-mono text-stone-500 hover:text-white transition-colors">
                    Participant? Sign up here.
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
