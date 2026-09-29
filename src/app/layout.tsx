import Link from "next/link";
import type { ReactNode } from "react";
import localFont from "next/font/local";
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
      <body className="min-h-screen bg-background text-stone-100 flex flex-col font-sans selection:bg-primary/30 relative">
        {/* Removed global header to prevent double header. Role-based layouts handle navigation. */}
        <div className="absolute top-4 right-4 z-[100]">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
