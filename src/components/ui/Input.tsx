"use client";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** When true, shows red error border and focus ring instead of default */
  error?: boolean;
}

/**
 * Input — DESIGN-4-HYBRID §3
 * White bg, #e2e8f0 border. Focus: ring-2 ring-[var(--color-primary)]. Error: border-[#ba1a1a].
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    const baseStyles =
      "flex h-10 w-full rounded-sm border bg-white px-3 py-2 " +
      "text-sm text-[#111318] placeholder:text-slate-400 " +
      "focus:outline-none focus:ring-2 focus:border-transparent " +
      "transition-colors duration-200 " +
      "disabled:cursor-not-allowed disabled:opacity-50";

    const borderStyles = error
      ? "border-[#ba1a1a] focus:ring-[#ba1a1a]"
      : "border-[#e2e8f0] focus:ring-[var(--color-primary)]";

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${borderStyles} ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
