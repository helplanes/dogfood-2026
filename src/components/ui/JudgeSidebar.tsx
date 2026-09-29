"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoutButton } from "@/components/ui/LogoutButton";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "/judge/dashboard",
    label: "Dashboard",
    href: "/judge/dashboard",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[var(--color-primary)]" : "text-stone-400 group-hover:text-stone-200"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
       aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "/judge/guidelines",
    label: "Guidelines",
    href: "/judge/guidelines",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[var(--color-primary)]" : "text-stone-400 group-hover:text-amber-400"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
       aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export function JudgeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-surface border-r border-stone-800/80 flex flex-col justify-between select-none shrink-0 sticky top-0">
      {/* ─── 1. Brand Header ─── */}
      <div className="px-6 py-5 border-b border-stone-800/60 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 flex items-center justify-center">
            <span className="h-2 w-2 rounded-sm bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
          </div>
          <div className="flex items-center gap-1.5 font-mono font-bold tracking-tight text-white text-base">
            <span>DOGFOOD</span>
            <span className="text-[var(--color-primary)]">2026</span>
          </div>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          JUDGE
        </span>
      </div>

      {/* ─── 2. Core Navigation List ─── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-surface-hover border border-stone-700/80 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-100 hover:bg-surface border border-transparent hover:border-stone-800/60"
                }`}
              >
                {/* Active Accent Highlighter Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[var(--color-primary)] rounded-r-full shadow-[0_0_10px_var(--color-primary)]" />
                )}
                <div className="flex items-center gap-3">
                  <span>{item.icon(isActive)}</span>
                  <span
                    className={`text-sm tracking-tight ${
                      isActive ? "font-semibold text-white" : "font-medium text-stone-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {/* Subtle active glow pill */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ─── 3. Clean Footer Profile ─── */}
      <div className="p-4 border-t border-stone-800/60 bg-background/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-hover border border-stone-700/70 flex items-center justify-center text-xs font-mono font-bold text-stone-300">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white tracking-tight">Evaluator</span>
              <span className="text-[10px] font-mono text-stone-500">judge-pool@dogfood.io</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <ThemeToggle />
            <LogoutButton
              className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-red-400 transition-colors"
            >
              <span className="sr-only">Log out</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </LogoutButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
