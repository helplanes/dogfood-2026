"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/contracts";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate using the contract
    const result = LoginInput.safeParse({ email, password });
    if (!result.success) {
      setError("Please enter a valid email and password.");
      return;
    }

    // Static implementation (Wait for Krish to wire the real API)
    // Simulating a 401 error as per the "server-error states" requirement
    if (email === "error@example.com") {
      setError("Invalid credentials (simulated 401).");
      return;
    }
    
    // Simulate success
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-white tracking-tight leading-tight">
            Sign In
          </h2>
          <p className="mt-2 text-sm md:text-base font-sans text-stone-400 leading-relaxed">
            Access the DOGFOOD 2026 participant portal.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
              <p className="text-sm font-mono text-red-400">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-widest text-stone-400">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-[#0c0e13] border ${error ? 'border-red-500/50' : 'border-stone-800/80'} rounded-xl text-sm font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors`}
                placeholder="participant@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-[11px] font-mono uppercase tracking-widest text-stone-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-[#0c0e13] border ${error ? 'border-red-500/50' : 'border-stone-800/80'} rounded-xl text-sm font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25 flex items-center justify-center gap-2"
          >
            Sign In &rarr;
          </button>
          
          <div className="text-center mt-6">
            <Link href="/signup" className="text-sm font-sans text-stone-500 hover:text-stone-300 transition-colors">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
