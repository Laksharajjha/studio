"use client";

import { Icons } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Input } from "./ui/input";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const { isMobile, toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold text-lg">Zelth</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
            {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-64"
              />
            </div> */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
