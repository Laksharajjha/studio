import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LetterPop from "../ui/aceternity/letter-pop";
import { KeyRound, Send, CheckCircle } from "lucide-react";
import { usageStats } from "@/lib/data";

const stats = [
  {
    title: "Total Sends",
    value: usageStats.totalSends.toLocaleString(),
    icon: <Send className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Active Keys",
    value: usageStats.activeKeys.toString(),
    icon: <KeyRound className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Successful Validations",
    value: usageStats.totalValidations.toLocaleString(),
    icon: <CheckCircle className="h-5 w-5 text-muted-foreground" />,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              <LetterPop text={stat.value} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
