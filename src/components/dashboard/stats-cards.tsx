"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LetterPop from "../ui/aceternity/letter-pop";
import { KeyRound, Send, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getKeys } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

export function StatsCards() {
  const { apiKey } = useAuth();
  const [stats, setStats] = useState({
    totalSends: 0,
    activeKeys: 0,
    totalValidations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!apiKey) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const keys = await getKeys(apiKey);
        const activeKeys = keys.filter(k => k.active).length;
        const totalSends = keys.reduce((acc, key) => acc + key.sends, 0);
        const totalValidations = keys.reduce((acc, key) => acc + key.validations, 0);
        setStats({ totalSends, activeKeys, totalValidations });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({ totalSends: 0, activeKeys: 0, totalValidations: 0 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [apiKey]);


  const statsCards = [
    {
      title: "Total Sends",
      value: stats.totalSends.toLocaleString(),
      icon: <Send className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Active Keys",
      value: stats.activeKeys.toString(),
      icon: <KeyRound className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Successful Validations",
      value: stats.totalValidations.toLocaleString(),
      icon: <CheckCircle className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  if (isLoading) {
      return (
        <div className="grid gap-4 md:grid-cols-3">
            {statsCards.map((stat) => (
                 <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
      )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsCards.map((stat) => (
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
