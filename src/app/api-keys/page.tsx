"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { ApiKeysTable } from "@/components/api-keys/api-keys-table";
import { columns } from "@/components/api-keys/columns";
import type { ApiKey } from "@/lib/types";
import { GenerateKeyModal } from "@/components/api-keys/generate-key-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { getKeys, createKey, revokeKey } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isGenerateModalOpen, setGenerateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchKeys = async () => {
      if (!apiKey) {
        setError("API Key not found. Please configure it in the authentication context.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const fetchedKeys = await getKeys(apiKey);
        setKeys(fetchedKeys);
      } catch (err: any) {
        setError(err.message || "Failed to fetch API keys.");
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message || "Could not fetch API keys.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchKeys();
  }, [apiKey, toast]);

  const filteredKeys = useMemo(() => {
    return keys.filter(
      (key) =>
        key.name.toLowerCase().includes(search.toLowerCase()) ||
        (key.email && key.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [keys, search]);

  const handleKeyGenerated = async (name: string, email: string) => {
    if (!apiKey) return;
    try {
      const newKey = await createKey(apiKey, { name, email });
      setKeys((prevKeys) => [newKey, ...prevKeys]);
      toast({
        title: "API Key Generated!",
        description: `New key created.`,
      });
      return newKey;
    } catch (err: any) {
       toast({
        variant: "destructive",
        title: "Generation Failed",
        description: err.message || "Could not generate new key.",
      });
      throw err; // Re-throw to be caught in the modal
    }
  };
  
  const handleKeyRevoked = async (keyId: string) => {
    if (!apiKey) return;
     try {
      await revokeKey(apiKey, keyId);
      setKeys((prevKeys) => 
        prevKeys.map(key => 
          key.id === keyId ? { ...key, active: false } : key
        )
      );
      toast({
        title: "Key Revoked",
        description: "The API key has been successfully revoked.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Revocation Failed",
        description: err.message || "Could not revoke key.",
      });
    }
  };

  const tableColumns = useMemo(() => columns({ onRevoke: handleKeyRevoked }), [apiKey]);

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <Button onClick={() => setGenerateModalOpen(true)} disabled={!apiKey || isLoading}>
            <PlusCircle className="mr-2" />
            Generate Key
          </Button>
        </div>
        {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Request Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
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
