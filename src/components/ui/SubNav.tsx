"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SubNavLink {
  name: string;
  href: string;
}

export function SubNav({ links }: { links: SubNavLink[] }) {
  const pathname = usePathname();

  return (
    <div className="w-full bg-background border-b border-stone-800/80 sticky top-[61px] z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
        {links.map((link) => {
          // Exact match is safer for root dashboard routes to prevent false positives
          const isActive = 
            pathname === link.href || 
            (pathname?.startsWith(link.href) && link.href !== '/organizer/dashboard' && link.href !== '/judge/dashboard');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 font-bold shadow-[0_0_8px_rgba(254,51,10,0.1)]"
                  : "text-stone-400 hover:text-stone-200 hover:bg-surface border border-transparent"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
