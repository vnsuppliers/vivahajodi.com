import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => (
  <DashboardLayout>
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
          <h2 className="font-display font-semibold text-foreground">Change Password</h2>
          <div><Label>Current Password</Label><Input type="password" className="mt-1.5" /></div>
          <div><Label>New Password</Label><Input type="password" className="mt-1.5" /></div>
          <div><Label>Confirm New Password</Label><Input type="password" className="mt-1.5" /></div>
          <Button>Update Password</Button>
        </TabsContent>

        <TabsContent value="privacy" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-5">
          <h2 className="font-display font-semibold text-foreground">Privacy Settings</h2>
          {[
            { label: "Hide phone number", desc: "Your phone number won't be visible to others" },
            { label: "Hide email address", desc: "Your email won't be visible to others" },
            { label: "Private profile", desc: "Only matched profiles can see your details" },
            { label: "Show profile only to matches", desc: "Restrict visibility to mutual matches" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="notifications" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-5">
          <h2 className="font-display font-semibold text-foreground">Notification Preferences</h2>
          {["Interests", "Messages", "Matches", "Profile Views"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{item}</p>
              <Switch defaultChecked />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
