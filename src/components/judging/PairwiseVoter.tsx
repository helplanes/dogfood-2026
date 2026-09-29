"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  summary: string;
  repoUrl: string | null;
  track: string | null;
}

export function PairwiseVoter() {
  const [pair, setPair] = useState<{ a: Project; b: Project } | null | undefined>(undefined);
  const [voting, setVoting] = useState(false);
  const [votedCount, setVotedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function loadNext() {
    return fetch("/api/judge/pairwise/next")
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load comparisons (HTTP ${res.status}).`);
        return res.json();
      })
      .then((body) => setPair(body.pair))
      .catch((cause) => {
        setError(cause instanceof Error ? cause.message : "Could not load comparisons.");
        setPair(null);
      });
  }

  useEffect(() => {
    loadNext();
  }, []);

  async function vote(winnerId: string) {
    if (!pair) return;
    setVoting(true);
    setError(null);
    try {
      const res = await fetch("/api/judge/pairwise/vote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectAId: pair.a.id, projectBId: pair.b.id, winnerId }),
      });
      if (!res.ok) throw new Error(`Could not save vote (HTTP ${res.status}).`);
      setVotedCount((n) => n + 1);
      await loadNext();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save vote.");
    } finally {
      setVoting(false);
    }
  }

  if (pair === undefined) {
    return <p className="text-sm font-mono text-stone-500">Loading…</p>;
  }

  if (pair === null && !error) {
    return (
      <div className="rounded-2xl bg-surface border border-stone-800 p-12 text-center space-y-2">
        <p className="text-lg font-syne text-white">All done</p>
        <p className="text-sm text-stone-400 font-sans">
          You&apos;ve compared every pair available to you{votedCount > 0 ? ` (${votedCount} vote${votedCount === 1 ? "" : "s"} this session)` : ""}.
        </p>
      </div>
    );
  }

  if (pair === null) {
    return <p role="alert" className="text-sm font-mono text-red-400">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {error && <p role="alert" className="text-sm font-mono text-red-400">{error}</p>}
      <p className="text-xs font-mono text-stone-500 uppercase tracking-widest text-center">Which project is stronger?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[pair.a, pair.b].map((p) => (
          <button
            key={p.id}
            onClick={() => vote(p.id)}
            disabled={voting}
            className="text-left p-6 rounded-2xl bg-surface border border-stone-800 hover:border-primary hover:shadow-lg transition-all disabled:opacity-50 space-y-3"
          >
            {p.track ? (
              <span className="inline-block px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-stone-900 border border-stone-700 text-stone-300">
                {p.track}
              </span>
            ) : null}
            <h3 className="text-xl font-syne font-bold text-white">{p.title}</h3>
            <p className="text-sm text-stone-400 font-sans line-clamp-4">{p.summary}</p>
            <span className="block pt-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
              Pick this one &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
