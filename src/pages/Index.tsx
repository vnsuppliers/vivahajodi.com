import { Link } from "react-router-dom";
import { Heart, Search, Users, Star, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

const successStories = [
  { names: "Priya & Arjun", location: "Mumbai", quote: "We found each other on Vivāha and knew it was meant to be. Forever grateful!" },
  { names: "Fatima & Imran", location: "Delhi", quote: "A beautiful journey that started with one interest request. Now happily married!" },
  { names: "Sneha & Vikram", location: "Bangalore", quote: "Vivāha helped us find love across cities. Our families are so happy together!" },
];

const features = [
  { icon: Shield, title: "Verified Profiles", desc: "Every profile is manually verified for authenticity" },
  { icon: Search, title: "Smart Matching", desc: "AI-powered recommendations based on your preferences" },
  { icon: CheckCircle, title: "Privacy First", desc: "Control who sees your profile and contact details" },
  { icon: Users, title: "Large Community", desc: "Join millions of verified members across India" },
];

const Index = () => {
  const [searchGender, setSearchGender] = useState("Female");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold-light blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gold-light blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Find Your <span className="text-gold">Perfect</span> Life Partner
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body">
              India's most trusted matrimony service. Join millions who found love, companionship, and a lifelong partner.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 gap-2">
                Register Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Search */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-12 bg-background/95 backdrop-blur-sm rounded-xl p-6 shadow-elevated"
          >
            <h3 className="font-display font-semibold text-foreground mb-4 text-center">Quick Partner Search</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground" value={searchGender} onChange={(e) => setSearchGender(e.target.value)}>
                <option value="Female">Bride</option>
                <option value="Male">Groom</option>
              </select>
              <select className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground">
                <option>Age 18-25</option>
                <option>Age 25-30</option>
                <option>Age 30-35</option>
                <option>Age 35+</option>
              </select>
              <select className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground">
                <option>All Religions</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
                <option>Sikh</option>
              </select>
              <Link to="/register">
                <Button className="w-full gap-1.5">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Why Choose <span className="text-primary">Vivāha</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-6 text-center shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-light mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-4">
            Success Stories
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Real couples who found their soulmate on Vivāha
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <motion.div
                key={story.names}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl border border-border p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-primary fill-primary" />
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <Star className="h-4 w-4 text-gold fill-gold" />
                </div>
                <p className="text-sm text-muted-foreground italic mb-4">"{story.quote}"</p>
                <p className="font-display font-semibold text-foreground">{story.names}</p>
                <p className="text-xs text-muted-foreground">{story.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 gradient-hero text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Your Perfect Match Awaits
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Join thousands of happy couples. Register now and start your journey to forever.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
