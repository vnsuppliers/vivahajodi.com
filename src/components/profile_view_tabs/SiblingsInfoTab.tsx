import { Users, Heart } from "lucide-react";

const SiblingsInfoTab = ({ profile }: any) => {
  // Extract siblings_info array safely
  const siblings = profile?.user?.siblings_info || [];

  if (siblings.length === 0) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Users className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No sibling information records found.</p>
      </div>
    );
  }

  // Fallback helper for missing fields
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "—";
    return val;
  };

  // Helper to figure out seniority string
  const getSeniorityBadge = (isElder: number) => {
    if (isElder === 1) {
      return (
        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wide">
          Elder
        </span>
      );
    }
    if (isElder === 0) {
      return (
        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wide">
          Younger
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
      {/* Absolute top indicator gradient color bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header Section */}
      <div className="p-6 pb-3 flex items-center gap-2.5">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Sibling Information</h3>
      </div>

      {/* Table Responsive Wrapper */}
      <div className="p-6 pt-2 overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="border-b border-border/60">
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider pl-2">Relation</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">DOB</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Marital Status</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Education & Profession</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Spouse Details</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Location IDs</th>
              <th className="pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider pr-2">Additional Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {siblings.map((sibling: any, index: number) => {
              const isMarried = sibling.marital_status?.toLowerCase() === "married";

              return (
                <tr 
                  key={sibling.id || index} 
                  className="hover:bg-muted/30 transition-colors group"
                >
                  {/* Relation + Seniority Tag */}
                  <td className="py-4 font-medium text-sm text-foreground pl-2 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Heart className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                      {renderValue(sibling.relation)}
                    </div>
                    <div>{getSeniorityBadge(sibling.is_elder)}</div>
                  </td>

                  {/* Sibling Name */}
                  <td className="py-4 text-sm font-bold text-foreground">
                    {renderValue(sibling.name)}
                  </td>

                  {/* Date of Birth */}
                  <td className="py-4 text-sm font-mono text-muted-foreground">
                    {renderValue(sibling.date_of_birth)}
                  </td>

                  {/* Marital Status */}
                  <td className="py-4 text-sm text-foreground">
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                      isMarried 
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {renderValue(sibling.marital_status)}
                    </span>
                  </td>

                  {/* Education & Employment Profession Block */}
                  <td className="py-4 text-sm space-y-0.5">
                    <div className="font-bold text-foreground">
                      {renderValue(sibling.educational_qualification)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sibling.profession ? sibling.profession : ""} 
                      {sibling.company_name ? ` at ${sibling.company_name}` : ""}
                      {!sibling.profession && !sibling.company_name && "—"}
                    </div>
                  </td>

                  {/* Spouse and Family details info */}
                  <td className="py-4 text-sm space-y-0.5">
                    {isMarried ? (
                      <>
                        <div className="font-bold text-foreground">
                          {renderValue(sibling.spouse_name)}
                        </div>
                        <div className="text-xs text-muted-foreground flex flex-col gap-0.5">
                          <span>{sibling.spouse_profession ? `Job: ${sibling.spouse_profession}` : ""}</span>
                          {sibling.children_count && (
                            <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
                              Children: {sibling.children_count}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-muted-foreground/40 text-xs italic">Not Applicable</span>
                    )}
                  </td>

                  {/* Location System Fields Data Column (Country, State, City IDs) */}
                  <td className="py-4 text-xs font-medium text-muted-foreground space-y-0.5">
                    <div><span className="font-semibold text-foreground/70">Country ID:</span> {renderValue(sibling.country_id)}</div>
                    <div><span className="font-semibold text-foreground/70">State ID:</span> {renderValue(sibling.state_id)}</div>
                    <div><span className="font-semibold text-foreground/70">City ID:</span> {renderValue(sibling.city_id)}</div>
                  </td>

                  {/* Additional Notes columns row */}
                  <td className="py-4 text-sm text-muted-foreground max-w-[220px] pr-2 break-words whitespace-normal font-medium">
                    {renderValue(sibling.additional_notes)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiblingsInfoTab;