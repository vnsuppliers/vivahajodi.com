import { Shield, Search, CheckCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    { icon: Shield, title: "Verified Profiles", desc: "Every profile is manually verified for complete safety and authenticity." },
    { icon: Search, title: "Smart Matching", desc: "AI-powered recommendations tailored carefully to your lifestyle and values." },
    { icon: CheckCircle, title: "Privacy First", desc: "Absolute control over who views your personal gallery and contact details." },
    { icon: Users, title: "Large Community", desc: "Connect with millions of verified members looking for lifelong companionship." },
];

export const FeaturesSection = () => (
    <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                    Why Choose <span className="text-primary">Vivaha</span>?
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                    Designed with state-of-the-art security and absolute user discretion at its heart.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/80 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 text-primary border border-primary/20 shadow-sm">
                            <f.icon className="h-7 w-7 stroke-[1.5]" />
                        </div>
                        <h3 className="font-display font-bold text-foreground text-lg mb-2">{f.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);