"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { Icons } from "./icons";

interface SignInModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function SignInModal({ isOpen, onOpenChange }: SignInModalProps) {
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    login();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Icons.logo className="h-7 w-7"/> Zelth
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to access your dashboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="dev@zelth.com"
              defaultValue="dev@zelth.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              defaultValue="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
