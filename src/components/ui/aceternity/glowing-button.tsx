"use client";
import { cn } from "@/lib/utils";
import React from "react";

const GlowingButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-md px-6 font-medium text-primary-foreground transition-all focus:outline-none",
        "shadow-[0_0_0_2px_hsl(var(--border))_inset]",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] 
        bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
});

GlowingButton.displayName = "GlowingButton";

export { GlowingButton };
