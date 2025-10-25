import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const mockActivities = [
    { id: "act-1", event: "OTP sent to user@example.com", status: "Success", timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
    { id: "act-2", event: "API Key 'Staging Server' created", status: "Success", timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
    { id: "act-3", event: "OTP validation failed for +1...4321", status: "Failed", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: "act-4", event: "OTP sent to test@zelth.com", status: "Success", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: "act-5", event: "API Key 'Old Marketing Site' revoked", status: "Success", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
];

export function RecentActivityTable() {
  // TODO: Replace with real API call
  const recentActivities = mockActivities;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of the most recent OTP events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.event}</TableCell>
                <TableCell>
                  <Badge variant={activity.status === "Success" ? "secondary" : "destructive"}>
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
