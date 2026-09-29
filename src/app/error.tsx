"use client"; // error.tsx is always a Client Component boundary — required by Next.js.

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-stone-100 flex flex-col items-center justify-center px-4 text-center font-sans">
      <span className="text-xs font-mono uppercase tracking-widest text-red-400">Error</span>
      <h1 className="mt-3 text-4xl font-syne font-bold text-white">Something went wrong</h1>
      <p className="mt-3 text-sm text-stone-400 max-w-md">
        This has been logged. You can try again, or reload the page.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
