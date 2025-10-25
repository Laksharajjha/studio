"use client";

import { useState } from "react";
import AnimatedGradientText from "../ui/aceternity/animated-gradient-text";
import { GlowingButton } from "../ui/aceternity/glowing-button";
import { SignInModal } from "../sign-in-modal";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function Hero() {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  
  return (
    <>
      <section className="container mx-auto flex flex-col items-center justify-center py-20 md:py-32">
        <div className="text-center">
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#7DF9FF] via-[#9370DB] to-[#7DF9FF] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Zealous OTP Validation
              </span>
            </AnimatedGradientText>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            The Modern OTP API
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Generate, manage, and monitor your OTP keys with a simple and powerful API. Built for developers who need security without the hassle.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <GlowingButton onClick={() => setSignInModalOpen(true)}>
              Get Started <ChevronRight />
            </GlowingButton>
          </div>
        </div>
      </section>
      <SignInModal isOpen={isSignInModalOpen} onOpenChange={setSignInModalOpen} />
    </>
  );
}
