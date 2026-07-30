import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Loader2, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { masterService } from "@/services/master.service";
import { paymentService } from '@/services/payment.service';
import { toast } from "sonner";

interface PlanDetails {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  specifications: string[];
  description?: string;
}

// Dynamically appends the required Razorpay SDK script to the browser document body
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Keeps layout design mapping properties perfectly aligned with your active themes
const getPlanUIDecorations = (planName: string, durationDays: number) => {
  const nameLower = planName.toLowerCase();
  const periodText = durationDays >= 365
    ? "1 Year"
    : durationDays % 30 === 0
      ? `${durationDays / 30} Months`
      : `${durationDays} Days`;

  if (nameLower.includes("platinum")) {
    return {
      period: periodText,
      fallbackFeatures: [
        "Everything in Gold membership",
        "View unlimited contact details",
        "Premium profile badge decoration",
        "Dedicated relationship advisor support",
        "Top priority placement in searches",
      ],
    };
  }

  return {
    period: periodText,
    fallbackFeatures: [
      "Create profile & upload multiple photos",
      "Browse verified matches instantly",
      "Unlimited interest requests",
      "Chat directly with open matches",
      "View up to 25 contact numbers",
    ],
  };
};

export default function SubscriptionPurchase() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingPlan, setFetchingPlan] = useState<boolean>(true);
  const [plan, setPlan] = useState<PlanDetails | null>(null);
  const [uiPeriodText, setUiPeriodText] = useState<string>('');
  
  // Dynamic layout flag switching from checkout to success state
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [expiryDateText, setExpiryDateText] = useState<string>('');

  // Resolves the package variables from TypeORM response array on Mount
  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return;
      
      try {
        setFetchingPlan(true);
        const response = await masterService.getSubscriptionsPlans();
        let plansList: any[] = [];

        if (response && response.plans_list) {
          plansList = response.plans_list;
        } else if (Array.isArray(response)) {
          plansList = response;
        }

        const targetPlan = plansList.find(p => p.id === Number(planId));

        if (targetPlan) {
          const ui = getPlanUIDecorations(targetPlan.name, targetPlan.duration_days);
          const parsedFeatures: string[] =
            Array.isArray(targetPlan.specifications) && targetPlan.specifications.length > 0
              ? targetPlan.specifications
              : ui.fallbackFeatures;

          setPlan({
            id: targetPlan.id,
            name: targetPlan.name,
            price: Number(targetPlan.price),
            duration_days: targetPlan.duration_days,
            specifications: parsedFeatures,
            description: targetPlan.description
          });
          
          setUiPeriodText(ui.period);
        } else {
          toast.error("The requested premium package could not be resolved.");
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to parse targeted parameters:", error);
        toast.error("Failed to load plan details configuration maps.");
      } finally {
        setFetchingPlan(false);
      }
    };

    fetchPlanDetails();
  }, [planId, navigate]);

  // Integrated Razorpay workflow engine pipeline
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!plan) return;

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay payment gateway script failed to mount. Verify your network connection.");
        setLoading(false);
        return;
      }

      // Utilizes your clean dynamic local axios service module configuration instances
      const response = await paymentService.createOrder(plan.id);
      
      if (!response || !response.success || !response.data) {
        toast.error(response.message || "Could not instantiate premium checkout order intent.");
        setLoading(false);
        return;
      }

      const orderData = response.data;
      const localUserData = JSON.parse(localStorage.getItem("matrimony_user_data") || "{}");

      const options = {
        key: orderData.key, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vivāha Matrimony",
        description: `Premium Upgrade: ${orderData.plan.name}`,
        order_id: orderData.order_id,
        handler: async function (razorpayResponse: any) {
          setLoading(true);
          const verificationToastId = toast.loading("Verifying transaction secure data tokens...");
          
          try {
            // Fires exact request payloads to your updated endpoint: /payments/verify-payment
            const verifyResponse = await paymentService.verifyPayment({
              order_id: orderData.order_id,
              payment_id: razorpayResponse.razorpay_payment_id,
              signature: razorpayResponse.razorpay_signature,
            });

            if (verifyResponse && verifyResponse.success) {
              toast.success("Account successfully upgraded to premium!", { id: verificationToastId });
              
              // Pre-calculate presentation date parameters dynamically to avoid repetitive endpoint operations
              const calculatedExpiry = new Date();
              calculatedExpiry.setDate(calculatedExpiry.getDate() + plan.duration_days);
              setExpiryDateText(calculatedExpiry.toLocaleDateString('en-IN', { dateStyle: 'long' }));
              
              // Trigger inline success interface
              setIsSuccess(true);
            } else {
              toast.error(verifyResponse.message || "Cryptographic validation signature mismatch.", { id: verificationToastId });
            }
          } catch (err) {
            console.error("Payment confirmation execution loop trace down exception:", err);
            toast.error("Transaction logged but account activation failed. Please notify support.", { id: verificationToastId });
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: localUserData?.name || "",
          email: localUserData?.email || "",
          contact: localUserData?.phone || "",
        },
        theme: {
          color: "#E11D48", 
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Transaction cancelled by user.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Critical transaction handler runtime error:", error);
      toast.error("An internal connection error interrupted payment initialization.");
      setLoading(false);
    }
  };

  if (fetchingPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading secure payment settings...</p>
      </div>
    );
  }

  if (!plan) return null;

  const formattedPrice = plan.price.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  // =========================================================================
  // DYNAMIC RENDER STATE: BEAUTIFUL SUCCESS INTERFACE SCREEN
  // =========================================================================
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full bg-card rounded-2xl border border-border shadow-elevated p-8 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 relative">
            <CheckCircle2 className="w-12 h-12 stroke-[2]" />
            <Sparkles className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Upgrade Successful!
          </h1>
          <p className="text-muted-foreground text-sm mb-6 px-2">
            Your payment has been successfully secured. Premium matchmaking tools are now active on your dashboard profile.
          </p>

          <div className="bg-muted rounded-xl p-4 text-left border border-border/60 space-y-3 mb-8 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-border/40">
              <span className="text-muted-foreground font-medium">Subscription Tier</span>
              <span className="font-bold text-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                {plan.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Features Access</span>
              <span className="font-semibold text-emerald-600">Unlimited Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Expiry Threshold
              </span>
              <span className="font-semibold text-foreground">
                {expiryDateText}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm font-semibold rounded-xl gap-2 shadow-sm"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/dashboard/search')} 
              className="w-full py-6 text-sm font-medium rounded-xl border-border bg-transparent hover:bg-muted"
            >
              Launch Smart Search
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground tracking-wide font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SECURE PROFILE ACTIVATION LOGS VERIFIED</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // STANDARD RENDER STATE: SECURE CHECKOUT INTERFACE
  // =========================================================================
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Membership Plans
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT PANEL */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Secure Checkout</h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-center justify-between p-4 border rounded-xl border-primary bg-primary/5 ring-1 ring-primary">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">Razorpay Gateway (UPI, Cards, NetBanking)</span>
                  </div>
                </div>
              </label>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Clicking the action confirmation controls below will seamlessly launch up the secure encrypted gateway payment window canvas to let you approve charges instantly.
              </p>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Configuring Secure Checkout Session...</span>
                  </>
                ) : (
                  <span>Proceed to Pay {formattedPrice}</span>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified 256-Bit SSL Payment Security Logs</span>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-sm text-white">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full mb-3 border border-primary/30">
                Selected Matrimony Plan
              </span>
              <h3 className="text-2xl font-bold truncate">{plan.name}</h3>
              <p className="text-slate-400 text-sm mt-1">Plan Coverage: {uiPeriodText}</p>
              {plan.description && <p className="text-slate-400 text-xs mt-2 italic border-l-2 border-primary/40 pl-2">{plan.description}</p>}

              <div className="mt-6 space-y-3 border-t border-slate-700/60 pt-4">
                {plan.specifications.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
              <h4 className="font-semibold text-gray-900 mb-2">Order Calculations</h4>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Base Membership Fee</span>
                <span>{formattedPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Integrated Taxes & Fees</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total Amount Due</span>
                <span className="text-primary">{formattedPrice}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}