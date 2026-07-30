import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { BlockService } from "@/services/block.service";
import { ReportProfileService } from "@/services/report_profile.service";
import { NotificationService } from "@/services/notifications.service";
import { toast } from "sonner";
import {
  Loader2,
  Bell,
  Heart,
  MessageCircle,
  Eye,
  Users,
  ThumbsUp,
  BellOff,
  ShieldCheck,
  UserCheck,
  AlertOctagon
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  interest: Heart,
  message: MessageCircle,
  view: Eye,
  match: Users,
  like: ThumbsUp,
  report: AlertOctagon
};

// --- REUSABLE ATTRACTIVE BRANDED EMPTY STATE ---
const BeautifulEmptyState = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => (
  <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-4">
    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 space-y-4">
      <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
        <Icon className="h-7 w-7 stroke-[1.5]" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 space-y-3">
    <Loader2 className="h-8 w-8 animate-spin text-primary stroke-[2.5]" />
    <p className="text-sm text-muted-foreground font-medium tracking-wide animate-pulse">Retrieving secure logs...</p>
  </div>
);

const extractStatus = (err: any, setStatus: (s: number | string) => void, setMsg: (m: string) => void) => {
  const backendMessage = err?.response?.data?.message || "";
  const errorCode = err?.response?.data?.errorCode || "";
  const status = err?.response?.status;
  setMsg(backendMessage);

  if (status === 402 || status === 426) {
    setStatus(5);
  } else if (status === 403) {
    if (errorCode === "BLOCKED") {
      setStatus("BLOCKED");
    } else if (errorCode === "UNDER_REVIEW") {
      setStatus(0);
    } else if (errorCode === "DEACTIVATED") {
      setStatus(3);
    } else if (errorCode === "SUSPENDED") {
      setStatus(2);
    } else {
      const lowerMsg = backendMessage.toLowerCase();
      if (lowerMsg.includes("blocked")) setStatus("BLOCKED");
      else if (lowerMsg.includes("deactivated")) setStatus(3);
      else if (lowerMsg.includes("suspended")) setStatus(2);
      else setStatus(0);
    }
  } else if (status === 401) {
    setStatus(4);
  } else {
    setStatus(0);
  }
};

// --- BLOCKED USERS PAGE ---
export const BlockedUsersPage = () => {
  const [blockedList, setBlockedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    BlockService.getList().then(data => {
      setBlockedList(Array.isArray(data) ? data : []);
      setUserStatus(1);
    }).catch((err) => {
      extractStatus(err, setUserStatus, setStatusMessage);
    }).finally(() => setLoading(false));
  }, []);

  const handleUnblock = async (id: number) => {
    if (userStatus !== 1) return;
    try {
      await BlockService.unblock(id);
      setBlockedList(prev => prev.filter(item => item.blocked_user_id !== id));
      toast.success("User unblocked successfully");
    } catch {
      toast.error("Failed to lift restriction.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Blocked Users</h1>
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <LoadingSpinner />
        ) : blockedList.length === 0 ? (
          <BeautifulEmptyState
            title="Privacy Slate Clean"
            description="You currently have no members blocked inside your active profile configurations."
            icon={UserCheck}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blockedList.map(item => (
              <div key={item.id} className="bg-card border border-border p-5 rounded-2xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-base">
                    {item.blockedUser?.first_name} {item.blockedUser?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">Restricted account view space</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleUnblock(item.blocked_user_id)} className="font-semibold text-xs rounded-xl h-9 px-4 border-input hover:bg-muted">
                  Unblock User
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// --- SUBMITTED REPORTS PAGE ---
export const SubmittedReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    ReportProfileService.getSubmittedReports().then(data => {
      setReports(Array.isArray(data) ? data : []);
      setUserStatus(1);
    }).catch((err) => {
      extractStatus(err, setUserStatus, setStatusMessage);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Submitted Report History</h1>
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <LoadingSpinner />
        ) : reports.length === 0 ? (
          <BeautifulEmptyState
            title="No Outbound Grievances"
            description="Your outbox shows no record listings of platform violations filed against community profiles."
            icon={ShieldCheck}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map(r => (
              <div key={r.id} className="bg-card border border-border p-6 rounded-2xl space-y-4 shadow-sm">
                <div className="flex items-start justify-between border-b border-border/60 pb-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reported Account</p>
                    <p className="font-semibold text-foreground text-base">{r.reportedUser?.first_name || "Community Member"}</p>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full select-none">
                    Filed
                  </span>
                </div>
                <div className="space-y-1.5 bg-muted/30 rounded-xl p-3 border border-border/40">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide">Reason Statement</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// --- RECEIVED REPORTS PAGE ---
export const ReceievedReportPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    ReportProfileService.getReceivedReports().then(data => {
      setReports(Array.isArray(data) ? data : []);
      setUserStatus(1);
    }).catch((err) => {
      extractStatus(err, setUserStatus, setStatusMessage);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Received Report History</h1>
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <LoadingSpinner />
        ) : reports.length === 0 ? (
          <BeautifulEmptyState
            title="Profile Standing Healthy"
            description="Excellent. Your workspace carries clean indicators with no security incidents received from the platform team."
            icon={ShieldCheck}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map(r => (
              <div key={r.id} className="bg-card border border-destructive/20 p-6 rounded-2xl space-y-4 shadow-sm hover:border-destructive/30 transition-colors">
                <div className="flex items-start justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20 shadow-inner">
                      <AlertOctagon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dispute Status</p>
                      <p className="font-semibold text-foreground text-sm">Anonymous Notification</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-destructive bg-destructive/10 border border-destructive/20 px-3 py-1 rounded-full select-none">
                    Under Review
                  </span>
                </div>
                <div className="space-y-2 bg-destructive/[0.02] border border-destructive/10 rounded-xl p-4">
                  <p className="text-xs font-bold text-destructive uppercase tracking-wide flex items-center gap-1.5">
                    Flagged Incident Statement
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {r.reason || "No specification provided by the reporter pipeline."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// --- NOTIFICATIONS PAGE ---
export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    NotificationService.getNotifications().then(data => {
      setNotifications(Array.isArray(data) ? data : []);
      setUserStatus(1);
    }).catch((err) => {
      extractStatus(err, setUserStatus, setStatusMessage);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Notifications</h1>
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <LoadingSpinner />
        ) : notifications.length === 0 ? (
          <BeautifulEmptyState
            title="All Caught Up!"
            description="When you receive new connection interests, secure messages, or system profile events, updates show here."
            icon={BellOff}
          />
        ) : (
          <div className="space-y-2.5">
            {notifications.map(n => {
              const Icon = iconMap[n.type] || Bell;
              return (
                <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${!n.is_read ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card border-border hover:bg-muted/10"}`}>
                  <div className={`p-2 rounded-full ${!n.is_read ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold text-foreground ${!n.is_read ? "text-primary" : ""}`}>{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};