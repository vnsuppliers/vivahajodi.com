import { Heart, Eye, MessageCircle, Users, Bookmark, Bell, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProfileCard } from "@/components/ProfileCard";
import { mockProfiles, mockNotifications } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";

const stats = [
  { label: "Profile Views", value: "142", icon: Eye, color: "text-primary" },
  { label: "Interests", value: "23", icon: Heart, color: "text-primary" },
  { label: "Messages", value: "8", icon: MessageCircle, color: "text-accent" },
  { label: "Matches", value: "12", icon: Users, color: "text-gold" },
  { label: "Shortlisted", value: "15", icon: Bookmark, color: "text-primary" },
  { label: "Notifications", value: "5", icon: Bell, color: "text-accent" },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const profileComplete = user?.profileComplete ?? 72;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your profile</p>
        </div>

        {/* Profile completion */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Profile Completion</span>
            </div>
            <span className="text-sm font-semibold text-primary">{profileComplete}%</span>
          </div>
          <Progress value={profileComplete} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">Complete your profile to get better matches</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center shadow-card">
              <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent notifications */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h2 className="font-display font-semibold text-foreground mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            {mockNotifications.slice(0, 4).map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg ${!n.read ? "bg-rose-light" : "bg-muted/50"}`}>
                <Bell className={`h-4 w-4 mt-0.5 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Matches */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Suggested Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProfiles.slice(0, 3).map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
