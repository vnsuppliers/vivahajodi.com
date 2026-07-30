import { Briefcase, Building2, BadgeCheck, CircleDollarSign, MapPin, FileText } from "lucide-react";

const ProfessionTab = ({ profile }: any) => {
  const professionList = profile?.user?.professionInfos || [];

  if (professionList.length === 0) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Briefcase className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No professional history profiles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {professionList.map((job: any, index: number) => (
        /* Added relative and overflow-hidden here so the top gradient border bounds perfectly inside each job card */
        <div key={job.id || index} className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden">
          
          {/* Top indicator color line to match your design system theme across all tabs */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/60">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-base">
              {job.profession?.profession_name || "Employment Profile"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            <div className="flex gap-3">
              <BadgeCheck className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Designation
                </span>
                <span className="text-sm font-medium text-foreground">
                  {job.designation?.designation_name || "Not Specified"}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Company Name
                </span>
                <span className="text-sm font-medium text-foreground">
                  {job.company_name || "Not Specified"}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <CircleDollarSign className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Annual Income
                </span>
                <span className="text-sm font-medium text-foreground">
                  {job.income || "Not Specified"}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Work Experience
                </span>
                <span className="text-sm font-medium text-foreground">
                  {job.experience || "Not Specified"}
                </span>
              </div>
            </div>

            <div className="flex gap-3 sm:col-span-2">
              <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Job Location
                </span>
                <span className="text-sm font-medium text-foreground">
                  {job.location || "Not Specified"}
                </span>
              </div>
            </div>

          </div>

          {job.description && (
            <div className="mt-5 pt-4 border-t border-border/40 flex gap-3">
              <FileText className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Job Description
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default ProfessionTab;