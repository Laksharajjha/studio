import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { recentActivities } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

export function RecentActivityTable() {
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
