"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/auth-context";
import { Copy, Check } from "lucide-react";
import type { ApiKey } from "@/lib/types";

interface GenerateKeyModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onKeyGenerated: (newKey: ApiKey) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

export function GenerateKeyModal({
  isOpen,
  onOpenChange,
  onKeyGenerated,
}: GenerateKeyModalProps) {
  const { user } = useAuth();
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate key generation
    const newKeyString = `zelth_sk_${crypto.randomUUID().replace(/-/g, "")}`;
    setGeneratedKey(newKeyString);

    if (user) {
      const newKeyObject: ApiKey = {
        id: `key-${crypto.randomUUID()}`,
        name: values.name,
        email: user.email,
        sends: 0,
        validations: 0,
        limit: 1000,
        active: true,
        created: new Date().toISOString(),
      };
      onKeyGenerated(newKeyObject);
    }
    form.reset();
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setGeneratedKey(null);
        setHasCopied(false);
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
          <DialogDescription>
            This key will be used to authenticate your API requests.
          </DialogDescription>
        </DialogHeader>
        {generatedKey ? (
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Your new key has been generated!</AlertTitle>
              <AlertDescription>
                Please save this key securely. You will not be able to see it again.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <Input
                readOnly
                value={generatedKey}
                className="pr-10 font-mono text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleCopy}
              >
                {hasCopied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <DialogFooter>
                <Button onClick={() => handleClose(false)}>Done</Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Test App" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Generate</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
