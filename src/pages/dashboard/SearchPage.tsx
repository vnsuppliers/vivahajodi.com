import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { profileService } from "@/services/profileList.service";

const SELECT_CLASS = "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground h-10";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // 1 = Active, or string code ("BLOCKED", "SUSPENDED", etc.)
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [filters, setFilters] = useState({
    gender: "",
    religion: "",
    minAge: "",
    maxAge: "",
    location: "",
  });

  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await profileService.getprofiles({
        search: query || undefined,
        gender: filters.gender || undefined,
        religion: filters.religion || undefined,
        minAge: filters.minAge || undefined,
        maxAge: filters.maxAge || undefined,
        location: filters.location || undefined,
      });

      setProfiles(res || []);
      setUserStatus(1);
    } catch (err: any) {
      console.error(err);
      setProfiles([]);

      const backendMessage = err?.response?.data?.message || "";
      const errorCode = err?.response?.data?.errorCode || "";
      const status = err?.response?.status;
      setStatusMessage(backendMessage);

      if (status === 402) {
        setUserStatus(5);
      } else if (status === 403) {
        if (errorCode === "BLOCKED") {
          setUserStatus("BLOCKED");
        } else if (errorCode === "UNDER_REVIEW") {
          setUserStatus(0);
        } else if (errorCode === "DEACTIVATED") {
          setUserStatus(3);
        } else if (errorCode === "SUSPENDED") {
          setUserStatus(2);
        } else {
          // fallback checks matching strings
          const lowerMsg = backendMessage.toLowerCase();
          if (lowerMsg.includes("blocked")) setUserStatus("BLOCKED");
          else if (lowerMsg.includes("deactivated")) setUserStatus(3);
          else if (lowerMsg.includes("suspended")) setUserStatus(2);
          else setUserStatus(0);
        }
      } else if (status === 401) {
        setUserStatus(4);
      } else {
        setUserStatus(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = () => {
    if (userStatus !== 1) return;
    fetchProfiles();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Search Profiles</h1>
          {userStatus === 1 && (
            <p className="text-sm text-muted-foreground mt-1">
              Find your perfect match across our verified community.
            </p>
          )}
        </div>

        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : (
          <>
            <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>

                <Button onClick={handleSearch}>Search</Button>
              </div>

              {showAdvanced && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border">
                  <select
                    className={SELECT_CLASS}
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <select
                    className={SELECT_CLASS}
                    value={filters.religion}
                    onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
                  >
                    <option value="">All Religions</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Sikhism">Sikhism</option>
                  </select>

                  <Input
                    placeholder="Min Age"
                    type="number"
                    value={filters.minAge}
                    onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                  />

                  <Input
                    placeholder="Max Age"
                    type="number"
                    value={filters.maxAge}
                    onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                  />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground font-medium">
              {loading ? "Loading results..." : `${profiles.length} profiles found`}
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-72 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profile) => {
                  const dob = new Date(profile.date_of_birth);
                  const age = new Date().getFullYear() - dob.getFullYear();

                  return (
                    <ProfileCard
                      key={profile.user.id}
                      profile={{
                        id: profile.user.id,
                        name: `${profile?.user?.first_name || ""} ${profile?.user?.last_name || ""}`,
                        age,
                        location: profile?.user?.present_address?.address_line1 || "N/A",
                        education: profile?.user?.education_info?.[0]?.college_name || "N/A",
                        occupation: profile?.user?.professionInfos?.[0]?.company_name || "N/A",
                        religion: profile?.religion_master?.name || "N/A",
                        height: profile?.user?.physical_attributes?.height || "N/A",
                        gender: profile.gender_id === 3 ? "Other" : undefined,
                        avatar: profile?.user?.member?.profile_image || "",
                      }}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;