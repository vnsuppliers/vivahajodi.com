import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-br from-rose-100/40 via-background to-pink-50/50 border-b border-border/50">
    
    {/* Floating Decorative Romantic Elements */}
    <div className="absolute -top-12 -left-12 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
    <div className="absolute top-1/4 -right-12 w-80 h-80 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-12 left-10 opacity-15 pointer-events-none text-primary transform -rotate-12">
      <Heart className="w-32 h-32 fill-current" />
    </div>
    <div className="absolute bottom-10 right-20 opacity-15 pointer-events-none text-rose-500 transform rotate-12">
      <Heart className="w-40 h-40 fill-current" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider border border-primary/25 shadow-sm backdrop-blur-md">
          <Sparkles className="w-4 h-4" /> India's Most Trusted & Secure Matrimony Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground tracking-tight leading-[1.15]">
          Find Your <span className="bg-gradient-to-r from-primary to-rose-600 bg-clip-text text-transparent">Perfect Life</span> Partner
        </h1>
        
        <p className="text-base md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
          Join thousands of happy souls who found true love, enduring companionship, and a lifelong soulmate securely through Vivaha.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-rose-600 text-primary-foreground hover:opacity-95 font-semibold text-base px-9 py-7 rounded-2xl shadow-xl shadow-primary/30 gap-2.5 transition-all transform hover:-translate-y-0.5">
              Register Free <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Trust Badges Showcase */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-center border-t border-border/40 mt-12">
          <div className="p-3">
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">100%</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">Verified Profiles</p>
          </div>
          <div className="p-3">
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">Millions</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">Active Matches</p>
          </div>
          <div className="col-span-2 md:col-span-1 p-3">
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">Secure</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">Privacy Protected</p>
          </div>
        </div>

      </motion.div>
    </div>
  </section>
);