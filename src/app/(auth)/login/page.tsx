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
    if (email === "error@example.com") {
      setError("Invalid credentials (simulated 401).");
      return;
    }
    
    // Simulate success
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0e13] p-4 text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans">
      
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#11141c] p-8 border border-stone-800 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <span className="flex h-3 w-3 rounded-full bg-[#fe330a] shadow-[0_0_12px_#fe330a] animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
            Authenticate. <span className="italic text-[#fe330a]">Access.</span>
          </h2>
          <p className="text-sm font-mono text-stone-500 uppercase tracking-widest">
            Identity Verification Required
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* TODO: Login is currently simulated. The real auth API will be wired by Krish soon. */}
          <div className="rounded-xl bg-amber-950/40 p-4 text-xs font-mono text-amber-300 border border-amber-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            TODO: Simulated login flow (real auth API pending).
          </div>
          
          {error && (
            <div className="rounded-xl bg-red-950/40 p-4 text-xs font-mono text-red-300 border border-red-800/50 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-widest text-stone-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-[#0c0e13] border rounded-xl text-sm font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors ${error ? 'border-red-800' : 'border-stone-800/80'}`}
                placeholder="participant@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-[11px] font-mono uppercase tracking-widest text-stone-400">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-[#0c0e13] border rounded-xl text-sm font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors ${error ? 'border-red-800' : 'border-stone-800/80'}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25 focus:outline-none focus:border-white"
            >
              Initialize Session &rarr;
            </button>
            <p className="mt-3 text-center text-[10px] font-sans text-stone-500">
              By continuing, you agree to the Hackathon <Link href="/rules" className="underline hover:text-stone-300">Code of Conduct and Terms</Link>.
            </p>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-stone-800"></div>
            <span className="flex-shrink-0 mx-4 text-stone-600 text-[10px] font-mono uppercase">Or Continue With</span>
            <div className="flex-grow border-t border-stone-800"></div>
          </div>

          <div>
            {/* Note: This is a mocked visual UI only. Runtime external auth is forbidden. */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 px-5 py-3 rounded-xl bg-[#090b10] hover:bg-[#191c20] text-stone-300 text-xs font-mono font-medium border border-stone-800 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub (Offline Mock)
            </button>
          </div>
          
          <div className="text-center pt-2">
            <Link href="/signup" className="text-[11px] font-mono text-stone-500 hover:text-[#fe330a] transition-colors">
              NO IDENTITY? REGISTER HERE
            </Link>
          </div>
        </form>
      </div>
      
    </div>
  );
}
