import { MapPin, Hash, Home } from "lucide-react";

const PermanentAddressTab = ({ profile }: any) => {
  const permAddress = profile?.user?.permanent_address || null;

  if (!permAddress) {
    return (
      <div className="bg-card p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center text-muted-foreground">
        <Home className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm font-medium">No permanent address details found.</p>
      </div>
    );
  }

  const renderValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "—";
    return val;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />

      {/* Header Section */}
      <div className="p-6 pb-3 flex items-center gap-2.5">
        <Home className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Permanent Address</h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Top Section: Address Lines 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-border/40">
          {/* Address Line 1 */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Address Line 1
              </span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(permAddress.address_line1)}
              </span>
            </div>
          </div>

          {/* Address Line 2 */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-purple-500/80 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Address Line 2
              </span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(permAddress.address_line2)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Remaining Regional Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* City */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                City
              </span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(permAddress.citymaster?.name)}
              </span>
            </div>
          </div>

          {/* State */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                State
              </span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(permAddress.statemaster?.name)}
              </span>
            </div>
          </div>

          {/* Country */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Country
              </span>
              <span className="text-sm font-bold text-foreground whitespace-normal">
                {renderValue(permAddress.countrymaster?.name)}
              </span>
            </div>
          </div>

          {/* Pincode */}
          <div className="flex items-start gap-3">
            <Hash className="h-5 w-5 text-muted-foreground/70 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pincode
              </span>
              <span className="text-sm font-bold text-foreground font-mono">
                {renderValue(permAddress.pincode)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PermanentAddressTab;