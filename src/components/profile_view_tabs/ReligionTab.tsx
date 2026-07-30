import { Sparkles, HeartHandshake, Languages, Users } from "lucide-react";

const ReligionTab = ({ profile }: any) => {
  return (
    /* Added relative and overflow-hidden classes to house the top line positioning safely */
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden">

      {/* Top indicator color line to match your design system theme across all tabs */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/60">
        <Sparkles className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base">Religion & Culture</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Religion */}
        <div className="flex gap-3">
          <HeartHandshake className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Religion</span>
            <span className="text-sm font-medium text-foreground">
              {profile?.religion_master?.name || "Not Specified"}
            </span>
          </div>
        </div>

        {/* Mother Tongue */}
        <div className="flex gap-3">
          <Languages className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Mother Tongue</span>
            <span className="text-sm font-medium text-foreground">
              {profile?.motherTongue?.name || "Not Specified"}
            </span>
          </div>
        </div>

        {/* Caste */}
        <div className="flex gap-3">
          <Users className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Caste Group</span>
            <span className="text-sm font-medium text-foreground">
              {profile?.caste || "Not Specified"}
            </span>
          </div>
        </div>

        {/* Sub-Caste */}
        <div className="flex gap-3">
          <Users className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Sub-Caste</span>
            <span className="text-sm font-medium text-foreground">
              {profile?.sub_caste && profile.sub_caste !== "NA" ? profile.sub_caste : "None"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReligionTab;