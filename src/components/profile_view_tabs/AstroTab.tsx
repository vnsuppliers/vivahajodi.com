import { Sun, Moon, MapPin, Clock, Star, BookOpen, FileText } from "lucide-react";

// Helper map to convert Zodiac IDs into English (Telugu Script) names
const ZODIAC_MAP: Record<number, string> = {
  1: "Aries (మేషం)",
  2: "Taurus (వృషభం)",
  3: "Gemini (మిథునం)",
  4: "Cancer (కర్కాటకం)",
  5: "Leo (సింహం)",
  6: "Virgo (కన్య)",
  7: "Libra (తుల)",
  8: "Scorpio (వృశ్చికం)",
  9: "Sagittarius (ధనుస్సు)",
  10: "Capricorn (మకరం)",
  11: "Aquarius (కుంభం)",
  12: "Pisces (మీనం)",
};

const AstroTab = ({ profile }: any) => {
  const astro = profile?.user?.astro || null;

  if (!astro) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Sun className="h-8 w-8 mb-2 opacity-40 animate-pulse" />
        <p className="text-sm font-medium">No astronomical details found.</p>
      </div>
    );
  }

  // Fallback helper for missing fields
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
        <Sun className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Astronomic Information</h3>
      </div>

      {/* Profile Style Info Grid Layout */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
        
        {/* Zodiac Sign (Mapped ID to English + Telugu Script) */}
        <div className="flex items-start gap-3">
          <Sun className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Zodiac Sign
            </span>
            <span className="text-sm font-bold text-foreground">
              {astro.zodiac_sign ? (ZODIAC_MAP[astro.zodiac_sign] || `Sign Code: ${astro.zodiac_sign}`) : "—"}
            </span>
          </div>
        </div>

        {/* Moon Sign */}
        <div className="flex items-start gap-3">
          <Moon className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Moon Sign
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(astro.moon_sign)}
            </span>
          </div>
        </div>

        {/* Padam */}
        <div className="flex items-start gap-3">
          <Star className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Padam
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(astro.padam)}
            </span>
          </div>
        </div>

        {/* Gothram */}
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Gothram
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(astro.gothram)}
            </span>
          </div>
        </div>

        {/* Place of Birth */}
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Place of Birth
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(astro.place_of_birth)}
            </span>
          </div>
        </div>

        {/* Time of Birth */}
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Time of Birth
            </span>
            <span className="text-sm font-bold text-foreground font-mono">
              {renderValue(astro.time_of_birth)}
            </span>
          </div>
        </div>

        {/* Astro Notes */}
        {astro.astro_notes && (
          <div className="flex items-start gap-3 sm:col-span-2 md:col-span-3 border-t border-border/40 pt-4 mt-2">
            <FileText className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Astro Notes
              </span>
              <p className="text-sm font-medium text-foreground whitespace-normal">
                {astro.astro_notes}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AstroTab;