import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Our comprehensive documentation is currently under construction. Check back soon for detailed guides on how to integrate Zelth with your application.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
