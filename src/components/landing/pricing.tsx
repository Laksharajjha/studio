import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingButton } from "../ui/aceternity/glowing-button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For personal projects and testing.",
    features: [
      "1,000 Sends/Month",
      "2 Active API Keys",
      "Email-based OTPs",
      "Community Support",
    ],
    cta: "Start for Free",
    isFeatured: false,
  },
  {
    name: "Pro",
    price: "$25",
    description: "For production applications.",
    features: [
      "50,000 Sends/Month",
      "Unlimited API Keys",
      "Email & SMS OTPs",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Go Pro",
    isFeatured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto py-20 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for you.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.isFeatured ? "border-primary shadow-2xl shadow-primary/20" : ""}>
            <CardHeader className="items-center text-center">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                <span className="ml-1 text-sm font-semibold text-muted-foreground">
                  /month
                </span>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {tier.isFeatured ? (
                <GlowingButton className="w-full">{tier.cta}</GlowingButton>
              ) : (
                <Button variant="outline" className="w-full">{tier.cta}</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
