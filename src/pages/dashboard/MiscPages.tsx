import { DashboardLayout } from "@/components/DashboardLayout";
import { mockProfiles } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export const BlockedUsersPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Blocked Users</h1>
      <div className="space-y-3">
        {mockProfiles.slice(0, 2).map((p) => (
          <div key={p.id} className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
            <img src={p.avatar} alt={p.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.location}</p>
            </div>
            <Button variant="outline" size="sm">Unblock</Button>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export const ReportsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Report History</h1>
      <div className="space-y-3">
        {[
          { name: "John Doe", reason: "Fake profile", date: "2026-03-08", status: "Under Review" },
          { name: "Jane Smith", reason: "Harassment", date: "2026-03-05", status: "Resolved" },
        ].map((r, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-medium text-foreground">{r.name}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${r.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : "bg-accent/20 text-accent-foreground"}`}>{r.status}</span>
            </div>
            <p className="text-sm text-muted-foreground">Reason: {r.reason}</p>
            <p className="text-xs text-muted-foreground">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);
