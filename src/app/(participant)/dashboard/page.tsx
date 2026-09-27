"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicProject } from "@/contracts";

export default function ParticipantDashboard() {
  const router = useRouter();
  // Static state for now
  const [session, setSession] = useState<{ user: string; role: string } | null>({
    user: "participant@example.com",
    role: "participant",
  });
  
  const [team, setTeam] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const mockTeam = localStorage.getItem('mock_team');
    if (mockTeam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTeam({ id: 'tm_mock', name: mockTeam });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('mock_team');
    router.push('/login');
  };
  
  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 border-b border-stone-800/80 bg-[#11141c]/90">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
          <span className="text-stone-300 font-semibold font-mono tracking-wider text-xs">PARTICIPANT TERMINAL</span>
        </div>
        <nav className="flex items-center gap-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">{session?.user}</span>
          <button onClick={handleSignOut} className="font-mono text-[11px] uppercase tracking-widest text-stone-300 hover:text-[#fe330a] transition-colors border border-stone-700 px-3 py-1.5 rounded-lg bg-stone-900">Sign Out &rarr;</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Participant <span className="italic text-[#fe330a]">Dashboard.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base font-sans text-stone-400 leading-relaxed max-w-2xl">
            Welcome to the DOGFOOD 2026 hackathon. Form your autonomous quorum and submit your protocol before the deadline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Status Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-sm bg-emerald-500/50" />
                TEAM STATUS
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Quorum Alliance</h3>
              
              {team ? (
                <div className="space-y-4">
                  <p className="text-sm font-sans text-stone-400">
                    Your authenticated team designation: <strong className="font-mono text-stone-200 ml-2">{team.name}</strong>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-sans text-stone-400">
                    You are isolated. Form or join a team to begin project compilation.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80">
              {team ? (
                <Link href="/team/invite" className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
                  Manage Team &rarr;
                </Link>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <Link href="/team/create" className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25">
                    Create Team &rarr;
                  </Link>
                  <Link href="/team/join" className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
                    Join Team
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Project Status Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                <span className={`w-2 h-2 rounded-sm ${team ? 'bg-amber-500/50' : 'bg-red-500/50'}`} />
                PROJECT SUBMISSION
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Protocol Deployment</h3>
              
              {team ? (
                <p className="text-sm font-sans text-stone-400">
                  Your quorum has not submitted a finalized project. Ensure all telemetry and schemas are ready before deployment.
                </p>
              ) : (
                <p className="text-sm font-sans text-stone-400">
                  A verified team identity is cryptographically required before deployment can be authorized.
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80">
              {team ? (
                <Link href="/dashboard/projects/new" className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25">
                  Initialize Deployment &rarr;
                </Link>
              ) : (
                <button disabled className="px-5 py-2.5 rounded-xl bg-[#090b10] border border-stone-800 text-stone-600 text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
                  Deployment Locked
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
