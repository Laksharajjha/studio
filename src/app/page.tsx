import { LandingHeader } from "@/components/landing/landing-header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import OrbitingCircles from "@/components/ui/aceternity/orbiting-circles";
import { Lightbulb, Mail, MessageSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <OrbitingCircles
        className="absolute -top-40 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 border-none bg-transparent"
        duration={20}
        delay={20}
        radius={300}
      >
        <Lightbulb className="h-8 w-8 text-primary" />
      </OrbitingCircles>
      <OrbitingCircles
        className="absolute -top-40 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 border-none bg-transparent"
        duration={20}
        delay={10}
        radius={300}
        reverse
      >
        <Mail className="h-8 w-8 text-accent" />
      </OrbitingCircles>
       <OrbitingCircles
        className="absolute -top-40 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 border-none bg-transparent"
        duration={40}
        radius={300}
        reverse
      >
        <MessageSquare className="h-8 w-8 text-secondary-foreground" />
      </OrbitingCircles>
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
