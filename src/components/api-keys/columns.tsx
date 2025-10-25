"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ApiKey } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { RevokeKeyDialog } from "./revoke-key-dialog";
import React, { useState } from "react";
import { getUsage } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

type ColumnsProps = {
  onRevoke: (keyId: string) => void;
}

const UsageCell = ({ row }: { row: any }) => {
  const { apiKey } = useAuth();
  const [usage, setUsage] = useState({ sends: row.original.sends, limit: row.original.limit });
  
  React.useEffect(() => {
    const fetchUsage = async () => {
      if (apiKey) {
        try {
          const usageData = await getUsage(apiKey, row.original.id);
          setUsage({ sends: usageData.sends, limit: usageData.limit });
        } catch (error) {
          console.error("Failed to fetch usage for key:", row.original.id, error);
        }
      }
    };
    
    // Fetch usage initially and then poll every 30 seconds
    fetchUsage();
    const interval = setInterval(fetchUsage, 30000);
    
    return () => clearInterval(interval);
  }, [apiKey, row.original.id]);

  const usagePercentage = (usage.sends / usage.limit) * 100;
  return (
    <div className="flex flex-col gap-1.5 w-40">
        <span className="text-xs text-muted-foreground">{usage.sends} / {usage.limit} sends</span>
      <Progress value={usagePercentage} className="h-2" />
    </div>
  );
};


export const columns = ({ onRevoke }: ColumnsProps): ColumnDef<ApiKey>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("active");
      return (
        <Badge variant={isActive ? "secondary" : "outline"}>
          {isActive ? "Active" : "Revoked"}
        </Badge>
      );
    },
  },
  {
    id: "usage",
    header: "Usage",
    cell: UsageCell,
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
        return <span>{format(new Date(row.original.created), 'PP')}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const apiKey = row.original;
      const [isRevokeDialogOpen, setRevokeDialogOpen] = useState(false);

      if (!apiKey.active) {
        return null;
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() => setRevokeDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4"/>
                Revoke Key
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RevokeKeyDialog
            isOpen={isRevokeDialogOpen}
            onOpenChange={setRevokeDialogOpen}
            onConfirm={() => {
              onRevoke(apiKey.id);
              setRevokeDialogOpen(false);
            }}
          />
        </>
      );
    },
  },
];
