import { Heart, Sparkles, Music, Film, BookOpen, Trophy, Dumbbell, Languages, Tv, Compass } from "lucide-react";

const HobbiesTab = ({ profile }: any) => {
  // Extract hobbies_info array safely (takes the first record if available)
  const hobbiesData = profile?.user?.hobbies_info?.[0] || null;

  if (!hobbiesData) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Heart className="h-8 w-8 mb-2 opacity-40 animate-pulse" />
        <p className="text-sm font-medium">No hobbies or interest records found.</p>
      </div>
    );
  }

  // Helper function to render data safely or fallback cleanly
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "—";
    return val;
  };

  // Helper to render comma-separated text strings as beautiful badge pills
  const renderBadges = (rawCsvText: string, badgeStyles: string) => {
    if (!rawCsvText) return <span className="text-sm font-bold text-foreground/40">—</span>;
    
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {rawCsvText.split(",").map((item: string, idx: number) => {
          const cleanItem = item.trim();
          if (!cleanItem) return null;
          return (
            <span
              key={idx}
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border tracking-wide transition-colors ${badgeStyles}`}
            >
              {cleanItem}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
      {/* Absolute top indicator gradient color bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header Section */}
      <div className="p-6 pb-3 flex items-center gap-2.5">
        <Heart className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Hobbies & Personal Interests</h3>
      </div>

      {/* Profile Info Grid Layout */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
        
        {/* Hobbies (Badges) */}
        <div className="flex items-start gap-3 sm:col-span-2 md:col-span-3">
          <Heart className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5 w-full">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Hobbies
            </span>
            {renderBadges(hobbiesData.hobbies, "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400")}
          </div>
        </div>

        {/* Interests (Badges) */}
        <div className="flex items-start gap-3 sm:col-span-2 md:col-span-3 border-b border-border/40 pb-4 mb-2">
          <Sparkles className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5 w-full">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Interests & Passions
            </span>
            {renderBadges(hobbiesData.interests, "bg-pink-500/10 text-pink-700 border-pink-500/20 dark:text-pink-400")}
          </div>
        </div>

        {/* Languages Known (Badges style) */}
        <div className="flex items-start gap-3">
          <Languages className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5 w-full">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Languages Known
            </span>
            {renderBadges(hobbiesData.languages_known, "bg-muted text-muted-foreground border-border")}
          </div>
        </div>

        {/* Sports */}
        <div className="flex items-start gap-3">
          <Trophy className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sports
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(hobbiesData.sports)}
            </span>
          </div>
        </div>

        {/* Activities / Fitness */}
        <div className="flex items-start gap-3">
          <Dumbbell className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Activities & Fitness
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(hobbiesData.activities)}
            </span>
          </div>
        </div>

        {/* Favorite Music */}
        <div className="flex items-start gap-3">
          <Music className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Favorite Music
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(hobbiesData.favorite_music)}
            </span>
          </div>
        </div>

        {/* Favorite Movies */}
        <div className="flex items-start gap-3">
          <Film className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Favorite Movies
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(hobbiesData.favorite_movies)}
            </span>
          </div>
        </div>

        {/* Favorite Books */}
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Favorite Books
            </span>
            <span className="text-sm font-bold text-foreground whitespace-normal">
              {renderValue(hobbiesData.favorite_books)}
            </span>
          </div>
        </div>

        {/* Entertainment Preferences */}
        <div className="flex items-start gap-3">
          <Tv className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Entertainment
            </span>
            <span className="text-sm font-bold text-foreground">
              {renderValue(hobbiesData.entertainment_preferences)}
            </span>
          </div>
        </div>

        {/* Travel Interests */}
        <div className="flex items-start gap-3">
          <Compass className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Travel Interests
            </span>
            <span className="text-sm font-bold text-foreground whitespace-normal">
              {renderValue(hobbiesData.travel_interests)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HobbiesTab;