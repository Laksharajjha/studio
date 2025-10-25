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
import { useState } from "react";

type ColumnsProps = {
  onRevoke: (keyId: string) => void;
}

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
    cell: ({ row }) => {
      const { sends, limit } = row.original;
      const usagePercentage = (sends / limit) * 100;
      return (
        <div className="flex flex-col gap-1.5 w-40">
            <span className="text-xs text-muted-foreground">{sends} / {limit} sends</span>
          <Progress value={usagePercentage} className="h-2" />
        </div>
      );
    },
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
