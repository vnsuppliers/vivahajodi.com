import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { mockProfiles } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchesPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Matches</h1>
      <Tabs defaultValue="suggested">
        <TabsList>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="mutual">Mutual</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="suggested" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProfiles.map((p) => <ProfileCard key={p.id} profile={p} />)}
          </div>
        </TabsContent>
        <TabsContent value="mutual" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProfiles.slice(0, 2).map((p) => <ProfileCard key={p.id} profile={p} />)}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProfiles.slice(3, 6).map((p) => <ProfileCard key={p.id} profile={p} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default MatchesPage;
