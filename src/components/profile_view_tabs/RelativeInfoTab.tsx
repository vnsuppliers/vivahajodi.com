import { Users, User, Briefcase, MapPin, Phone, Mail, FileText, Heart } from "lucide-react";

const RelativeInfoTab = ({ profile }: any) => {
  // Extract relative_info array safely
  const relatives = profile?.user?.relative_info || [];

  if (relatives.length === 0) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Users className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No relative information records found.</p>
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
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Relative Information</h3>
      </div>

      {/* Relatives Outer Container */}
      <div className="p-6 space-y-6">
        {relatives.map((relative: any, index: number) => (
          
          /* Single Relative Card Layout */
          <div 
            key={relative.id || index} 
            className="space-y-4 bg-muted/10 p-5 rounded-xl border border-border/50 relative overflow-hidden"
          >
            {/* Inner Header Block */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2 border-b border-border/60 pb-2">
              <Heart className="h-3.5 w-3.5" /> {renderValue(relative.relation)} Details
            </h4>

            {/* Horizontal Fields Grid Layer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6">
              
              {/* Relative Name */}
              <div className="flex gap-3">
                <User className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Relative Name
                  </span>
                  <span className="text-sm font-bold text-foreground whitespace-normal">
                    {renderValue(relative.relative_name)}
                  </span>
                </div>
              </div>

              {/* Occupation */}
              <div className="flex gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Occupation
                  </span>
                  <span className="text-sm font-bold text-foreground whitespace-normal">
                    {renderValue(relative.occupation)}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Location
                  </span>
                  <span className="text-sm font-bold text-foreground whitespace-normal">
                    {renderValue(relative.location)}
                  </span>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex gap-3">
                <Phone className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Contact Number
                  </span>
                  <span className="text-sm font-bold text-foreground font-mono">
                    {renderValue(relative.contact_number)}
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex gap-3">
                <Mail className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </span>
                  <span className="text-sm font-bold text-foreground break-all">
                    {renderValue(relative.email)}
                  </span>
                </div>
              </div>

              {/* Notes (Spans across all grid spaces layout row) */}
              {relative.notes && (
                <div className="flex gap-3 border-t border-border/40 pt-3 mt-1 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
                  <FileText className="h-4 w-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Notes
                    </span>
                    <p className="text-sm font-medium text-foreground whitespace-normal">
                      {relative.notes}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelativeInfoTab;