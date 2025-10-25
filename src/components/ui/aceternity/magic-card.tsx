"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MouseEnterContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const MouseEnterContext = createContext<MouseEnterContextType | undefined>(
  undefined,
);

export const MagicContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      containerRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
    };

    if (containerRef.current) {
        containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "relative [perspective:800px]",
          className
        )}
        ref={containerRef}
      >
        {children}
      </div>
    </MouseEnterContext.Provider>
  );
};


export const MagicCard = ({
  children,
  className = "",
  glow = true,
}: {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => {
  const [isMouseEntered] = useMouseEnter();

  return (
    <div
      className={cn(
        "relative h-full w-full rounded-lg bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out",
        "transform-style-3d [transform:rotateY(var(--rotate-y))_rotateX(var(--rotate-x))]",
        className,
      )}
    >
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        {glow && (
          <div
            className={cn(
                "pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500",
                "bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),hsl(var(--primary)),transparent_40%)]",
                isMouseEntered && "opacity-100",
            )}
          />
        )}
        <div className="relative z-[1] h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export const useMouseEnter = (): MouseEnterContextType => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MagicContainer");
  }
  return context;
};
