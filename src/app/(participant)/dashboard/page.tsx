"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Team {
  id: string;
  name: string;
  inviteCode: string | null;
  members: string[];
}

interface EventStatus {
  submissionsOpen: boolean;
}

export default function ParticipantDashboard() {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null | undefined>(undefined); // undefined = loading
  const [event, setEvent] = useState<EventStatus | null>(null);

  useEffect(() => {
    fetch("/api/teams/me")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((body) => body && setTeam(body.team))
      .catch(() => setTeam(null));

    fetch("/api/event")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => body && setEvent(body))
      .catch(() => {});
  }, [router]);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-[var(--color-primary)]/30 selection:text-white font-sans flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 border-b border-stone-800/80 bg-surface/90">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-stone-800 pr-6">
            <span className="text-white font-black font-serif text-xl tracking-tight">DOGFOOD<span className="italic text-[var(--color-primary)]">2026</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
            <span className="text-stone-300 font-semibold font-mono tracking-wider text-xs hidden sm:inline-block">PARTICIPANT DASHBOARD</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full flex-grow flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Participant <span className="italic text-[var(--color-primary)]">Dashboard.</span>
            </h2>
            <p className="mt-3 text-sm md:text-base font-sans text-stone-400 leading-relaxed max-w-2xl">
              Form your team and submit your project before the deadline.
            </p>
          </div>

          {event ? (
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-surface border shadow-sm ${event.submissionsOpen ? "border-emerald-800/50" : "border-red-800/50"}`}>
              <span className={`h-2 w-2 rounded-full ${event.submissionsOpen ? "bg-emerald-500" : "bg-red-500"}`} />
              <span className="font-mono text-sm tracking-widest text-white font-bold">
                {event.submissionsOpen ? "SUBMISSIONS OPEN" : "SUBMISSIONS CLOSED"}
              </span>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="p-6 md:p-8 rounded-2xl bg-surface border border-stone-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-sm bg-emerald-500/50" />
                    TEAM STATUS
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Your Team</h3>

                  {team === undefined ? (
                    <p className="text-sm font-sans text-stone-500">Loading…</p>
                  ) : team ? (
                    <div className="space-y-4">
                      <p className="text-sm font-sans text-stone-400">
                        Team: <strong className="font-mono text-stone-200 ml-2">{team.name}</strong>
                      </p>
                      <div className="mt-4">
                        <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3">
                          Members ({team.members.length})
                        </p>
                        <ul className="space-y-2">
                          {team.members.map((email) => (
                            <li key={email} className="text-sm font-mono text-stone-300 flex items-center gap-2 before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-primary)]">
                              {email}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-sans text-stone-400">You&apos;re not on a team yet. Create or join one to submit a project.</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/80">
                  {team ? (
                    <Link href="/team/invite" className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
                      Invite Members &rarr;
                    </Link>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      <Link href="/team/create" className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[var(--color-primary)]/25">
                        Create Team &rarr;
                      </Link>
                      <Link href="/team/join" className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
                        Join Team
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-surface border border-stone-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                    <span className={`w-2 h-2 rounded-sm ${team ? "bg-amber-500/50" : "bg-red-500/50"}`} />
                    PROJECT SUBMISSION
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Submit Your Project</h3>
                  {team ? (
                    <p className="text-sm font-sans text-stone-400">
                      Submit before the deadline. You can submit once the event is open.
                    </p>
                  ) : (
                    <p className="text-sm font-sans text-stone-400">Join a team before you can submit a project.</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/80">
                  {team ? (
                    <Link href="/dashboard/projects/new" className="inline-flex px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[var(--color-primary)]/25">
                      Submit Project &rarr;
                    </Link>
                  ) : (
                    <button disabled className="px-5 py-2.5 rounded-xl bg-background border border-stone-800 text-stone-600 text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
                      Locked
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 md:p-8 rounded-2xl bg-surface border border-stone-800 shadow-xl h-full">
              <h3 className="text-lg font-serif text-white mb-4 border-b border-stone-800/80 pb-4">Submission Checklist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Account created</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-0.5 font-bold ${team ? "text-emerald-500" : "text-stone-600"}`}>{team ? "✓" : "○"}</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Form or join a team</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <span className="mt-0.5 text-stone-600 font-bold">○</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Include a public GitHub repository link</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <span className="mt-0.5 text-stone-600 font-bold">○</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Submit before the deadline</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-stone-800/80">
                <Link href="/help" className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
                  Read Hackathon Rules &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
