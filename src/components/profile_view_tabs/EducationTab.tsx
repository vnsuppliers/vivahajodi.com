import { GraduationCap, MapPin, Calendar } from "lucide-react";

const EducationTab = ({ profile }: any) => {
  const educationList = profile?.user?.education_info || [];

  if (educationList.length === 0) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <GraduationCap className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No education history details found.</p>
      </div>
    );
  }

  // Helper function to render data safely or fallback cleanly
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "—";
    return val;
  };

  // Sort by highest education to keep the primary record on top
  const sortedEducation = [...educationList].sort(
    (a, b) => (b.is_highest_education || 0) - (a.is_highest_education || 0)
  );

  return (
    <div className="space-y-4">
      {sortedEducation.map((edu: any, index: number) => {
        const isHighest = edu.is_highest_education === 1;

        return (
          <div
            key={edu.id || index}
            className={`bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden transition-all ${
              isHighest 
                ? "border-purple-500/30 ring-1 ring-purple-500/10" 
                : "border-border"
            }`}
          >
            {/* Top Indicator Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${
              isHighest ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-muted"
            }`} />

            {/* Header Area */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isHighest ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600" : "bg-muted text-muted-foreground"}`}>
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {edu.edumaster?.name || "Not Specified"}
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {edu.specialmaster?.name || "No Specialisation"}
                  </p>
                </div>
              </div>

              {isHighest && (
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full border border-purple-500/20">
                  Highest Education
                </span>
              )}
            </div>

            {/* Information Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm border-b border-border/60 pb-4 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">College Name</span>
                <span className="text-foreground font-medium">{renderValue(edu.college_name)}</span>
              </div>
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">University / Board</span>
                <span className="text-foreground font-medium">{renderValue(edu.university_name)}</span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Passing Year
                </span>
                <span className="text-foreground font-mono font-medium">{renderValue(edu.passing_year)}</span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">City</span>
                <span className="text-foreground font-medium">{renderValue(edu.citymaster?.name)}</span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">State</span>
                <span className="text-foreground font-medium">{renderValue(edu.statemaster?.name)}</span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Country</span>
                <span className="text-foreground font-medium">{renderValue(edu.countryMaster?.name)}</span>
              </div>
            </div>

            {/* Full Address Block Area */}
            <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-3 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
                <MapPin className="h-3 w-3" /> Full Institute Address
              </span>
              <p className="text-muted-foreground dark:text-foreground/80 leading-relaxed">
                {renderValue(edu.education_address)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EducationTab;