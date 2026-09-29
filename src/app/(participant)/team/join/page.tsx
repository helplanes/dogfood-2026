"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function JoinTeamPage() {
  return (
    <Suspense>
      <JoinTeamForm />
    </Suspense>
  );
}

function JoinTeamForm() {
  const searchParams = useSearchParams();
  const [inviteCode, setInviteCode] = useState(() => searchParams.get("code") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<{ name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (inviteCode.trim().length === 0) {
      setError("Please enter an invite code.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: inviteCode.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Could not join team.");
        return;
      }
      setTeam(body);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4 text-white">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 border border-stone-800">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif tracking-tight mb-2">Join a Team</h2>
        <p className="text-sm text-stone-400 mb-6">Enter the invite code from your team captain.</p>

        {team ? (
          <div className="text-center">
            <div className="rounded-xl bg-emerald-950/40 p-4 text-sm text-emerald-300 border border-emerald-800/50 mb-6">
              Joined &quot;{team.name}&quot;.
            </div>
            <Link href="/dashboard" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-950/40 p-4 text-sm text-red-300 border border-red-800">{error}</div>
            )}

            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-stone-400">
                Invite Code
              </label>
              <input
                id="inviteCode"
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className={`mt-1 block w-full rounded-xl border bg-background py-1.5 px-3 font-mono text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm sm:leading-6 ${error ? 'border-red-800' : 'border-stone-800'}`}
                placeholder="a1b2c3d4e5f6"
              />
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1 text-center border border-stone-700 text-stone-300 px-3 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-stone-800">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-[var(--color-primary)] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-50"
              >
                {submitting ? "Joining…" : "Join"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
