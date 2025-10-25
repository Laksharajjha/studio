import AppLayout from "@/components/app-layout";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {/* This button would open the GenerateKeyModal, which is also on the API Keys page */}
          {/* For simplicity, we can link to the API Keys page or implement the modal here */}
        </div>
        <StatsCards />
        <RecentActivityTable />
      </div>
    </AppLayout>
  );
}
