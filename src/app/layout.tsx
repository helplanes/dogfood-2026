import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "DOGFOOD Portal" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b border-border py-4 px-6 bg-card text-card-foreground">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-bold uppercase tracking-tight">DOGFOOD 2026</div>
            <nav className="space-x-4">
              <a href="/projects" className="text-sm font-bold uppercase tracking-widest hover:text-[#fe330a] transition-colors">Gallery</a>
              {/* Other nav items will go here */}
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
