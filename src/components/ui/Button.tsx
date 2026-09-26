import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    // Base styles: tight tracking, focus rings for accessibility, disabled states
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe330a] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
    
    // Variant styles mapping to the Obsidian Kinetic tokens
    const variants = {
      primary: "bg-[#fe330a] text-white shadow-[0_0_15px_rgba(254,51,10,0.4)] hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-[#1d2024] text-white hover:bg-[#282a2f]",
      outline: "bg-transparent border border-[#40484d] text-white hover:bg-[#191c20]"
    }

    const classes = `${baseStyles} ${variants[variant]} px-4 py-2 ${className}`

    return (
      <button ref={ref} className={classes} {...props} />
    )
  }
)
Button.displayName = "Button"
