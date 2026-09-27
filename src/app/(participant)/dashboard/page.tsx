"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicProject } from "@/contracts";

export default function ParticipantDashboard() {
  // Static state for now
  const [session, setSession] = useState<{ user: string; role: string } | null>({
    user: "participant@example.com",
    role: "participant",
  });
  
  const [team, setTeam] = useState<{ id: string; name: string } | null>(null);
  
  return (
    <div className="min-h-screen bg-[#111318] text-[#ffffff]">
      <header className="bg-[#191c20] border-b border-[rgba(255,255,255,0.08)] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black uppercase tracking-tight font-['Syne']">DOGFOOD PORTAL</h1>
        <nav className="space-x-4">
          <span className="font-mono text-sm uppercase text-slate-300">{session?.user}</span>
          <button className="font-mono text-sm uppercase text-white hover:text-[#fe330a] transition-colors">Sign Out</button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-['Syne']">Participant Dashboard</h2>
          <p className="mt-2 font-mono text-sm text-slate-400">Welcome to the Hackathon. Complete the steps below to submit your project.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Status Card */}
          <div className="rounded-lg bg-[#ffffff] border border-[#e2e8f0] p-6 text-[#111318]">
            <h3 className="text-lg font-bold uppercase tracking-tight">Team Status</h3>
            {team ? (
              <div className="mt-4">
                <p className="text-sm text-slate-600">You are on team: <strong className="font-mono">{team.name}</strong></p>
                <Link href="/team/invite" className="mt-4 inline-block bg-[#191c20] text-white px-4 py-2 rounded-md text-sm font-bold">Manage Team</Link>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-slate-600">You are not in a team yet. Create or join a team to participate.</p>
                <div className="mt-4 space-x-4">
                  <Link href="/team/create" className="inline-block bg-[#fe330a] hover:bg-[#ff4d26] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors">Create Team</Link>
                  <Link href="/team/join" className="inline-block border border-[#191c20] text-[#191c20] px-4 py-2 rounded-md text-sm font-bold transition-colors hover:bg-slate-50">Join Team</Link>
                </div>
              </div>
            )}
          </div>

          {/* Project Status Card */}
          <div className="rounded-lg bg-[#ffffff] border border-[#e2e8f0] p-6 text-[#111318]">
            <h3 className="text-lg font-bold uppercase tracking-tight">Project Submission</h3>
            {team ? (
              <div className="mt-4">
                <p className="text-sm text-slate-600">Your team has not submitted a project yet.</p>
                <Link href="/dashboard/projects/new" className="mt-4 inline-block bg-[#fe330a] hover:bg-[#ff4d26] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors">Submit Project</Link>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-slate-600">You must be on a team to submit a project.</p>
                <button disabled className="mt-4 bg-slate-200 text-slate-400 px-4 py-2 rounded-md text-sm font-bold cursor-not-allowed">Submit Project</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
