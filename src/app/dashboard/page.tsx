"use client";

import AppLayout from "@/components/app-layout";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table";
import { useAuth } from "@/contexts/auth-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function DashboardPage() {
  const { apiKey, error } = useAuth();

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
         {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <StatsCards />
        <RecentActivityTable />
      </div>
    </AppLayout>
  );
}
