import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const MyProfilePage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>

        <div className="bg-card rounded-xl border border-border p-6 shadow-card flex items-center gap-6">
          <div className="h-20 w-20 rounded-full gradient-hero flex items-center justify-center text-2xl font-bold text-primary-foreground font-display">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">{user?.firstName} {user?.lastName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <Button size="sm" variant="outline" className="mt-2">Upload Photo</Button>
          </div>
        </div>

        <Tabs defaultValue="basic">
          <TabsList className="flex-wrap">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="religious">Religious</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input defaultValue={`${user?.firstName} ${user?.lastName}`} className="mt-1.5" /></div>
              <div><Label>Gender</Label><Input defaultValue={user?.gender} className="mt-1.5" /></div>
              <div><Label>Date of Birth</Label><Input type="date" className="mt-1.5" /></div>
              <div><Label>Height</Label><Input placeholder="5'6\"" className="mt-1.5" /></div>
              <div><Label>Weight</Label><Input placeholder="65 kg" className="mt-1.5" /></div>
              <div><Label>Marital Status</Label><Input placeholder="Never Married" className="mt-1.5" /></div>
            </div>
            <div><Label>About Me</Label><Textarea placeholder="Tell us about yourself..." className="mt-1.5" rows={4} /></div>
            <Button>Save Changes</Button>
          </TabsContent>

          <TabsContent value="religious" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Religion</Label><Input placeholder="Hindu" className="mt-1.5" /></div>
              <div><Label>Caste</Label><Input placeholder="e.g. Sharma" className="mt-1.5" /></div>
              <div><Label>Sub Caste</Label><Input className="mt-1.5" /></div>
              <div><Label>Mother Tongue</Label><Input placeholder="Hindi" className="mt-1.5" /></div>
              <div><Label>Horoscope</Label><Input placeholder="Aries" className="mt-1.5" /></div>
            </div>
            <Button>Save Changes</Button>
          </TabsContent>

          <TabsContent value="professional" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Education</Label><Input placeholder="MBA" className="mt-1.5" /></div>
              <div><Label>Occupation</Label><Input placeholder="Software Engineer" className="mt-1.5" /></div>
              <div><Label>Company</Label><Input placeholder="Company name" className="mt-1.5" /></div>
              <div><Label>Annual Income</Label><Input placeholder="₹10-15 LPA" className="mt-1.5" /></div>
            </div>
            <Button>Save Changes</Button>
          </TabsContent>

          <TabsContent value="family" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Father's Occupation</Label><Input className="mt-1.5" /></div>
              <div><Label>Mother's Occupation</Label><Input className="mt-1.5" /></div>
              <div><Label>Family Type</Label><Input placeholder="Nuclear / Joint" className="mt-1.5" /></div>
              <div><Label>Family Status</Label><Input placeholder="Middle Class" className="mt-1.5" /></div>
            </div>
            <Button>Save Changes</Button>
          </TabsContent>

          <TabsContent value="lifestyle" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Diet</Label><Input placeholder="Vegetarian" className="mt-1.5" /></div>
              <div><Label>Smoking</Label><Input placeholder="No" className="mt-1.5" /></div>
              <div><Label>Drinking</Label><Input placeholder="No" className="mt-1.5" /></div>
            </div>
            <Button>Save Changes</Button>
          </TabsContent>

          <TabsContent value="preferences" className="bg-card rounded-xl border border-border p-6 mt-4 shadow-card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Preferred Age Range</Label><Input placeholder="25-30" className="mt-1.5" /></div>
              <div><Label>Preferred Religion</Label><Input placeholder="Any" className="mt-1.5" /></div>
              <div><Label>Preferred Location</Label><Input placeholder="Any" className="mt-1.5" /></div>
              <div><Label>Preferred Education</Label><Input placeholder="Graduate+" className="mt-1.5" /></div>
            </div>
            <Button>Save Changes</Button>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyProfilePage;
