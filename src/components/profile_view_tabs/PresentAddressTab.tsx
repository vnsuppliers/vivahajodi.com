import { MapPin, Home, Hash, Calendar, Activity, Globe, Landmark } from "lucide-react";

const PresentAddressTab = ({ profile }: any) => {
  const addr = profile?.user?.present_address;

  if (!addr) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <MapPin className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No address details object found in payload.</p>
      </div>
    );
  }

  // Helper function to explicitly show empty or null fields as "None"
  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "None";
    return val;
  };

  return (
    /* Added relative and overflow-hidden classes to make the border gradient mount properly */
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden">

      {/* Top indicator color line to match your education styling perfectly */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/60">
        <Home className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base">Present Address (All System Fields)</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* address_line1 */}
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Address Line 1</span>
            <span className="text-sm font-medium text-foreground">{renderValue(addr.address_line1)}</span>
          </div>
        </div>

        {/* address_line2 */}
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Address Line 2</span>
            <span className="text-sm font-medium text-foreground">{renderValue(addr.address_line2)}</span>
          </div>
        </div>

        {/* countrymaster -> name */}
        <div className="flex gap-3">
          <Globe className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Country Name</span>
            <span className="text-sm font-medium text-foreground">{renderValue(addr.countrymaster?.name)}</span>
          </div>
        </div>

        {/* statemaster -> name */}
        <div className="flex gap-3">
          <Landmark className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">State Name</span>
            <span className="text-sm font-medium text-foreground">{renderValue(addr.statemaster?.name)}</span>
          </div>
        </div>

        {/* citymaster -> name */}
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">City Name</span>
            <span className="text-sm font-medium text-foreground">{renderValue(addr.citymaster?.name)}</span>
          </div>
        </div>

        {/* pincode */}
        <div className="flex gap-3">
          <Hash className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Pincode</span>
            <span className="text-sm font-medium text-foreground tracking-wide">{renderValue(addr.pincode)}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PresentAddressTab;