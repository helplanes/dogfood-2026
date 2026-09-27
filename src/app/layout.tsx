import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "DOGFOOD Portal" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#111318] text-[#f8f9fc] flex flex-col">
        {/* App Header — DESIGN-4-HYBRID §3: surface-low bg, border-dark divider */}
        <header className="bg-[#191c20] border-b border-white/[0.08] py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo: Syne bold uppercase */}
            <a
              href="/"
              className="font-black uppercase tracking-tight text-xl text-white hover:text-[#fe330a] transition-colors"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}
            >
              DOGFOOD 2026
            </Link>
            {/* Nav: JetBrains Mono, small, uppercase, white → orange-red on hover */}
            <nav className="flex items-center gap-6">
              <a
                href="/projects"
                className="text-xs font-mono uppercase tracking-widest text-white hover:text-[#fe330a] transition-colors"
              >
                Gallery
              </Link>
              <a
                href="/judge/dashboard"
                className="text-xs font-mono uppercase tracking-widest text-white hover:text-[#fe330a] transition-colors"
              >
                Judge
              </Link>
              {/* Future nav items: /dashboard, /organizer */}
            </nav>
          </div>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
