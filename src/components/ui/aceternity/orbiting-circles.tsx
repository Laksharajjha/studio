"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}) {
  return (
    <>
      {path && (
        <div
          style={
            {
              "--radius": radius + "px",
            } as React.CSSProperties
          }
          className="absolute h-[calc(var(--radius)*2)] w-[calc(var(--radius)*2)] rounded-full border border-border/20"
        />
      )}
      <div
        style={
          {
            "--duration": duration + "s",
            "--radius": radius + "px",
            "--delay": -delay + "s",
          } as React.CSSProperties
        }
        className={cn(
          "animate-orbit absolute flex h-full w-full items-center justify-center rounded-full border [animation-delay:var(--delay)]",
          { "[animation-direction:reverse]": reverse },
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
