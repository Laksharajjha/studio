import AppLayout from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images.json";

export default function ProfilePage() {
  const userAvatar = placeholderImages.find(p => p.id === "user-avatar");

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
            <CardDescription>Manage your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />}
                <AvatarFallback>ZD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="font-semibold">dev@zelth.com</p>
                <p className="text-sm text-muted-foreground">Your personal account.</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value="dev@zelth.com" disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
            </div>
             <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription and billing details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-2xl font-bold">Free Tier</p>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
             <p className="text-sm text-muted-foreground">
              You can manage your API keys on the <Link href="/api-keys" className="underline text-primary">API Keys page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
