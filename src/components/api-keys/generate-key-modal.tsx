"use client";

import { useState, useEffect } from "react";
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
  onKeyGenerated: (name: string, email: string) => Promise<ApiKey>;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

export function GenerateKeyModal({
  isOpen,
  onOpenChange,
  onKeyGenerated,
}: GenerateKeyModalProps) {
  const { user } = useAuth();
  const [generatedKey, setGeneratedKey] = useState<ApiKey | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: user?.email || "" },
  });
  
  // Update email field if user context changes
  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const newKey = await onKeyGenerated(values.name, values.email);
      setGeneratedKey(newKey);
      form.reset();
    } catch (error) {
      console.error("Failed to generate key", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedKey?.key) {
      navigator.clipboard.writeText(generatedKey.key);
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
        setIsLoading(false);
        form.reset({ name: "", email: user?.email || "" });
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
                value={generatedKey.key}
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
