"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ParticipantDashboard() {
  const router = useRouter();
  // Static state for now
  const [session, setSession] = useState<{ user: string; role: string } | null>({
    user: "participant@example.com",
    role: "participant",
  });
  
  const [team, setTeam] = useState<{ id: string; name: string; members: { email: string, role: string, status: string }[] } | null>(null);

  // Mock countdown timer setup (static for display, could be dynamic later)
  const [timeLeft, setTimeLeft] = useState("14h : 22m : 05s");

  useEffect(() => {
    const mockTeam = localStorage.getItem('mock_team');
    if (mockTeam) {
      setTeam({ 
        id: 'tm_mock', 
        name: mockTeam, 
        members: [
          { email: "participant@example.com", role: "Leader", status: "Accepted" },
          { email: "hacker2@example.com", role: "Member", status: "Accepted" },
          { email: "coder3@example.com", role: "Member", status: "Pending Invite" }
        ] 
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('mock_team');
    router.push('/login');
  };
  
  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 border-b border-stone-800/80 bg-[#11141c]/90">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-stone-800 pr-6">
            <span className="text-white font-black font-serif text-xl tracking-tight">DOGFOOD<span className="italic text-[#fe330a]">2026</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
            <span className="text-stone-300 font-semibold font-mono tracking-wider text-xs hidden sm:inline-block">PARTICIPANT TERMINAL</span>
          </div>
        </div>
        <nav className="flex items-center gap-6 relative group">
          <button className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#191c20] border border-stone-800 hover:border-stone-600 transition-colors">
            <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-xs font-bold text-white uppercase">
              {session?.user.charAt(0)}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-stone-300 hidden md:inline-block">{session?.user.split('@')[0]}</span>
            <span className="text-stone-500 text-[10px]">▼</span>
          </button>
          
          {/* Dropdown Menu (Visible on hover) */}
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#11141c] border border-stone-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-3 border-b border-stone-800/80">
              <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Signed In As</p>
              <p className="text-xs font-mono text-stone-300 truncate mt-1">{session?.user}</p>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <button className="text-left px-3 py-2 text-xs font-mono text-stone-400 hover:text-white hover:bg-stone-900 rounded-md transition-colors">Profile & Settings</button>
              <button className="text-left px-3 py-2 text-xs font-mono text-stone-400 hover:text-white hover:bg-stone-900 rounded-md transition-colors">Switch Team</button>
            </div>
            <div className="p-2 border-t border-stone-800/80">
              <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-xs font-mono text-[#fe330a] hover:bg-[#fe330a]/10 rounded-md transition-colors">Sign Out &rarr;</button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full flex-grow flex flex-col">
        {/* Title and Timeline/Countdown Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Participant <span className="italic text-[#fe330a]">Dashboard.</span>
            </h2>
            <p className="mt-3 text-sm md:text-base font-sans text-stone-400 leading-relaxed max-w-2xl">
              Welcome to the DOGFOOD 2026 hackathon. Form your autonomous quorum and submit your protocol before the deadline.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141822] border border-stone-800 text-[11px] font-mono text-stone-400">
              <span className="text-stone-500">HACKING &rarr;</span>
              <span className="text-stone-100 font-bold">SOFT DEADLINE</span>
              <span className="text-stone-500">&rarr; JUDGING &rarr; RESULTS</span>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#11141c] border border-[#fe330a]/40 shadow-[0_0_15px_rgba(254,51,10,0.1)]">
              <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-pulse" />
              <span className="font-mono text-sm tracking-widest text-white font-bold">{timeLeft} REMAINING</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
          
          {/* Main Content Area (Cards) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
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
                      
                      <div className="mt-4">
                        <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3">Registered Members</p>
                        <ul className="space-y-3">
                          {team.members.map((member, idx) => (
                            <li key={idx} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-mono text-stone-300 flex items-center gap-2 before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#fe330a]">
                                  {member.email}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${member.role === 'Leader' ? 'bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30' : 'bg-stone-800 text-stone-300 border border-stone-700'}`}>
                                  {member.role}
                                </span>
                              </div>
                              <div className="pl-3.5 flex items-center gap-1.5">
                                <span className={`text-[9px] font-mono uppercase tracking-wider ${member.status === 'Accepted' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                  {member.status === 'Pending Invite' ? '⏳ Pending' : '✓ Verified'}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
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
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                      <span className={`w-2 h-2 rounded-sm ${team ? 'bg-amber-500/50' : 'bg-red-500/50'}`} />
                      PROJECT SUBMISSION
                    </div>
                    {team && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                        DRAFT
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Protocol Deployment</h3>
                  
                  {team ? (
                    <div className="space-y-4">
                      <p className="text-sm font-sans text-stone-400">
                        Your quorum has not submitted a finalized project. Ensure all telemetry and schemas are ready before deployment.
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-[#141822] border border-stone-800/80">
                        <p className="text-xs font-mono text-stone-500 mb-1">CURRENT STATUS:</p>
                        <p className="text-sm font-mono text-stone-300">Awaiting Submission Payload</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-sans text-stone-400">
                      A verified team identity is cryptographically required before deployment can be authorized.
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/80">
                  {team ? (
                    <Link href="/dashboard/projects/new" className="inline-flex px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25">
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
          </div>

          {/* Sidebar / Checklist Context */}
          <div className="lg:col-span-1">
            <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl h-full">
              <h3 className="text-lg font-serif text-white mb-4 border-b border-stone-800/80 pb-4">Submission Checklist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Account Verified</p>
                    <p className="text-[11px] font-sans text-stone-500 mt-1">Your identity is cryptographically secured.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-0.5 font-bold ${team ? 'text-emerald-500' : 'text-stone-600'}`}>{team ? '✓' : '○'}</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Form Quorum Alliance</p>
                    <p className="text-[11px] font-sans text-stone-500 mt-1">Create or join a team with at least 1 member.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <span className="mt-0.5 text-stone-600 font-bold">○</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Repository Recon</p>
                    <p className="text-[11px] font-sans text-stone-500 mt-1">Include a valid, public GitHub repository link.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <span className="mt-0.5 text-stone-600 font-bold">○</span>
                  <div>
                    <p className="text-sm font-mono text-stone-200">Final Deployment</p>
                    <p className="text-[11px] font-sans text-stone-500 mt-1">Submit before the Soft Deadline closes.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-stone-800/80">
                <Link href="/help" className="text-[11px] font-mono uppercase tracking-widest text-[#fe330a] hover:text-[#ff4922] transition-colors">
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
