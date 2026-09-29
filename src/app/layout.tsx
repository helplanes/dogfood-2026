import Link from "next/link";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GlobalNav } from "@/components/ui/GlobalNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

// Runs before paint so switching themes never flashes the wrong one on reload.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

const inter = localFont({ src: "../../public/fonts/Inter.woff2", variable: "--font-inter", display: "swap" });
const jbMono = localFont({ src: "../../public/fonts/JetBrains_Mono.woff2", variable: "--font-jb-mono", display: "swap" });
const syne = localFont({ src: "../../public/fonts/Syne.woff2", variable: "--font-syne", display: "swap" });

export const metadata = {
  title: { default: "DOGFOOD Portal", template: "%s · DOGFOOD Portal" },
  description: "Submission and judging platform for DOGFOOD 2026.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbMono.variable} ${syne.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-stone-100 flex flex-col font-sans selection:bg-primary/30">
        {/* Global App Header */}
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-stone-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-2 w-2 rounded-full bg-primary shadow-primary/50 group-hover:shadow-primary/80 transition-all" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-syne font-bold tracking-tight text-white text-lg">DOGFOOD</span>
                <span className="font-syne italic font-bold text-primary text-lg leading-none">2026</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <GlobalNav />
            <ThemeToggle />
            <Link
              href="/projects/new"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20"
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
