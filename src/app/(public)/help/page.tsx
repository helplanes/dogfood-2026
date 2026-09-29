export default function HelpPage() {
  const faqs = [
    {
      q: "What is DOGFOOD 2026?",
      a: "DOGFOOD 2026 is an internal, zero-dependency hackathon portal designed to stress-test our offline capabilities. Teams will build, submit, and judge projects entirely locally."
    },
    {
      q: "When is the submission deadline?",
      a: "All projects must be submitted by the strict deadline. Check your dashboard for the exact countdown. Once the deadline passes, submissions are locked globally."
    },
    {
      q: "How does judging work?",
      a: "Judges are assigned specific tracks. Scores are normalized across all judges using z-score shrinkage to prevent harsh graders from tanking a project's chances."
    },
    {
      q: "I forgot my password!",
      a: "Because this is a demo environment, there are no passwords. Use the magic session cookies provided in the fixtures to authenticate as a Judge, Organizer, or Participant."
    }
  ];

  return (
    <main className="min-h-screen bg-background p-8 md:p-16 lg:px-32 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white tracking-tight">
            Help & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Resources</span>
          </h1>
          <p className="text-stone-400 font-mono text-sm max-w-xl mx-auto">
            Everything you need to know to navigate the hackathon portal, submit your projects, and understand the judging rubrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="group relative p-6 rounded-2xl bg-surface border border-stone-800/60 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-syne text-xl text-white font-bold mb-3 relative z-10">{faq.q}</h3>
              <p className="text-stone-400 font-sans text-sm leading-relaxed relative z-10">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
