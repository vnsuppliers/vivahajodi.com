import { DashboardLayout } from "@/components/DashboardLayout";
import { mockNotifications } from "@/data/mockData";
import { Bell, Heart, MessageCircle, Eye, Users, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  interest: Heart, message: MessageCircle, view: Eye, match: Users, like: ThumbsUp,
};

const NotificationsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>
      <div className="space-y-2">
        {mockNotifications.map((n) => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border border-border ${!n.read ? "bg-rose-light shadow-card" : "bg-card"}`}>
              <div className={`p-2 rounded-full ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
                <Icon className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  </DashboardLayout>
);

export default NotificationsPage;
