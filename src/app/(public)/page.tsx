import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col items-center relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none flex justify-center">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Top orange glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[120px] bg-[#fe330a] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center px-8 py-32 text-center max-w-5xl mx-auto border-b border-stone-800/50 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141822] border border-stone-800 text-[11px] font-mono text-stone-400 mb-8 animate-fade-in-down shadow-lg shadow-black/50 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a] animate-pulse" />
          <span>PORTAL ONLINE</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.1] animate-fade-in-up">
          DOGFOOD 2026. <br />
          <span className="italic font-serif text-[#fe330a]">Build the platform that will judge you.</span>
        </h1>
        
        <p className="text-base md:text-lg font-sans text-stone-400 leading-relaxed max-w-2xl mx-auto mt-8 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          Welcome to the official portal for submission and judging. Explore verified open-source prototypes and autonomous neural networks built by our teams.
        </p>

        <div className="flex justify-center mt-8 text-[11px] md:text-xs font-mono uppercase tracking-widest text-stone-500 space-x-6 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <span className="flex items-center gap-2"><span className="text-[#fe330a]">/</span> Sep 25-28, 2026</span>
          <span className="flex items-center gap-2"><span className="text-[#fe330a]">/</span> Online</span>
          <span className="flex items-center gap-2"><span className="text-[#fe330a]">/</span> $2,500 Prizes</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <Link 
            href="/projects" 
            className="px-8 py-4 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25 hover:shadow-[#fe330a]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            BROWSE PROJECTS &rarr;
          </Link>
          <Link 
            href="/help" 
            className="px-8 py-4 rounded-xl bg-[#11141c]/80 backdrop-blur-sm hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-800 hover:border-stone-600 transition-all hover:-translate-y-0.5 flex items-center justify-center"
          >
            How it Works
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-8 py-24 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            The Hackathon <span className="italic text-[#fe330a]">Framework.</span>
          </h2>
          <p className="text-base font-sans text-stone-400 mt-4 max-w-2xl mx-auto md:mx-0">
            A submission that does not clear T1 is not judged. This is the floor, not the target. Here is what the platform is built to handle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 md:p-10 rounded-3xl bg-[#11141c]/80 backdrop-blur-sm border border-stone-800/80 shadow-2xl hover:border-stone-700 transition-colors flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fe330a]/5 blur-3xl group-hover:bg-[#fe330a]/10 transition-colors"></div>
            <span className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30 w-fit mb-6">
              Feature 01
            </span>
            <h3 className="text-2xl font-serif text-white mb-3">Automated Normalization</h3>
            <p className="text-sm font-sans text-stone-400 leading-relaxed">
              Every platform says they have it, but none publish how it works. Our judging engine uses standard deviations to aggressively smooth out harsh and lenient judges.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-[#11141c]/80 backdrop-blur-sm border border-stone-800/80 shadow-2xl hover:border-stone-700 transition-colors flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-500/5 blur-3xl group-hover:bg-stone-500/10 transition-colors"></div>
            <span className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-stone-800 text-stone-300 border border-stone-700 w-fit mb-6">
              Feature 02
            </span>
            <h3 className="text-2xl font-serif text-white mb-3">Immutable Submissions</h3>
            <p className="text-sm font-sans text-stone-400 leading-relaxed">
              Draft and edit as much as you want before the deadline. Once the timer hits zero, the payload is locked. Enforcement that actually holds.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-[#11141c]/80 backdrop-blur-sm border border-stone-800/80 shadow-2xl hover:border-stone-700 transition-colors flex flex-col md:col-span-2 group relative overflow-hidden">
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-stone-500/5 blur-[80px] group-hover:bg-stone-500/10 transition-colors"></div>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <div className="flex-1">
                <span className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-stone-800 text-stone-300 border border-stone-700 w-fit mb-6 inline-block">
                  Feature 03
                </span>
                <h3 className="text-2xl font-serif text-white mb-3">Role-Based Assignments</h3>
                <p className="text-sm font-sans text-stone-400 leading-relaxed max-w-xl">
                  A real role model separating participants, judges, organizers, and admins. Judges only see projects assigned to them. Organizers can track reviews live on the dashboard and export the final normalized results via CSV. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
