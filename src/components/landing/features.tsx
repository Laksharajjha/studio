import { MagicCard, MagicContainer } from "../ui/aceternity/magic-card";
import { KeyRound, BarChart3, Mail, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <KeyRound className="h-12 w-12 text-primary" />,
    title: "Instant API Keys",
    description: "Generate secure API keys in seconds. Configure rate limits, domains, and expiration with ease from our intuitive dashboard.",
  },
  {
    icon: (
      <div className="flex -space-x-2">
        <Mail className="h-12 w-12 text-accent" />
        <MessageSquare className="h-12 w-12 text-primary" />
      </div>
    ),
    title: "Email & SMS Delivery",
    description: "Seamlessly send OTPs via email or SMS. Our robust infrastructure ensures high deliverability and low latency worldwide.",
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-accent" />,
    title: "Powerful Analytics",
    description: "Monitor usage, track validation rates, and gain insights into your OTP traffic. Everything you need to know, in one place.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto py-20 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything You Need, Nothing You Don't
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Focus on your product. We'll handle the one-time passwords.
        </p>
      </div>

      <MagicContainer
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature) => (
          <MagicCard
            key={feature.title}
            className="flex flex-col items-center justify-start p-8"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-center text-muted-foreground">
              {feature.description}
            </p>
          </MagicCard>
        ))}
      </MagicContainer>
    </section>
  );
}
