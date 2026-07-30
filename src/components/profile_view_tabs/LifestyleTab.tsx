import { CupSoda, Cigarette, Wine, Accessibility, Activity, Flame, Clock, Users, Coffee, Plane, Utensils, Shirt, Dog, Car, Scale, Sparkles } from "lucide-react";

const LifestyleTab = ({ profile }: any) => {
 
    const lifestyle = profile?.user?.lifestyleInfo || null;

    if (!lifestyle) {
        return (
            <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-sm font-medium">No lifestyle details found.</p>
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
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-base text-foreground">Lifestyle & Preferences</h3>
            </div>

            <div className="p-6 space-y-8">

                {/* =========================================================
            SECTION 1: DAILY HABITS & ROUTINES
           ========================================================= */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-border/60 pb-1.5 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> Daily Habits & Routines
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">

                        {/* Sleep Habit */}
                        <div className="flex items-start gap-3">
                            <Coffee className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sleep Habit</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.sleep_habit)}</span>
                            </div>
                        </div>

                        {/* Wake Up Time */}
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wake Up Time</span>
                                <span className="text-sm font-bold text-foreground font-mono">{renderValue(lifestyle.wake_up_time)}</span>
                            </div>
                        </div>

                        {/* Work Life Balance */}
                        <div className="flex items-start gap-3">
                            <Scale className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Work Life Balance</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.work_life_balance)}</span>
                            </div>
                        </div>

                        {/* Living Style */}
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Living Style</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.living_style)}</span>
                            </div>
                        </div>

                        {/* Food Habits */}
                        <div className="flex items-start gap-3">
                            <Utensils className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Food Habits</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.food_habits)}</span>
                            </div>
                        </div>

                        {/* Diet */}
                        <div className="flex items-start gap-3">
                            <CupSoda className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dietary Choice</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.diet)}</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* =========================================================
            SECTION 2: HEALTH & PHYSICAL STATUS
           ========================================================= */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-border/60 pb-1.5 flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" /> Health & Physical Profile
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">

                        {/* Body Type */}
                        <div className="flex items-start gap-3">
                            <Accessibility className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body Type</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.bodyType)}</span>
                            </div>
                        </div>

                        {/* Physical Status */}
                        <div className="flex items-start gap-3">
                            <Activity className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Physical Status</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.physical_status)}</span>
                            </div>
                        </div>

                        {/* Fitness Level */}
                        <div className="flex items-start gap-3">
                            <Flame className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fitness Level</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.fitness_level)}</span>
                            </div>
                        </div>

                        {/* Smoking Habits */}
                        <div className="flex items-start gap-3">
                            <Cigarette className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Smoker</span>
                                <span className={`text-sm font-bold ${lifestyle.smoking === "No" ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                                    {renderValue(lifestyle.smoking)}
                                </span>
                            </div>
                        </div>

                        {/* Drinking Habits */}
                        <div className="flex items-start gap-3">
                            <Wine className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Drinker</span>
                                <span className={`text-sm font-bold ${lifestyle.drinking === "No" ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                                    {renderValue(lifestyle.drinking)}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* =========================================================
            SECTION 3: PERSONAL PREFERENCES & VALUES
           ========================================================= */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-border/60 pb-1.5 flex items-center gap-1.5">
                        <Shirt className="h-3.5 w-3.5" /> Social & Personal Preferences
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">

                        {/* Social Habits */}
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Social Habits</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.social_habits)}</span>
                            </div>
                        </div>

                        {/* Travel Habits */}
                        <div className="flex items-start gap-3">
                            <Plane className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Travel Habits</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.travel_habits)}</span>
                            </div>
                        </div>

                        {/* Fashion Style */}
                        <div className="flex items-start gap-3">
                            <Shirt className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fashion Style</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.fashion_style)}</span>
                            </div>
                        </div>

                        {/* Pet Preference */}
                        <div className="flex items-start gap-3">
                            <Dog className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pet Preference</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.pet_preference)}</span>
                            </div>
                        </div>

                        {/* Driving Habit */}
                        <div className="flex items-start gap-3">
                            <Car className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Driving Habit</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.driving_habit)}</span>
                            </div>
                        </div>

                        {/* Religious Lifestyle */}
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Religious Lifestyle</span>
                                <span className="text-sm font-bold text-foreground">{renderValue(lifestyle.religious_ife_style)}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default LifestyleTab;