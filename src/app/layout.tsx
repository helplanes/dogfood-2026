import Link from "next/link";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb-mono" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "700", "800"] });

export const metadata = { title: "DOGFOOD Portal" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbMono.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-[#0c0e13] text-[#f8f9fc] flex flex-col font-sans selection:bg-[#fe330a]/30">
        
        {/* Global App Header */}
        <header className="sticky top-0 z-50 bg-[#0c0e13]/90 backdrop-blur-md border-b border-stone-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-2 w-2 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a] group-hover:shadow-[0_0_12px_#fe330a] transition-all" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-syne font-bold tracking-tight text-white text-lg">DOGFOOD</span>
                <span className="font-syne italic font-bold text-[#fe330a] text-lg leading-none">2026</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center p-1 rounded-xl bg-[#121620] border border-stone-800 text-xs font-mono">
              <Link
                href="/projects"
                className="px-4 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/50 transition-all uppercase tracking-wider"
              >
                Gallery
              </Link>
              <Link
                href="/judge/dashboard"
                className="px-4 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/50 transition-all uppercase tracking-wider"
              >
                Judge
              </Link>
              <Link
                href="/organizer/dashboard"
                className="px-4 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/50 transition-all uppercase tracking-wider"
              >
                Organizer
              </Link>
            </nav>

            <Link
              href="/projects/new"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/20"
            >
              <span>+</span>
              Submit Project
            </Link>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
