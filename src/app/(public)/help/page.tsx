import Link from "next/link";

export const metadata = { title: "Help" };

/* DESIGN SYSTEM TOKENS — Obsidian Kinetic / Editorial Serif */
const tokens = {
  canvas: "min-h-screen bg-background text-stone-100 antialiased selection:bg-[var(--color-primary)]/30 selection:text-white font-sans flex flex-col",
  container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  card: "bg-surface border border-stone-800/80 rounded-2xl p-6 sm:p-7 shadow-xl transition-all duration-200 hover:border-stone-700 hover:shadow-[var(--color-primary)]/5",
  btnPrimary: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[var(--color-primary)]/25",
  btnSecondary: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-surface-hover hover:bg-surface-hover text-stone-300 hover:text-white border border-stone-800 text-xs font-mono font-semibold uppercase tracking-wider transition-all",
  serifHeading: "font-serif text-white tracking-tight leading-[1.1]",
};

const ROLES = [
  {
    tag: "ROLE 01 // PARTICIPANTS",
    title: "Participants & Teams",
    desc: "Join the hackathon, form teams, and submit your final project.",
    specs: [
      { label: "Team Formation", detail: "Form teams of 1-4 engineers via invite links." },
      { label: "Project Drafts", detail: "Draft and edit your submission before the final deadline." },
      { label: "Strict Deadlines", detail: "Submissions close strictly at the deadline. Late posts are blocked." },
    ],
  },
  {
    tag: "ROLE 02 // JUDGES",
    title: "Hackathon Judges",
    desc: "Evaluate assigned projects on a strict 1-5 scale within specific tracks.",
    specs: [
      { label: "Track Isolation", detail: "Judges can only see and score projects within their assigned category." },
      { label: "Double-Blind Format", detail: "Judges review submissions without seeing the participant names." },
      { label: "Scoring Criteria", detail: "Score across three dimensions: Functionality, Quality, and Innovation." },
    ],
  },
  {
    tag: "ROLE 03 // ORGANIZERS",
    title: "Organizers & Admins",
    desc: "Oversee the event, export normalized scores, and resolve disputes.",
    specs: [
      { label: "Score Normalization", detail: "View automated Z-score standardization adjusting for juror biases." },
      { label: "Audit Logs", detail: "View the append-only audit trail of all platform activity." },
      { label: "Data Export", detail: "Export the final audited results and raw scores to CSV." },
    ],
  },
];

const FAQS = [
  {
    q: "How are projects scored?",
    a: "Projects are graded on an integer scale from 1 to 5. The criteria are Functionality, Quality, and Innovation.",
  },
  {
    q: "What is Z-Score Normalization?",
    a: "Z-score normalization dynamically adjusts scores relative to that individual juror's historical mean and standard deviation, neutralizing harsh or lenient biases.",
  },
  {
    q: "Can I edit my project after submitting?",
    a: "You can draft and edit your submission freely up until the server-side deadline is reached. After the deadline, the submission is locked.",
  },
];

export default function HelpAndHowItWorksPage() {
  return (
    <div className={tokens.canvas}>
      {/* GLOBAL TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
            <span className="font-mono font-bold tracking-tight text-white text-base">DOGFOOD</span>
            <span className="font-serif italic font-bold text-[var(--color-primary)] text-base">2026</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-stone-400">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Overview</Link>
            <Link href="/projects" className="hover:text-[var(--color-primary)] transition-colors">Public Gallery</Link>
            <Link href="/help" className="text-[var(--color-primary)] font-bold">Help & Guide</Link>
          </nav>
        </div>
      </header>

      <main className="space-y-20 py-12 sm:py-16">
        {/* 1. PAGE HEADER */}
        <section className={tokens.container}>
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block">
               PLATFORM MANUAL
            </span>
            <h1 className={`${tokens.serifHeading} text-4xl sm:text-5xl lg:text-6xl`}>
              How It <span className="italic text-[var(--color-primary)]">Works</span>
            </h1>
            <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
              A transparent overview of the DOGFOOD 2026 platform, participant intake, and juror scoring rubrics.
            </p>
          </div>
        </section>

        {/* 2. THREE CORE OPERATIONAL ROLES */}
        <section id="roles" className={tokens.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800/80 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block mb-1">
                01 // ECOSYSTEM ROLES
              </span>
              <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
                Core Operational Paths
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {ROLES.map((role, idx) => (
              <div key={idx} className={`${tokens.card} flex flex-col justify-between`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--color-primary)] font-semibold">{role.tag}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white font-semibold">{role.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed mt-2">{role.desc}</p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-stone-800/60 text-xs">
                    {role.specs.map((spec, i) => (
                      <div key={i} className="space-y-1">
                        <span className="font-mono text-[11px] font-bold text-white flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                          {spec.label}
                        </span>
                        <p className="text-stone-500 pl-3 text-[11px] leading-relaxed">{spec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. NATIVE FAQ (No JS required) */}
        <section id="faq" className={tokens.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800/80 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block mb-1">
                02 // KNOWLEDGE BASE
              </span>
              <h2 className={`${tokens.serifHeading} text-3xl sm:text-4xl`}>
                Support & Guidelines
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <details key={idx} className={`${tokens.card} group cursor-pointer marker:content-['']`}>
                <summary className="flex items-center justify-between gap-4 font-serif text-base text-white hover:text-stone-300 list-none">
                  <span><span className="text-[var(--color-primary)] font-mono text-sm shrink-0 mr-2">Q.</span>{faq.q}</span>
                  <span className="text-xs font-mono text-[var(--color-primary)] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-xs text-stone-400 font-sans leading-relaxed mt-4 pt-3 border-t border-stone-800">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
        
        {/* 4. GALLERY CTA */}
        <section className={tokens.container}>
          <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-stone-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-mono text-[var(--color-primary)] uppercase tracking-wider block font-bold">
                 PUBLIC GALLERY
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif">
                Explore Submissions
              </h3>
              <p className="text-xs text-stone-400 max-w-lg font-sans leading-relaxed">
                View all live projects and demos built during the sprint. 
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link href="/projects" className={`${tokens.btnPrimary}`}>
                Open Gallery &rarr;
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
