import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { mockProfiles } from "@/data/mockData";

export const ShortlistedPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Shortlisted Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProfiles.slice(0, 4).map((p) => <ProfileCard key={p.id} profile={p} />)}
      </div>
    </div>
  </DashboardLayout>
);

export const LikedProfilesPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Liked Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProfiles.slice(1, 5).map((p) => <ProfileCard key={p.id} profile={p} />)}
      </div>
    </div>
  </DashboardLayout>
);

export const VisitorsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Profile Visitors</h1>
      <div className="space-y-3">
        {mockProfiles.slice(0, 4).map((p) => (
          <div key={p.id} className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
            <img src={p.avatar} alt={p.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{p.name}, {p.age}</p>
              <p className="text-sm text-muted-foreground">{p.location}</p>
            </div>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);
