import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Bell,
  Heart,
  MessageCircle,
  Eye,
  Users,
  ThumbsUp,
  BellOff,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { NotificationService } from "@/services/notifications.service";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const iconMap: Record<string, React.ElementType> = {
  interest: Heart,
  message: MessageCircle,
  view: Eye,
  match: Users,
  like: ThumbsUp,
  report: AlertTriangle,
  bell: Bell,
};

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Can be number code or string code ("BLOCKED", "SUSPENDED", etc.)
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await NotificationService.getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
      setUserStatus(1);
    } catch (error: any) {
      console.error(error);
      setNotifications([]);

      const backendMessage = error?.response?.data?.message || "";
      const errorCode = error?.response?.data?.errorCode || "";
      const status = error?.response?.status;
      setStatusMessage(backendMessage);

      // Note: Premium statuses (402/426) are omitted here intentionally so active free users can read notifications
      if (status === 403) {
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

  const markAllRead = async () => {
    if (userStatus !== 1) return;
    try {
      await NotificationService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Could not update notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          {userStatus === 1 && notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Dynamic State Checks */}
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          /* High-End Empty Feed State using Native Theme Colors */
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-8">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                <BellOff className="h-7 w-7 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                  All Caught Up!
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  When you receive new connection interests, secure messages, or profile interactions, they will show up here instantly.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* NOTIFICATIONS LIST */
          <div className="space-y-2">
            {notifications.map((n) => {
              const Icon = iconMap[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${!n.is_read
                    ? "bg-primary/5 border-primary/20 shadow-sm"
                    : "bg-card border-border hover:bg-muted/20"
                    }`}
                >
                  <div className={`p-2 rounded-full ${!n.is_read ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold text-foreground ${!n.is_read ? "text-primary" : ""}`}>{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap select-none font-medium">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;