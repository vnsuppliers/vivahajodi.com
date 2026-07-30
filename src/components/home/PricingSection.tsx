import { useNavigate } from "react-router-dom";
import { Zap, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { masterService } from "@/services/master.service";

const getPlanUIDecorations = (durationDays: number, index: number) => {
    const periodText = durationDays >= 365
        ? "1 Year"
        : durationDays % 30 === 0
            ? `${durationDays / 30} Months`
            : `${durationDays} Days`;

    return {
        popular: index === 1,
        period: periodText,
    };
};

export const PricingSection = () => {
    const [plans, setPlans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);
                const response = await masterService.getSubscriptionsPlans();
                if (response && response.plans_list) {
                    setPlans(response.plans_list);
                } else if (Array.isArray(response)) {
                    setPlans(response);
                }
            } catch (error) {
                console.error("Failed to load membership options from master API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handlePlanClick = (planId: number) => {
        const userData = localStorage.getItem("matrimony_user_data");
        if (!userData) {
            navigate(`/login?redirect=/register?plan_id=${planId}`);
            return;
        }
        navigate(`/dashboard/subscription/purchase/${planId}`);
    };

    return (
        <section className="py-20 md:py-28 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" /> Membership Tiers
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                        Find Love Without Boundaries
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Choose a transparent structure built for your unique matchmaking needs. No hidden charges.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground font-medium animate-pulse">Curating Vivaha membership plans...</p>
                    </div>
                ) : plans.length === 0 ? (
                    <div className="text-center py-16 bg-card/80 backdrop-blur-md rounded-3xl border border-dashed border-border/80 shadow-sm max-w-md mx-auto p-8">
                        <p className="text-muted-foreground text-sm">
                            Basic registration remains free! Check back later for promotional plans.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {plans.filter(p => p.status === 1).map((plan, i) => {
                            const ui = getPlanUIDecorations(plan.duration_days, i);
                            const planFeatures: string[] = Array.isArray(plan.specifications) ? plan.specifications : [];
                            const formattedPrice = Number(plan.price).toLocaleString("en-IN", {
                                maximumFractionDigits: 0,
                                style: "currency",
                                currency: "INR",
                            });

                            return (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col rounded-3xl p-6 transition-all duration-300 backdrop-blur-xl ${ui.popular
                                            ? "bg-card/95 border-2 border-primary shadow-xl z-10 ring-4 ring-primary/10"
                                            : "bg-card/80 border border-border/80 shadow-lg hover:shadow-xl hover:border-primary/40"
                                        }`}
                                >
                                    {ui.popular && (
                                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-rose-500 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-md whitespace-nowrap">
                                            <Zap className="h-3 w-3 fill-current" /> Most Popular
                                        </span>
                                    )}

                                    <div className="flex flex-1 flex-col">
                                        <div className="mb-4">
                                            <h3 className="mb-1 font-display text-xl font-bold text-foreground truncate">{plan.name}</h3>
                                            {plan.description && (
                                                <p className="min-h-[36px] text-xs text-muted-foreground line-clamp-2 leading-relaxed">{plan.description}</p>
                                            )}
                                            <div className="mt-4 flex items-baseline flex-wrap">
                                                <span className="text-3xl font-extrabold tracking-tight text-foreground">{formattedPrice}</span>
                                                <span className="ml-1 text-xs font-medium text-muted-foreground">/ {ui.period}</span>
                                            </div>
                                        </div>

                                        <hr className="my-4 border-border/60" />

                                        {planFeatures.length > 0 && (
                                            <ul className="mb-6 flex-1 space-y-3">
                                                {planFeatures.map((feature: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs">
                                                        <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                                                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                        </div>
                                                        <span className="text-muted-foreground leading-relaxed font-medium">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="mt-auto block w-full pt-2">
                                        <Button
                                            onClick={() => handlePlanClick(plan.id)}
                                            className={`w-full py-3 text-xs font-bold rounded-2xl transition-all shadow-sm ${ui.popular
                                                    ? "bg-gradient-to-r from-primary to-rose-600 text-primary-foreground hover:opacity-95 shadow-primary/25 shadow-lg"
                                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50"
                                                }`}
                                        >
                                            Choose {plan.name}
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};