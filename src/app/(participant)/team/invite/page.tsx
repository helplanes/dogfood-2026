"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TeamInfo {
  id: string;
  name: string;
  inviteCode: string | null;
  members: string[];
}

export default function InviteTeamPage() {
  const [team, setTeam] = useState<TeamInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/teams/me")
      .then((res) => (res.ok ? res.json() : { team: null }))
      .then((body) => {
        setTeam(body.team);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const link = team?.inviteCode && typeof window !== "undefined"
    ? `${window.location.origin}/team/join?code=${team.inviteCode}`
    : null;

  function copy() {
    if (!link) return;
    navigator.clipboard?.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 border border-stone-800">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif tracking-tight mb-2">Invite Members</h2>
        <p className="text-sm text-stone-400 mb-6">Share this link with teammates. They&apos;ll join instantly.</p>

        {loading ? (
          <div className="text-sm text-stone-500 font-mono">Loading…</div>
        ) : !team ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-amber-950/40 p-4 text-sm text-amber-300 border border-amber-800/50">
              You&apos;re not on a team yet.
            </div>
            <Link href="/team/create" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
              Create a Team
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl bg-background p-4 border border-stone-800 space-y-2">
              <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider">{team.name}</span>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={link ?? ""}
                  className="flex-1 px-3 py-2 rounded-lg bg-surface border border-stone-800 text-xs font-mono text-stone-300"
                />
                <button
                  onClick={copy}
                  className="px-3 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-mono font-bold"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-2">Members ({team.members.length})</span>
              <ul className="space-y-1 text-sm text-stone-300 font-mono">
                {team.members.map((email) => (
                  <li key={email}>{email}</li>
                ))}
              </ul>
            </div>

            <Link href="/dashboard" className="block text-center border border-stone-700 text-stone-300 px-3 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-stone-800">
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
