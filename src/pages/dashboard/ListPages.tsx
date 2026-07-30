import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { ShortlistService } from "@/services/Shortlist.service";
import { ProfileVisitorsService } from "@/services/profile_visitors_service";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FolderHeart, Users } from "lucide-react";

interface VisitHistory {
  id: number;
  visited_at: string;
}

interface VisitorEntry {
  viewer: {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  visit_count: number;
  last_visited: string;
  visit_history: VisitHistory[];
}

export const ShortlistedPage = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await ShortlistService.getList();
        const list = res.data ?? res;

        const formatted = list.map((item: any) => {
          const user = item.shortlisted_to_user;
          return {
            id: user.id,
            name: `${user.first_name ?? ""} ${user.last_name ?? ""}`,
            avatar: user.avatar || "",
            age: user.age,
            location: user.permanent_address?.address_line1 || "",
            education: user.education_info?.[0]?.edumaster?.name || "",
            occupation: user.professionInfos?.[0]?.designation?.designation_name || "",
          };
        });

        setProfiles(formatted);
        setUserStatus(1);
      } catch (err: any) {
        console.error(err);
        setProfiles([]);

        const backendMessage = err?.response?.data?.message || "";
        const errorCode = err?.response?.data?.errorCode || "";
        const status = err?.response?.status;
        setStatusMessage(backendMessage);

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

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Shortlisted Profiles
        </h1>

        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-muted animate-pulse border border-border" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-8">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                <FolderHeart className="h-7 w-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                  Your Shortlist is Empty
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                  Save profiles you find interesting while browsing to easily access them and connect later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export const VisitorsPage = () => {
  const [visitors, setVisitors] = useState<VisitorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorEntry | null>(null);

  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const visitorsData = await ProfileVisitorsService.getVisitors();
        setVisitors(Array.isArray(visitorsData) ? visitorsData : []);
        setUserStatus(1);
      } catch (err: any) {
        console.error("Error loading visitors:", err);
        setVisitors([]);

        const backendMessage = err?.response?.data?.message || "";
        const errorCode = err?.response?.data?.errorCode || "";
        const status = err?.response?.status;
        setStatusMessage(backendMessage);

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
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Profile Visitors</h1>

        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 w-full bg-muted animate-pulse rounded-xl border border-border" />
            ))}
          </div>
        ) : visitors.length === 0 ? (
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-8">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                <Users className="h-7 w-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                  No Profile Visitors Yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                  Activity insights will populate here when other members interact with or browse your profile features.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {visitors.map((v, i) => (
              <div key={v.viewer?.id || i} className="bg-card rounded-xl border border-border p-4 shadow-sm flex items-center justify-between gap-4 w-full hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm uppercase select-none">
                    {(v.viewer?.first_name?.[0] || "") + (v.viewer?.last_name?.[0] || "")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{v.viewer?.first_name} {v.viewer?.last_name}</p>
                    <p className="text-xs text-muted-foreground">Visited {v.visit_count} times</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVisitor(v)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/95 shadow-sm transition-all active:scale-[0.98]"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedVisitor} onOpenChange={() => setSelectedVisitor(null)}>
        <DialogContent className="sm:max-w-2xl flex flex-col max-h-[90vh] p-0 overflow-hidden shadow-2xl border border-border">
          <div className="flex-none px-8 py-6 border-b border-border bg-background">
            <DialogTitle className="text-xl font-bold text-foreground">
              Visit History: {selectedVisitor?.viewer.first_name} {selectedVisitor?.viewer.last_name}
            </DialogTitle>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-background">
            {selectedVisitor?.visit_history.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">Visited on:</span>
                <span className="text-sm font-semibold text-foreground">
                  {new Date(h.visited_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-none px-8 py-6 border-t border-border bg-muted/20">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedVisitor(null)}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/95 shadow-sm transition-all active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};