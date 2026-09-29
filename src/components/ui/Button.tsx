"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

/**
 * Button — DESIGN-4-HYBRID §3
 * Primary: bg #fe330a, white text. Focus-only ring, NO always-on glow.
 * Secondary: bg #191c20, white text.
 * Outline: border + current color text.
 * No hover scale. Just color transitions. Keep it calm.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-widest " +
      "transition-colors duration-200 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] " +
      "disabled:opacity-50 disabled:cursor-not-allowed";

    // DESIGN-4: No always-on glow, no hover scale
    const variants: Record<string, string> = {
      primary: "bg-[#fe330a] text-white hover:bg-[#ff4d26] active:bg-[#e02d07]",
      secondary: "bg-[#191c20] text-white hover:bg-[#282a2f]",
      outline: "bg-transparent border border-current text-current hover:opacity-70",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
