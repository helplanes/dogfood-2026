"use client";

import { useState } from "react";
import Link from "next/link";

export default function InviteTeamPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (email === "error@example.com") {
      setError("This user is already on another team.");
      return;
    }

    // Static success simulation
    setSuccess(true);
    setEmail(""); // clear for next invite
  };

  return (
    <div className="min-h-screen bg-[#111318] flex items-center justify-center p-4 text-[#111318]">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg p-8 border border-[#e2e8f0]">
        <h2 className="text-2xl font-black uppercase tracking-tight font-['Syne'] mb-2">Invite Members</h2>
        <p className="text-sm text-slate-600 mb-6">Invite others to join your team.</p>

        {success && (
          <div className="rounded-md bg-green-50 p-4 text-sm text-[#22c55e] border border-[#22c55e] mb-6">
            Invitation sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-[#ba1a1a] border border-[#ba1a1a]">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600">
              Member Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => { setSuccess(false); setEmail(e.target.value); }}
              className={`mt-1 block w-full rounded-md border bg-white py-1.5 px-3 text-[#111318] placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] sm:text-sm sm:leading-6 ${error ? 'border-[#ba1a1a]' : 'border-[#e2e8f0]'}`}
              placeholder="friend@example.com"
            />
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1 text-center border border-[#191c20] text-[#191c20] px-3 py-2 rounded-md text-sm font-bold transition-colors hover:bg-slate-50">
              Back
            </Link>
            <button
              type="submit"
              className="flex-1 rounded-md bg-[#fe330a] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ff4d26] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#fe330a]"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
