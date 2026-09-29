import React from "react";
import Link from "next/link";

export default function JudgeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-stone-800 bg-surface hidden md:flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <Link href="/" className="font-syne text-xl font-bold text-primary block">
            DOGFOOD
          </Link>
          <p className="font-mono text-xs text-stone-500 mt-2 uppercase tracking-wider">Judge Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/judge/dashboard" 
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-mono text-stone-400 hover:bg-stone-800 hover:text-primary transition-all"
          >
            <span>⊞</span> Dashboard
          </Link>
          <Link 
            href="/judge/guidelines" 
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-mono text-stone-400 hover:bg-stone-800 hover:text-primary transition-all"
          >
            <span>📄</span> Guidelines
          </Link>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <Link 
            href="/api/auth/logout" 
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-mono text-stone-400 hover:bg-stone-800 hover:text-red-400 transition-all"
          >
            <span>🚪</span> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
