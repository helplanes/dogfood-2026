"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function GlobalNav() {
  const pathname = usePathname();
  const navItems = [
    { name: "Gallery", href: "/projects" },
    { name: "Help", href: "/#help" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-primary)]/20 bg-gradient-to-r from-background via-[var(--color-primary)]/5 to-background backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-[0_4px_30px_rgba(254,51,10,0.1)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8 relative">
        {/* Subtle top inner glow for premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_15px] shadow-primary/80"></span>
            </span>
            <span className="font-syne text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary">
              DOGFOOD
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-mono transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] ${
                  pathname?.startsWith(item.href) && item.href !== "/#help" 
                    ? "text-white font-bold" 
                    : "text-stone-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-mono text-stone-300 hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/login" 
            className="hidden md:inline-flex relative items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-mono font-medium text-background transition-all hover:scale-105 hover:shadow-[0_0_20px] hover:shadow-primary/50"
          >
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
