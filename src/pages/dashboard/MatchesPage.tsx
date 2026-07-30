import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchedProfileService } from "@/services/matched_profile.service";

const mapProfile = (p: any) => {
  const user = p?.user;
  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";

  const physical = Array.isArray(user?.physical_attributes)
    ? user.physical_attributes[0]
    : user?.physical_attributes;

  const education = user?.education_info?.sort((a: any, b: any) => b.id - a.id)?.[0];
  const profession = user?.professionInfos?.sort((a: any, b: any) => b.id - a.id)?.[0];
  const address = user?.present_address;

  const age = p?.date_of_birth
    ? Math.floor((Date.now() - new Date(p.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : undefined;

  return {
    id: user?.id,
    name: `${firstName} ${lastName}`.trim() || "Unknown",
    age,
    about: p?.about ?? undefined,
    religion: p?.religion_master?.name ?? undefined,
    motherTongue: p?.motherTongue?.name ?? undefined,
    caste: p?.caste ?? undefined,
    subCaste: p?.sub_caste !== "NA" ? p?.sub_caste : undefined,
    location: address?.address_line1
      ? `${address.address_line1}, ${address.address_line2 || ""}`.trim().replace(/,$/, "")
      : undefined,
    education: education?.college_name ?? undefined,
    occupation: profession?.company_name ?? undefined,
    height: physical?.height ?? undefined,
    gender: p?.gender_id === 1 ? "Male" : p?.gender_id === 2 ? "Female" : undefined,
    avatar: p?.user?.member?.profile_image ?? undefined,
    matchScore: p?.matchScore ?? 0,
  };
};

const MatchesPage = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Can be number code or string code ("BLOCKED", "SUSPENDED", etc.)
  const [userStatus, setUserStatus] = useState<number | string>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await MatchedProfileService.getMatchedProfiles();
        const mapped = Array.isArray(data) ? data.map(mapProfile) : [];
        setProfiles(mapped);
        setUserStatus(1); // Conditions satisfied -> Show data view
      } catch (err: any) {
        console.error("Failed to load matched profiles", err);
        setProfiles([]);

        const backendMessage = err?.response?.data?.message || "";
        const errorCode = err?.response?.data?.errorCode || "";
        const status = err?.response?.status;
        setStatusMessage(backendMessage);

        // --- STRATEGY: Direct error code evaluation ---
        if (status === 402 || status === 426) {
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
            // fallback matching string patterns if errorCode is missing
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

    fetchProfiles();
  }, []);

  const highMatch = profiles.filter((p) => p.matchScore >= 50);
  const newProfiles = profiles.slice(0, 6);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Matches
        </h1>

        {/* Dynamic State Guard Check */}
        {userStatus !== 1 ? (
          <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
        ) : (
          <Tabs defaultValue="suggested">
            <TabsList>
              <TabsTrigger value="suggested">
                Suggested ({profiles.length})
              </TabsTrigger>
              <TabsTrigger value="mutual">
                Mutual ({highMatch.length})
              </TabsTrigger>
              <TabsTrigger value="new">
                New ({newProfiles.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="suggested" className="mt-4">
              {loading ? (
                <p className="text-muted-foreground text-sm">Loading...</p>
              ) : profiles.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No matched profiles found.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profiles.map((p) => (
                    <ProfileCard key={p.id} profile={p} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="mutual" className="mt-4">
              {highMatch.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No high-match profiles yet. Profiles with 50%+ match appear here.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {highMatch.map((p) => (
                    <ProfileCard key={p.id} profile={p} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="new" className="mt-4">
              {newProfiles.length === 0 ? (
                <p className="text-muted-foreground text-sm">No new matches yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newProfiles.map((p) => (
                    <ProfileCard key={p.id} profile={p} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MatchesPage;