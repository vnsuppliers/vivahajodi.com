import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InterestCard } from "@/components/interests/InterestCard";
import { InterestsService } from "@/services/interests.service";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { HeartHandshake } from "lucide-react";

export const SentInterestsPage = () => {
  const [interests, setInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Can be number code or string code ("BLOCKED", "SUSPENDED", etc.)
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await InterestsService.getSent();
      setInterests(data || []);
      setUserStatus(1);
    } catch (err: any) {
      console.error(err);
      setInterests([]);

      const backendMessage = err?.response?.data?.message || "";
      const errorCode = err?.response?.data?.errorCode || "";
      const status = err?.response?.status;
      setStatusMessage(backendMessage);

      // --- STRATEGY: Premium restrictions & error code evaluation ---
      if (status === 402 || status === 426) {
        setUserStatus(5);
      } else if (status === 403) {
        if (errorCode === "BLOCKED") {
          setUserStatus("BLOCKED");
        } else if (errorCode === "UNDER_REVIEW") {
          setUserStatus(0);
        } else if (errorCode === "DEACTIVATED") {
          setUserStatus(3);
        } else if (errorCode === "SUSPENDED") {
          setUserStatus(2);
        } else {
          // fallback matching string patterns if errorCode is missing
          const lowerMsg = backendMessage.toLowerCase();
          if (lowerMsg.includes("blocked")) setUserStatus("BLOCKED");
          else if (lowerMsg.includes("deactivated")) setUserStatus(3);
          else if (lowerMsg.includes("suspended")) setUserStatus(2);
          else setUserStatus(0);
        }
      } else if (status === 401) {
        setUserStatus(4);
      } else {
        setUserStatus(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    const handleFocus = () => {
      load();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Sent Interests</h1>

        {/* Dynamic Condition Evaluation */}
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-full bg-muted animate-pulse rounded-xl border border-border" />
            ))}
          </div>
        ) : interests.length === 0 ? (
          /* High-End, Branded Empty State Design using System Colors */
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-8">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                <HeartHandshake className="h-7 w-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                  No Sent Interests Yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                  Start exploring profiles to express interest. Your sent connection requests will instantly be tracked right here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {interests.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={{
                  ...interest,
                  status:
                    interest.status === 0
                      ? "pending"
                      : interest.status === 1
                        ? "accepted"
                        : "rejected",
                }}
                profile={{
                  id: interest.to.id,
                  name: `${interest.to.first_name} ${interest.to.last_name}`,
                  avatar: interest.to.profile_image ?? "",
                  location: [
                    interest.to.present_address?.address_line1,
                    interest.to.present_address?.countrymaster?.name,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A",
                  occupation:
                    interest.to.profession_info?.company_name ?? "N/A",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};