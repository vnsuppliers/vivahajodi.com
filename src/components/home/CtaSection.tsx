import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaSection = () => (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/10 via-rose-50/50 to-background border-t border-border/60">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Your Perfect Match Awaits
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Join thousands of happy couples who found their lifelong partner securely through Vivaha.
            </p>
            <div>
                <Link to="/register">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-base px-8 py-6 rounded-2xl shadow-lg shadow-primary/25 gap-2">
                        Get Started Free <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </section>
);