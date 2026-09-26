import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    // Base styles: Light surface fill for contrast, crisp borders
    const baseStyles = "flex h-10 w-full rounded-sm border bg-[#ffffff] px-3 py-2 text-sm text-[#111318] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    
    // Error state handles the red semantic error color
    const borderStyles = error 
      ? "border-[#ba1a1a] focus:ring-[#ba1a1a]" 
      : "border-[#e2e8f0] focus:ring-[#fe330a]"

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${borderStyles} ${className}`}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
