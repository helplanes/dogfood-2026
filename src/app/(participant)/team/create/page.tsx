"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (teamName.length < 3) {
      setError("Team name must be at least 3 characters.");
      return;
    }

    // Static success simulation
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#111318] flex items-center justify-center p-4 text-[#111318]">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg p-8 border border-[#e2e8f0]">
        <h2 className="text-2xl font-black uppercase tracking-tight font-['Syne'] mb-2">Create a Team</h2>
        <p className="text-sm text-slate-600 mb-6">Start a new team and invite your friends to join.</p>

        {success ? (
          <div className="text-center">
            <div className="rounded-md bg-green-50 p-4 text-sm text-[#22c55e] border border-[#22c55e] mb-6">
              Team "{teamName}" created successfully!
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
              <label htmlFor="teamName" className="block text-sm font-medium text-slate-600">
                Team Name
              </label>
              <input
                id="teamName"
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className={`mt-1 block w-full rounded-md border bg-white py-1.5 px-3 text-[#111318] placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] sm:text-sm sm:leading-6 ${error ? 'border-[#ba1a1a]' : 'border-[#e2e8f0]'}`}
                placeholder="Awesome Hackers"
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
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
