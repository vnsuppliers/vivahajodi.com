import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Sparkles, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { privacrPolicyInfoService } from "@/services/privacy_policy.service";

const PrivacyPage = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const res = await privacrPolicyInfoService.getPrivacyPolicyInfo();

        console.log("Privacy Policy:", res);

        setPolicies(res.records || []);
      } catch (error) {
        console.error("Failed to fetch privacy policy", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-10 opacity-10 pointer-events-none text-primary">
        <Heart className="w-56 h-56 fill-current -rotate-12" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Vivaha Trust & Safety
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Your trust and discretion are core to the Vivaha experience. Learn
            how we carefully collect, protect, and handle your personal data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/80 backdrop-blur-xl border border-border/80 shadow-xl rounded-3xl p-8 md:p-12 space-y-10"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs">Loading privacy policy...</p>
            </div>
          ) : policies.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No active privacy policy available.
            </div>
          ) : (
            policies.map((item, index) => (
              <div key={item.id || index} className="space-y-10">
                <section className="flex gap-5 items-start">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0 shadow-sm mt-1 text-lg">
                    {item.icon ? (
                      <i className={`${item.icon} text-primary text-xl`} />
                    ) : (
                      <FileText className="h-6 w-6 stroke-[1.5]" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <h2 className="font-display text-xl font-bold text-foreground tracking-tight">
                      {index + 1}. {item.name}
                    </h2>

                    <div
                      className="text-muted-foreground text-sm md:text-base leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </div>
                </section>

                {index < policies.length - 1 && (
                  <hr className="border-border/60" />
                )}
              </div>
            ))
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;