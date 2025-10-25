"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const AnimatedGradientText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-shadow duration-200 dark:bg-black/40",
        "bg-gradient-to-r from-background/80 via-background/20 to-background/80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedGradientText;
