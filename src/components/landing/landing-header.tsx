"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { GlowingButton } from "../ui/aceternity/glowing-button";
import { SignInModal } from "../sign-in-modal";

export function LandingHeader() {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">Zelth</span>
          </Link>
          <nav className="flex items-center gap-4">
            <GlowingButton onClick={() => setSignInModalOpen(true)}>
              Sign In
            </GlowingButton>
          </nav>
        </div>
      </header>
      <SignInModal isOpen={isSignInModalOpen} onOpenChange={setSignInModalOpen} />
    </>
  );
}
