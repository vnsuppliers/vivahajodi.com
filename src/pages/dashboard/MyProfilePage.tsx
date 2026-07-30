import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BasicInfo from "@/components/my_profile/basic_info";
import { useEffect, useState, useRef, useCallback } from "react";
import { basicInfoService } from "@/services/basic_info.service";
import type { BasicInfoProfile } from "@/interfaces/basic-info.interface";
import ReligiousInfo from "@/components/my_profile/religious_info";
import EducationInfo from "@/components/my_profile/education_info";
import ProfessionInfo from "@/components/my_profile/profession_info";
import FamilyInfo from "@/components/my_profile/family_info";
import SiblingsInfo from "@/components/my_profile/siblings_info";
import LifeStyleInfo from "@/components/my_profile/life_style_info";
import PhysicalAttributesInfo from "@/components/my_profile/physical_attributes_info";
import HobbiesInfo from "@/components/my_profile/hobbies_info";
import RelativesInfo from "@/components/my_profile/relatives_info";
import PresentAddress from "@/components/my_profile/Present_address_info";
import PermanentAddress from "@/components/my_profile/Permanent_address_info";
import AstronomicInfo from "@/components/my_profile/Astronomic_info";
import UnderReview from "@/components/UnderReview";
import GalleryPage from "./GalleryPage";

const MyProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BasicInfoProfile | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const image = profile?.profile_image;
  const isUnderReview = Number(profile?.user?.is_verified) === 0;

  // Directly fetching profile information via the basic info service API
  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await basicInfoService.getBasicInfo(user.id);
      setProfile(res?.data ?? res);
    } catch (err) {
      console.log("PROFILE FETCH ERROR:", err);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              My Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and update your profile details
            </p>
          </div>
        </div>

        {/* Profile Card UI populated dynamically from basicInfoService payload data fields */}
        <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="h-28 w-28 rounded-full overflow-hidden shadow-lg">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full gradient-hero flex items-center justify-center text-4xl font-bold text-primary-foreground">
                    {profile?.user?.first_name?.[0] ?? "-"}
                    {profile?.user?.last_name?.[0] ?? "-"}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    {profile?.user?.first_name ?? ""} {profile?.user?.last_name ?? ""}
                  </h2>
                  <p className="text-muted-foreground text-base mt-1">
                    {profile?.user?.email ?? "-"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className={`rounded-full px-4 py-1 text-sm ${
                      profile?.user?.is_online == 1
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {profile?.user?.is_online == 1 ? "🟢 Online" : "⚫ Offline"}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className={`rounded-full px-4 py-1 text-sm ${
                      Number(profile?.user?.is_verified) === 1
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {Number(profile?.user?.is_verified) === 1
                      ? "✔ Approved"
                      : "Pending Approval"}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className={`rounded-full px-4 py-1 text-sm ${
                      Number(profile?.user?.is_premium) === 1
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {Number(profile?.user?.is_premium) === 1
                      ? "⭐ Premium"
                      : "Free Account"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <div className="rounded-2xl border border-border bg-background p-5 text-center">
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-sm text-muted-foreground">Profile Completion</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Profile Views</p>
              </div>
            </div>
          </div>
        </div>

        {isUnderReview ? (
          <UnderReview />
        ) : (
          <Tabs defaultValue="basic" className="w-full">
            <div className="relative flex items-center w-full bg-muted/20 rounded-2xl p-1 border border-border/50">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-1 z-10 h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
                onClick={() => scrollTabs("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto flex-nowrap scroll-smooth scrollbar-none px-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <TabsList className="flex flex-nowrap justify-start gap-2 h-auto p-1 bg-transparent w-max">
                  <TabsTrigger value="gallery" className="whitespace-nowrap">Gallery</TabsTrigger>
                  <TabsTrigger value="basic" className="whitespace-nowrap">Basic</TabsTrigger>
                  <TabsTrigger value="religious" className="whitespace-nowrap">Religious</TabsTrigger>
                  <TabsTrigger value="education" className="whitespace-nowrap">Education</TabsTrigger>
                  <TabsTrigger value="professional" className="whitespace-nowrap">Professional</TabsTrigger>
                  <TabsTrigger value="family" className="whitespace-nowrap">Family</TabsTrigger>
                  <TabsTrigger value="siblings" className="whitespace-nowrap">Siblings</TabsTrigger>
                  <TabsTrigger value="relatives_info" className="whitespace-nowrap">Relatives</TabsTrigger>
                  <TabsTrigger value="life_style" className="whitespace-nowrap">Life style</TabsTrigger>
                  <TabsTrigger value="hobbies" className="whitespace-nowrap">Hobbies</TabsTrigger>
                  <TabsTrigger value="pysical_attributes" className="whitespace-nowrap">Physical Attributes</TabsTrigger>
                  <TabsTrigger value="present_address" className="whitespace-nowrap">Present Address</TabsTrigger>
                  <TabsTrigger value="permanent_address" className="whitespace-nowrap">Permanent Address</TabsTrigger>
                  <TabsTrigger value="astronomic_info" className="whitespace-nowrap">Astronomic</TabsTrigger>
                </TabsList>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 z-10 h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
                onClick={() => scrollTabs("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="gallery">
              <GalleryPage userId={user?.id} profile={profile} onRefresh={fetchProfile} />
            </TabsContent>

            <TabsContent value="basic">
              <BasicInfo userId={user?.id} profile={profile} onRefresh={fetchProfile} />
            </TabsContent>

            <TabsContent value="religious">
              <ReligiousInfo userId={String(user?.id ?? "")} profile={profile} />
            </TabsContent>

            <TabsContent value="education">
              <EducationInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="professional">
              <ProfessionInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="family">
              <FamilyInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="siblings" className="overflow-hidden">
              <SiblingsInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="relatives_info" className="overflow-hidden">
              <RelativesInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="life_style">
              <LifeStyleInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="hobbies">
              <HobbiesInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="pysical_attributes">
              <PhysicalAttributesInfo userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="present_address">
              <PresentAddress userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="permanent_address">
              <PermanentAddress userId={user?.id || ""} />
            </TabsContent>

            <TabsContent value="astronomic_info">
              <AstronomicInfo userId={user?.id || ""} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyProfilePage;