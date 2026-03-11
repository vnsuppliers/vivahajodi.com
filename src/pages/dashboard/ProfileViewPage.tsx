import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { mockProfiles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, MessageCircle, Flag, ShieldBan, Share2, ArrowLeft } from "lucide-react";

const ProfileViewPage = () => {
  const { id } = useParams();
  const profile = mockProfiles.find((p) => p.id === id);

  if (!profile) return (
    <DashboardLayout>
      <div className="text-center py-20 text-muted-foreground">Profile not found</div>
    </DashboardLayout>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <h3 className="font-display font-semibold text-foreground mb-3">{title}</h3>
      {children}
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-1.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <Link to="/dashboard/search" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Search
        </Link>

        {/* Header */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
          <div className="gradient-hero h-32" />
          <div className="px-6 pb-6 -mt-12">
            <img src={profile.avatar} alt={profile.name} className="h-24 w-24 rounded-full border-4 border-background object-cover" />
            <div className="mt-3 flex items-start justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">{profile.name}, {profile.age}</h1>
                <p className="text-muted-foreground">{profile.location} • {profile.religion}</p>
              </div>
              <div className="flex gap-2">
                <Button className="gap-1.5"><Heart className="h-4 w-4" /> Send Interest</Button>
                <Button variant="outline" size="icon"><Bookmark className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><MessageCircle className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Basic Information">
            <Field label="Height" value={profile.height} />
            <Field label="Marital Status" value={profile.maritalStatus} />
            <Field label="Mother Tongue" value={profile.motherTongue} />
            <Field label="Caste" value={profile.caste} />
          </Section>

          <Section title="Professional Details">
            <Field label="Education" value={profile.education} />
            <Field label="Occupation" value={profile.occupation} />
            <Field label="Income" value={profile.income} />
          </Section>

          <Section title="Lifestyle">
            <Field label="Diet" value={profile.diet} />
            <Field label="Smoking" value={profile.smoking} />
            <Field label="Drinking" value={profile.drinking} />
          </Section>

          <Section title="Family Details">
            <Field label="Family Type" value={profile.familyType} />
            <Field label="Father's Occupation" value={profile.fatherOccupation} />
            <Field label="Mother's Occupation" value={profile.motherOccupation} />
          </Section>
        </div>

        <Section title="About">
          <p className="text-sm text-muted-foreground">{profile.about}</p>
        </Section>

        <Section title="Partner Preferences">
          <Field label="Age Range" value={profile.partnerPreferences.ageRange} />
          <Field label="Religion" value={profile.partnerPreferences.religion} />
          <Field label="Location" value={profile.partnerPreferences.location} />
          <Field label="Education" value={profile.partnerPreferences.education} />
        </Section>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="gap-1.5 text-destructive hover:text-destructive"><Flag className="h-4 w-4" /> Report</Button>
          <Button variant="outline" className="gap-1.5 text-destructive hover:text-destructive"><ShieldBan className="h-4 w-4" /> Block</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileViewPage;
