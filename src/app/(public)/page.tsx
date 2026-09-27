import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center px-8 py-24 text-center max-w-5xl mx-auto border-b border-stone-800/50">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141822] border border-stone-800 text-[11px] font-mono text-stone-400 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a] animate-pulse" />
          <span>PORTAL ONLINE</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-tight">
          DOGFOOD 2026. <br />
          <span className="italic font-serif text-[#fe330a]">Build the platform that will judge you.</span>
        </h1>
        
        <p className="text-sm md:text-base font-sans text-stone-400 leading-relaxed max-w-2xl mx-auto mt-8">
          Welcome to the official portal for submission and judging. Explore verified open-source prototypes and autonomous neural networks built by our teams.
        </p>

        <div className="flex justify-center mt-8 text-[10px] md:text-xs font-mono uppercase tracking-widest text-stone-500 space-x-4">
          <span>Sep 25-28, 2026</span>
          <span>•</span>
          <span>Online</span>
          <span>•</span>
          <span>$2,500 Prizes</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="px-6 py-4 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25 flex items-center justify-center gap-2"
          >
            BROWSE PROJECTS &rarr;
          </Link>
          <Link 
            href="/help" 
            className="px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors flex items-center justify-center"
          >
            How it Works
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-8 py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight">
            The Hackathon <span className="italic text-[#fe330a]">Framework.</span>
          </h2>
          <p className="text-sm font-sans text-stone-400 mt-4 max-w-2xl">
            A submission that does not clear T1 is not judged. This is the floor, not the target. Here is what the platform is built to handle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl flex flex-col">
            <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30 w-fit mb-4">
              Feature 01
            </span>
            <h3 className="text-xl font-serif text-white mb-2">Automated Normalization</h3>
            <p className="text-sm font-sans text-stone-400 leading-relaxed">
              Every platform says they have it, but none publish how it works. Our judging engine uses standard deviations to aggressively smooth out harsh and lenient judges.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl flex flex-col">
            <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-stone-800 text-stone-300 border border-stone-700 w-fit mb-4">
              Feature 02
            </span>
            <h3 className="text-xl font-serif text-white mb-2">Immutable Submissions</h3>
            <p className="text-sm font-sans text-stone-400 leading-relaxed">
              Draft and edit as much as you want before the deadline. Once the timer hits zero, the payload is locked. Enforcement that actually holds.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl flex flex-col md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-stone-800 text-stone-300 border border-stone-700 w-fit mb-4 inline-block">
                  Feature 03
                </span>
                <h3 className="text-xl font-serif text-white mb-2">Role-Based Assignments</h3>
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
