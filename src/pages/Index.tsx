import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CtaSection } from "@/components/home/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Romantic Background Glows & Floating Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <HeroSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <PricingSection />
      <CtaSection />

      <Footer />
    </div>
  );
};

export default Index;