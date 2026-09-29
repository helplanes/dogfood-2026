import Link from "next/link";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GlobalNav } from "@/components/ui/GlobalNav";
import "./globals.css";

const inter = localFont({ src: "../../public/fonts/Inter.woff2", variable: "--font-inter", display: "swap" });
const jbMono = localFont({ src: "../../public/fonts/JetBrains_Mono.woff2", variable: "--font-jb-mono", display: "swap" });
const syne = localFont({ src: "../../public/fonts/Syne.woff2", variable: "--font-syne", display: "swap" });

export const metadata = { title: "DOGFOOD Portal" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbMono.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-background text-[#f8f9fc] flex flex-col font-sans selection:bg-primary/30">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
