import { 
  Ruler, Scale, Accessibility, Activity, Eye, Scissors, 
  Heart, Sparkles, Shirt, Footprints, ShieldAlert, FileText, Calendar 
} from "lucide-react";

const PhysicalTab = ({ profile }: any) => {
  const p = profile?.user?.physical_attributes;

  if (!p) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Activity className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No physical attributes object found in payload.</p>
      </div>
    );
  }

  // Helper function to render null values clearly instead of hiding them
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "None";
    return val;
  };

  return (
    /* Added relative and overflow-hidden classes to house the top line positioning safely */
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden">
      
      {/* Top indicator color line to match your design system theme across all tabs */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/60">
        <Activity className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base">Physical Attributes </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* height */}
        <div className="flex gap-3">
          <Ruler className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Height</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.height)}</span>
          </div>
        </div>

        {/* weight */}
        <div className="flex gap-3">
          <Scale className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Weight</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.weight)}</span>
          </div>
        </div>

        {/* body_type */}
        <div className="flex gap-3">
          <Accessibility className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Body Type</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.body_type)}</span>
          </div>
        </div>

        {/* complexion */}
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Complexion</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.complexion)}</span>
          </div>
        </div>

        {/* physical_status */}
        <div className="flex gap-3">
          <Accessibility className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Physical Status</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.physical_status)}</span>
          </div>
        </div>

        {/* blood_group */}
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Blood Group</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.blood_group)}</span>
          </div>
        </div>

        {/* eye_color */}
        <div className="flex gap-3">
          <Eye className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Eye Color</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.eye_color)}</span>
          </div>
        </div>

        {/* hair_color */}
        <div className="flex gap-3">
          <Scissors className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Hair Color</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.hair_color)}</span>
          </div>
        </div>

        {/* hair_type */}
        <div className="flex gap-3">
          <Scissors className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Hair Type</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.hair_type)}</span>
          </div>
        </div>

        {/* hair_length */}
        <div className="flex gap-3">
          <Scissors className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Hair Length</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.hair_length)}</span>
          </div>
        </div>

        {/* skin_tone */}
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Skin Tone</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.skin_tone)}</span>
          </div>
        </div>

        {/* fitness_level */}
        <div className="flex gap-3">
          <Activity className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Fitness Level</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.fitness_level)}</span>
          </div>
        </div>

        {/* disability */}
        <div className="flex gap-3">
          <ShieldAlert className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Has Disability</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.disability)}</span>
          </div>
        </div>

        {/* disability_details */}
        <div className="flex gap-3">
          <ShieldAlert className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Disability Details</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.disability_details)}</span>
          </div>
        </div>

        {/* spectacles */}
        <div className="flex gap-3">
          <Eye className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Spectacles</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.spectacles)}</span>
          </div>
        </div>

        {/* lens_usage */}
        <div className="flex gap-3">
          <Eye className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Lenses</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.lens_usage)}</span>
          </div>
        </div>

        {/* beard_style */}
        <div className="flex gap-3">
          <Scissors className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Beard Style</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.beard_style)}</span>
          </div>
        </div>

        {/* tattoo */}
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Tattoo</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.tattoo)}</span>
          </div>
        </div>

        {/* physique */}
        <div className="flex gap-3">
          <Accessibility className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Physique</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.physique)}</span>
          </div>
        </div>

        {/* shoe_size */}
        <div className="flex gap-3">
          <Footprints className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Shoe Size</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.shoe_size)}</span>
          </div>
        </div>

        {/* dress_size */}
        <div className="flex gap-3">
          <Shirt className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Dress Size</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.dress_size)}</span>
          </div>
        </div>

        {/* health_condition */}
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Health Condition</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.health_condition)}</span>
          </div>
        </div>

        {/* medical_conditions */}
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Medical Conditions</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.medical_conditions)}</span>
          </div>
        </div>

        {/* genetic_disorders */}
        <div className="flex gap-3">
          <Heart className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Genetic Disorders</span>
            <span className="text-sm font-medium text-foreground">{renderValue(p.genetic_disorders)}</span>
          </div>
        </div>

        {/* created_at */}
        <div className="flex gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Created At</span>
            <span className="text-xs font-medium text-foreground">{renderValue(p.created_at)}</span>
          </div>
        </div>

        {/* updated_at - Cleaned up explicit responsive column spans to preserve natural layout flow */}
        <div className="flex gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Updated At</span>
            <span className="text-xs font-medium text-foreground">{renderValue(p.updated_at)}</span>
          </div>
        </div>

      </div>

      {/* appearance_notes */}
      <div className="mt-5 pt-4 border-t border-border/40 flex gap-3">
        <FileText className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
        <div className="space-y-0.5 w-full">
          <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance Notes</span>
          <p className="text-sm text-foreground italic bg-muted/30 p-3 rounded-lg border border-border/50">
            "{renderValue(p.appearance_notes)}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhysicalTab;