"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "./ui/skeleton";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = React.useState(true);

  useEffect(() => {
    // This effect will run on the client side
    if (!isLoggedIn) {
      router.push("/");
    } else {
      setIsVerifying(false);
    }
  }, [isLoggedIn, router]);

  if (isVerifying) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="w-1/2 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
  }

  return <>{children}</>;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <SidebarNav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
