"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/contracts";
import screenImg from "@/components/images/screen.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = LoginInput.safeParse({ email, password });
    if (!result.success) {
      setError("Please enter a valid email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        setError(body.error ?? "Invalid credentials.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedRole(val);
    if (!val) return;
    document.cookie = `session=${val}; path=/`;
    if (val === "org_7f2a") router.push("/organizer/dashboard");
    else if (val.startsWith("jdg")) router.push("/judge/dashboard");
    else router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-stone-100 font-sans selection:bg-[var(--color-primary)]/30 overflow-x-hidden">
      {/* ─── GLOBAL TOP PROTOCOL BAR ─── */}
      <header className="w-full flex items-center justify-between px-6 lg:px-12 py-4 border-b border-stone-800/60 bg-[#08090d]/80 backdrop-blur-md z-30">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 flex items-center justify-center">
            <span className="h-2 w-2 rounded-sm bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold tracking-tight text-white text-base">DOGFOOD</span>
            <span className="font-mono text-[var(--color-primary)] font-bold text-base">2026</span>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-stone-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          &larr; Back to Overview
        </Link>
      </header>

      {/* ─── MAIN SPLIT WORKSPACE CONTAINER ─── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-stone-800/80 bg-[#0c0e14] shadow-2xl overflow-hidden min-h-[640px]">
          {/* ─── LEFT COLUMN: Engineering Squad War Room ─── */}
          <div className="hidden lg:flex lg:col-span-7 relative flex-col justify-between p-10 xl:p-12 border-r border-stone-800/80 overflow-hidden">
            {/* Cinematic Telemetry Background (Offline-compliant using local image) */}
            <div className="absolute inset-0 z-0 bg-[#08090d]">
              <Image
                src={screenImg}
                alt="Engineering Squad War Room"
                fill
                className="object-cover object-center opacity-35 filter brightness-75 contrast-125 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0c0e14]/40 to-[#0c0e14]" />
              <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            </div>

            {/* Middle Motivational Quote */}
            <div className="relative z-10 flex-1 flex items-center">
              <div className="max-w-lg space-y-5 px-2 -mt-12">
                <div className="w-10 h-0.5 bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
                <h3 className="text-2xl xl:text-3xl font-serif text-white leading-[1.4] font-medium drop-shadow-xl">
                  "Build the ultimate offline experience. No crutches, no cloud, just pure engineering."
                </h3>
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                  — The Dogfood 2026 Mandate
                </p>
              </div>
            </div>

            {/* Bottom Hero Narrative */}
            <div className="relative z-10 space-y-6">
              <div className="p-6 rounded-2xl bg-[#08090d]/80 border border-stone-800/70 backdrop-blur-md space-y-2 max-w-lg">
                <h1 className="text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                  DOGFOOD <span className="text-[var(--color-primary)]">2026</span>
                </h1>
                <p className="text-stone-400 font-sans text-xs leading-relaxed">
                  The portal is waiting for you. Enter the enclave to submit, review, and evaluate projects offline.
                </p>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Enterprise Authentication Form (5 cols) ─── */}
          <div className="lg:col-span-5 flex items-center justify-center p-8 sm:p-12 bg-[#0c0e14] relative">
            <div className="w-full max-w-md space-y-7">
              {/* Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                  AUTHENTICATION REQUIRED
                </span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                  Welcome back
                </h2>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Sign in to access your dashboard.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-xl bg-red-950/40 p-3.5 text-xs font-mono text-red-300 border border-red-800/50 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1.5 group">
                    <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 bg-[#11131a] border rounded-xl text-xs font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/40 transition-all ${error ? "border-red-800/50" : "border-stone-800"}`}
                        placeholder="participant@example.com"
                      />
                      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-stone-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5 group">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                        PASSWORD
                      </label>
                      <button type="button" className="text-[10px] font-mono text-stone-500 hover:text-stone-300 transition-colors">
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 bg-[#11131a] border rounded-xl text-xs font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/40 transition-all ${error ? "border-red-800/50" : "border-stone-800"}`}
                        placeholder="••••••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3.5 flex items-center text-stone-500 hover:text-stone-300 transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#202530] hover:bg-[#282e3c] border border-stone-700/60 text-stone-200 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:text-white cursor-pointer disabled:opacity-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  >
                    <span>{submitting ? "INITIALIZING SESSION..." : "INITIALIZE SESSION →"}</span>
                  </button>
                </div>
                
                {/* Developer Access / Quick-Switch Demo Profile */}
                <div className="pt-5 border-t border-stone-800/80 relative space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                      QUICK-SWITCH DEMO PROFILE
                    </span>
                  </div>
                  <div className="relative group">
                    <select
                      value={selectedRole}
                      onChange={handleRoleChange}
                      className="w-full appearance-none bg-[#11131a] border border-stone-800 text-stone-300 text-xs font-mono px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer hover:border-stone-700 font-medium"
                    >
                      <option value="">Pick the role</option>
                      <option value="org_7f2a">Organizer // Admin</option>
                      <option value="jdg_a_91bc">Juror // Profile A (Double-Blind)</option>
                      <option value="jdg_b_44de">Juror // Profile B (Light Queue)</option>
                      <option value="prt_2e88">Participant // Sandbox Builder</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-xs text-stone-500">
                      ▾
                    </div>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center pt-2">
                  <Link href="/signup" className="text-[11px] font-mono text-stone-400 hover:text-white transition-colors">
                    NO IDENTITY? <span className="underline decoration-stone-600 underline-offset-4 font-bold text-stone-300">REGISTER HERE</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
