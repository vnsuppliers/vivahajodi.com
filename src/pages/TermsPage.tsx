import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Sparkles, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { termsConditionsInfoService } from "@/services/terms_conditions"; 

const TermsPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
       const res = await termsConditionsInfoService.getTermsConditionsInfo();

        console.log("terms data:", res);

        setTerms(res.records || []);
        
      } catch (error) {
        console.error("Failed to fetch terms and conditions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Vivaha Romantic Background Glow & Floating Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 opacity-10 pointer-events-none text-primary">
        <Heart className="w-56 h-56 fill-current transform rotate-12" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Vivaha Community Guidelines
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Please review the membership terms and agreements that govern your secure matchmaking journey with Vivaha.
          </p>
        </motion.div>

        {/* Content Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/80 backdrop-blur-xl border border-border/80 shadow-xl rounded-3xl p-8 md:p-12 space-y-10"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs">Loading terms and conditions...</p>
            </div>
          ) : terms.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No active terms & conditions available at the moment.
            </div>
          ) : (
            terms.map((item, index) => (
              <div key={item.id || index} className="space-y-10">
                <section className="flex gap-5 items-start">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0 shadow-sm mt-1 text-lg">
                    {item.icon ? (
                      <i className={`${item.icon} text-primary`} />
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
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </section>

                {index < terms.length - 1 && <hr className="border-border/60" />}
              </div>
            ))
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;