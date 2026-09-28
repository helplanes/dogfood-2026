"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function GlobalNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Gallery", href: "/projects" },
    { name: "Judge", href: "/judge/dashboard" },
    { name: "Organizer", href: "/organizer/dashboard" },
  ];

  return (
    <nav className="flex items-center p-1 rounded-xl bg-surface border border-stone-800 text-xs font-mono">
      {navItems.map((item) => {
        // Simple active check. If we are on /projects/123, /projects is still active.
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`px-4 py-1.5 rounded-lg transition-all uppercase tracking-wider ${
              isActive
                ? "bg-stone-800/80 text-white font-bold shadow-sm border border-stone-700/50"
                : "text-stone-400 hover:text-white hover:bg-stone-800/50"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
