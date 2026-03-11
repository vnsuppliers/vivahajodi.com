import { DashboardLayout } from "@/components/DashboardLayout";
import { mockReceivedInterests, mockSentInterests, mockProfiles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const getProfile = (id: string) => mockProfiles.find((p) => p.id === id);

const statusColors: Record<string, string> = {
  pending: "bg-accent/20 text-accent-foreground",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-destructive/10 text-destructive",
};

export const ReceivedInterestsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Received Interests</h1>
      <div className="space-y-3">
        {mockReceivedInterests.map((interest) => {
          const p = getProfile(interest.profileId);
          if (!p) return null;
          return (
            <div key={interest.id} className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
              <img src={p.avatar} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{p.name}, {p.age}</p>
                <p className="text-sm text-muted-foreground">{p.location} • {p.occupation}</p>
                <p className="text-xs text-muted-foreground">{interest.date}</p>
              </div>
              <Badge className={statusColors[interest.status]}>{interest.status}</Badge>
              <div className="flex gap-2">
                <Link to={`/dashboard/profile/${p.id}`}><Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button></Link>
                {interest.status === "pending" && (
                  <>
                    <Button size="sm" className="gap-1"><Check className="h-4 w-4" /> Accept</Button>
                    <Button size="sm" variant="outline" className="gap-1"><X className="h-4 w-4" /> Decline</Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </DashboardLayout>
);

export const SentInterestsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Sent Interests</h1>
      <div className="space-y-3">
        {mockSentInterests.map((interest) => {
          const p = getProfile(interest.profileId);
          if (!p) return null;
          return (
            <div key={interest.id} className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
              <img src={p.avatar} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{p.name}, {p.age}</p>
                <p className="text-sm text-muted-foreground">{p.location} • {p.occupation}</p>
                <p className="text-xs text-muted-foreground">{interest.date}</p>
              </div>
              <Badge className={statusColors[interest.status]}>{interest.status}</Badge>
              <Link to={`/dashboard/profile/${p.id}`}><Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button></Link>
            </div>
          );
        })}
      </div>
    </div>
  </DashboardLayout>
);
