"use client";

import React, { useEffect, useRef, useState } from "react";

export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  // isVisible must start false unconditionally, matching what the server rendered — reading
  // window.matchMedia() here (a client-only value) inside a component that also renders on the
  // server causes the server and client's first render to disagree, which is a React hydration
  // error (#418), not just a cosmetic issue: React logs it and re-renders the whole subtree from
  // scratch. Reduced-motion is instead handled purely in CSS (motion-reduce: below), which is
  // SSR-safe by construction: the browser evaluates that media query itself, no JS state needed.
  // Reduced-motion users get content immediately through the CSS opacity override below.
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}
