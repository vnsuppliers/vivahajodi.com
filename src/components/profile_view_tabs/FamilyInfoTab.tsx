import { Users, User, Briefcase, GraduationCap, Heart, MapPin, Hash, Home } from "lucide-react";

const FamilyInfoTab = ({ profile }: any) => {
  // Extract familyInfo from the profile structure safely
  const family = profile?.user?.familyInfo || null;

  if (!family) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Users className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No family history details found.</p>
      </div>
    );
  }

  // Helper function to render data safely or fallback cleanly
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "—";
    return val;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
      
      {/* Absolute top indicator gradient color bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header Section */}
      <div className="p-6 pb-3 flex items-center gap-2.5">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Family Information</h3>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Section 1: Core Family Type & Values Badges */}
        <div className="flex flex-wrap gap-6 bg-muted/30 p-4 rounded-lg border border-border/40">
          <div className="flex items-center gap-3">
            <Home className="h-4 w-4 text-muted-foreground/80" />
            <div className="text-sm">
              <span className="text-muted-foreground mr-1.5 text-xs font-semibold uppercase tracking-wider">Family Type:</span>
              <span className="font-bold text-foreground capitalize">{renderValue(family.family_type)}</span>
            </div>
          </div>
          <div className="h-4 w-px bg-border/60 hidden sm:block" />
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-muted-foreground/80" />
            <div className="text-sm">
              <span className="text-muted-foreground mr-1.5 text-xs font-semibold uppercase tracking-wider">Family Values:</span>
              <span className="font-bold text-foreground capitalize">{renderValue(family.family_values)}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Parent Profile Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Father's Profile Block */}
          <div className="space-y-4 bg-muted/10 p-5 rounded-xl border border-border/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2 border-b border-border/60 pb-2">
              <User className="h-3.5 w-3.5" /> Father's Background
            </h4>
            
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <User className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Father's Name</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.father_name)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Occupation</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.father_occupation)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Education</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.father_education)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Heart className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.father_status)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mother's Profile Block */}
          <div className="space-y-4 bg-muted/10 p-5 rounded-xl border border-border/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2 border-b border-border/60 pb-2">
              <User className="h-3.5 w-3.5" /> Mother's Background
            </h4>

            <div className="space-y-3.5">
              <div className="flex gap-3">
                <User className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Mother's Name</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.mother_name)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Occupation</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.mother_occupation)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Education</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.mother_education)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Heart className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                  <span className="text-sm font-bold text-foreground">{renderValue(family.mother_status)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Geographical Location Group (Pulled via Master Objects) */}
        <div className="border-t border-border/50 pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* City Master Info */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">City</span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(family.citymaster?.name)}
              </span>
            </div>
          </div>

          {/* State Master Info */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(family.statemaster?.name)}
              </span>
            </div>
          </div>

          {/* Country Master Info */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Country</span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(family.countrymaster?.name)}
              </span>
            </div>
          </div>

          {/* Pincode Info */}
          <div className="flex items-start gap-3">
            <Hash className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pincode</span>
              <span className="text-sm font-bold text-foreground font-mono">
                {renderValue(family.pincode)}
              </span>
            </div>
          </div>

          {/* Complete Street Address Input Line */}
          <div className="flex items-start gap-3 sm:col-span-2 md:col-span-4 border-t border-border/40 pt-4">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Address</span>
              <p className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(family.address)}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FamilyInfoTab;