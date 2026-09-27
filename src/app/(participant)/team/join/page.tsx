"use client";

import { useState } from "react";
import Link from "next/link";

export default function JoinTeamPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (inviteCode.length < 6) {
      setError("Please enter a valid 6-character invite code.");
      return;
    }

    if (inviteCode === "ERROR1") {
      setError("Invalid invite code or team does not exist.");
      return;
    }

    // Static success simulation
    localStorage.setItem('mock_team', 'Joined Team');
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0e13] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-[#11141c] rounded-2xl shadow-xl p-8 border border-stone-800">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif tracking-tight mb-2">Join a Team</h2>
        <p className="text-sm text-stone-400 mb-6">Enter the invite code from your team captain.</p>

        {success ? (
          <div className="text-center">
            <div className="rounded-xl bg-green-50 p-4 text-sm text-[#22c55e] border border-[#22c55e] mb-6">
              Successfully joined the team!
            </div>
            <Link href="/dashboard" className="bg-[#fe330a] hover:bg-[#ff4922] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-950/40 p-4 text-sm text-red-300 border border-red-800">
                {error}
              </div>
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
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className={`mt-1 block w-full rounded-xl border bg-[#0c0e13] py-1.5 px-3 font-mono text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] sm:text-sm sm:leading-6 ${error ? 'border-red-800' : 'border-stone-800'}`}
                placeholder="X7Y9ZA"
                maxLength={6}
              />
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1 text-center border border-stone-700 text-stone-300 px-3 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-stone-800">
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#fe330a] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ff4922] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#fe330a]"
              >
                Join
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
