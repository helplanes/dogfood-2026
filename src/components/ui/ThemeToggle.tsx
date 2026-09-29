"use client";

import { useState } from "react";

// Applies data-theme to <html> and persists to localStorage. The blocking script in layout.tsx
// sets the initial value before paint so there is no flash of the wrong theme; the lazy
// initializer here just reads that same attribute back for this component's own render.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document === "undefined") return "dark";
    return (document.documentElement.getAttribute("data-theme") as "dark" | "light") ?? "dark";
  });

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing / blocked storage: theme still applies for this page load.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="p-2 rounded-lg border border-stone-800 bg-surface hover:bg-surface-hover text-stone-300 hover:text-white transition-colors"
    >
      {theme === "light" ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
