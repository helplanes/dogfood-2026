"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "/organizer/dashboard",
    label: "Overview",
    href: "/organizer/dashboard",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[#fe330a]" : "text-stone-400 group-hover:text-stone-200"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "/organizer/results",
    label: "Results & Rankings",
    href: "/organizer/results",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[#fe330a]" : "text-stone-400 group-hover:text-amber-400"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5a4 4 0 01-4 4H10a4 4 0 01-4-4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1m12-6h2a2 2 0 012 2v1a3 3 0 01-3 3h-1"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l-1 4m5-4l1 4m-4 0h3" />
      </svg>
    ),
  },
  {
    id: "/organizer/assignments",
    label: "Assignments",
    href: "/organizer/assignments",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[#fe330a]" : "text-stone-400 group-hover:text-sky-400"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "/organizer/rubric",
    label: "Rubric",
    href: "/organizer/rubric",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[#fe330a]" : "text-stone-400 group-hover:text-purple-400"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    id: "/organizer/audit",
    label: "Audit Log",
    href: "/organizer/audit",
    icon: (active) => (
      <svg
        className={`w-4 h-4 transition-colors ${
          active ? "text-[#fe330a]" : "text-stone-400 group-hover:text-[#fe330a]"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export function OrganizerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0c0e14] border-r border-stone-800/80 flex flex-col justify-between select-none shrink-0 sticky top-0">
      {/* ─── 1. Brand Header ─── */}
      <div className="px-6 py-5 border-b border-stone-800/60 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#fe330a]/15 border border-[#fe330a]/40 flex items-center justify-center">
            <span className="h-2 w-2 rounded-sm bg-[#fe330a] shadow-[0_0_10px_#fe330a]" />
          </div>
          <div className="flex items-center gap-1.5 font-mono font-bold tracking-tight text-white text-base">
            <span>DOGFOOD</span>
            <span className="text-[#fe330a]">2026</span>
          </div>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
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
                    ? "bg-[#141822] border border-stone-700/80 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-100 hover:bg-[#11141c] border border-transparent hover:border-stone-800/60"
                }`}
              >
                {/* Active Accent Highlighter Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#fe330a] rounded-r-full shadow-[0_0_10px_#fe330a]" />
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ─── 3. Clean Footer Profile ─── */}
      <div className="p-4 border-t border-stone-800/60 bg-[#0a0c10]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#181c26] border border-stone-700/70 flex items-center justify-center text-xs font-mono font-bold text-stone-300">
              OA
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white tracking-tight">Lead Architect</span>
              <span className="text-[10px] font-mono text-stone-500">org-root@dogfood.io</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <Link
              href="/api/auth/logout"
              title="Lock Session"
              className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-red-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>
            <button
              title="Settings"
              className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
