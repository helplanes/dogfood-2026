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
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#111318] flex items-center justify-center p-4 text-[#111318]">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg p-8 border border-[#e2e8f0]">
        <h2 className="text-2xl font-black uppercase tracking-tight font-['Syne'] mb-2">Join a Team</h2>
        <p className="text-sm text-slate-600 mb-6">Enter the invite code from your team captain.</p>

        {success ? (
          <div className="text-center">
            <div className="rounded-md bg-green-50 p-4 text-sm text-[#22c55e] border border-[#22c55e] mb-6">
              Successfully joined the team!
            </div>
            <Link href="/dashboard" className="bg-[#fe330a] hover:bg-[#ff4d26] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors inline-block">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-[#ba1a1a] border border-[#ba1a1a]">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-slate-600">
                Invite Code
              </label>
              <input
                id="inviteCode"
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className={`mt-1 block w-full rounded-md border bg-white py-1.5 px-3 font-mono text-[#111318] placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] sm:text-sm sm:leading-6 ${error ? 'border-[#ba1a1a]' : 'border-[#e2e8f0]'}`}
                placeholder="X7Y9ZA"
                maxLength={6}
              />
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1 text-center border border-[#191c20] text-[#191c20] px-3 py-2 rounded-md text-sm font-bold transition-colors hover:bg-slate-50">
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 rounded-md bg-[#fe330a] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ff4d26] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#fe330a]"
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
