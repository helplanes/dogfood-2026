import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
            How It <span className="italic font-serif text-[#fe330a]">Works.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-stone-500 mt-4">
            DOGFOOD 2026 GUIDE
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl">
            <h2 className="text-xl font-serif text-white tracking-tight leading-tight mb-3">Participants</h2>
            <p className="text-sm md:text-base font-sans text-stone-400 leading-relaxed">
              Participants can form teams and submit their projects before the deadline. Make sure your repository link and summary are included.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl">
            <h2 className="text-xl font-serif text-white tracking-tight leading-tight mb-3">Judges</h2>
            <p className="text-sm md:text-base font-sans text-stone-400 leading-relaxed">
              Judges will score assigned projects based on functionality, quality, and innovation. Scores are on a 1-5 scale.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl">
            <h2 className="text-xl font-serif text-white tracking-tight leading-tight mb-3">Organizers</h2>
            <p className="text-sm md:text-base font-sans text-stone-400 leading-relaxed">
              Organizers manage the event, oversee the judging process, and can export final results.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/" 
            className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
