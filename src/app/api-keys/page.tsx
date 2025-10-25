"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { ApiKeysTable } from "@/components/api-keys/api-keys-table";
import { columns } from "@/components/api-keys/columns";
import { getApiKeys } from "@/lib/data";
import type { ApiKey } from "@/lib/types";
import { GenerateKeyModal } from "@/components/api-keys/generate-key-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isGenerateModalOpen, setGenerateModalOpen] = useState(false);

  useEffect(() => {
    const fetchKeys = async () => {
      setIsLoading(true);
      // Simulate API fetch
      await new Promise(resolve => setTimeout(resolve, 500));
      const fetchedKeys = await getApiKeys();
      setKeys(fetchedKeys);
      setIsLoading(false);
    };
    fetchKeys();
  }, []);

  const filteredKeys = useMemo(() => {
    return keys.filter(
      (key) =>
        key.name.toLowerCase().includes(search.toLowerCase()) ||
        key.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [keys, search]);

  const handleKeyGenerated = (newKey: ApiKey) => {
    setKeys((prevKeys) => [newKey, ...prevKeys]);
  };
  
  const handleKeyRevoked = (keyId: string) => {
    setKeys((prevKeys) => 
      prevKeys.map(key => 
        key.id === keyId ? { ...key, active: false } : key
      )
    );
  };

  const tableColumns = useMemo(() => columns({ onRevoke: handleKeyRevoked }), [handleKeyRevoked]);

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <Button onClick={() => setGenerateModalOpen(true)}>
            <PlusCircle className="mr-2" />
            Generate Key
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="rounded-md border">
            <div className="w-full p-4">
              <Skeleton className="h-8 w-1/4" />
            </div>
            <div className="p-4 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <ApiKeysTable columns={tableColumns} data={filteredKeys} />
        )}
      </div>
      <GenerateKeyModal
        isOpen={isGenerateModalOpen}
        onOpenChange={setGenerateModalOpen}
        onKeyGenerated={handleKeyGenerated}
      />
    </AppLayout>
  );
}
