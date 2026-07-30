import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BlockService } from "../../services/block.service";
import { encodeId, decodeId } from "@/utils/encodeId";

import {
  Heart,
  Bookmark,
  MessageCircle,
  Flag,
  ShieldBan,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { profileService } from "@/services/profileList.service";

/* TAB COMPONENTS */
import EducationTab from "@/components/profile_view_tabs/EducationTab";
import ProfessionTab from "@/components/profile_view_tabs/ProfessionTab";
import PhysicalTab from "@/components/profile_view_tabs/PhysicalTab";
import ReligionTab from "@/components/profile_view_tabs/ReligionTab";
import PresentAddressTab from "@/components/profile_view_tabs/PresentAddressTab";
import AboutTab from "@/components/profile_view_tabs/AboutTab";
import AstroTab from "@/components/profile_view_tabs/AstroTab";
import FamilyInfoTab from "@/components/profile_view_tabs/FamilyInfoTab";
import HobbiesTab from "@/components/profile_view_tabs/HobbiesTab";
import LifestyleTab from "@/components/profile_view_tabs/LifestyleTab";
import PermanentAddressTab from "@/components/profile_view_tabs/PermanentAddressTab";
import RelativeInfoTab from "@/components/profile_view_tabs/RelativeInfoTab";
import SiblingsInfoTab from "@/components/profile_view_tabs/SiblingsInfoTab";
import { InterestsService } from "@/services/interests.service";
import { toast } from "sonner";
import { BookmarkService } from "@/services/bookmark.service";
import ReportModal from "@/components/modals/ReportProfileModal";
import { ReportProfileService } from "@/services/report_profile.service";
import BlockProfileModal from "@/components/modals/BlockProfileModal";
import { ShortlistService } from "@/services/Shortlist.service";
import { ProfileVisitorsService } from "@/services/profile_visitors_service";
import ProfileGalleryTab from "@/components/profile_view_tabs/ProfileGalleryTab";
import { Loader2 } from "lucide-react";

const ProfileViewPage = () => {
  const { id } = useParams();
  const userId = id ? decodeId(id) : null;

  const [profile, setProfile] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [interestStatus, setInterestStatus] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const [isBlocked, setIsBlocked] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [blockReasonType, setBlockReasonType] = useState<
    'harassment' | 'fake_profile' | 'not_interested' | 'other' | ''
  >("");

  const [isShortlisted, setIsShortlisted] = useState(false);

  const fetchProfile = async (id: number) => {
    const res = await profileService.getProfileById(id);
    setProfile(res);
  };



  const [interestLoading, setInterestLoading] = useState(false);
  const [shortlistLoading, setShortlistLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);

  useEffect(() => {
    if (userId) fetchProfile(userId);
  }, [userId]);

  // Check interest status
  useEffect(() => {
    const loadInterest = async () => {
      try {
        const sent = await InterestsService.getSent();
        const received = await InterestsService.getReceived();

        const all = [...sent, ...received];

        const interest = all.find(
          (item: any) =>
            item.interested_to === userId ||
            item.to?.id === userId ||
            item.interested_by === userId ||
            item.by?.id === userId
        );

        setInterestStatus(interest ? interest.status : null);
      } catch (err) {
        console.error(err);
        setInterestStatus(null);
      }
    };

    if (userId) loadInterest();
  }, [userId]);

  // Check bookmark status
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const list = await BookmarkService.getList();
        const exists = list.some((item: any) => item.receiver.id === userId);
        setIsBookmarked(exists);
      } catch {
        setIsBookmarked(false);
      }
    };

    if (userId) loadBookmarks();
  }, [userId]);

  // Check report status
  useEffect(() => {
    const checkReport = async () => {
      try {
        const res = await ReportProfileService.status(userId);
        setIsReported(res.isReported);
      } catch {
        setIsReported(false);
      }
    };

    if (userId) checkReport();
  }, [userId]);

  // Block status check
  useEffect(() => {
    const loadBlockedList = async () => {
      try {
        const list = await BlockService.getList();
        const exists = list.some((item: any) => item.blocked_user_id === userId);
        setIsBlocked(exists);
      } catch {
        setIsBlocked(false);
      }
    };

    if (userId) loadBlockedList();
  }, [userId]);

  // Shortlist check
  useEffect(() => {
    const check = async () => {
      try {
        if (!userId) return;
        const res = await ShortlistService.check(userId);
        setIsShortlisted(res.isShortlisted);
      } catch (err) {
        setIsShortlisted(false);
      }
    };

    check();
  }, [userId]);

  // Log profile visit
  useEffect(() => {
    const storeVisit = async () => {
      if (!userId) return;
      try {
        await ProfileVisitorsService.addVisit(userId);
      } catch (err) {
        console.error("visit not stored", err);
      }
    };

    storeVisit();
  }, [userId]);

  const initials = `${profile?.user?.first_name?.[0] || ""}${profile?.user?.last_name?.[0] || ""}`.toUpperCase();

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleInterest = async () => {
    try {
      if (!userId) return;

      setInterestLoading(true);

      const res = await InterestsService.addToInterests(userId);
      setInterestStatus(0);
      toast.success(res?.message || "Interest sent successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setInterestLoading(false);
    }
  };

  const toggleShortlist = async () => {
    try {
      if (!userId) return;

      setShortlistLoading(true);

      if (isShortlisted) {
        const res = await ShortlistService.remove(userId);
        setIsShortlisted(false);
        toast.success(res?.message || "Removed from shortlist");
      } else {
        const res = await ShortlistService.add(userId);
        setIsShortlisted(true);
        toast.success(res?.message || "Added to shortlist");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setShortlistLoading(false);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (!userId) return;

      setBookmarkLoading(true);

      if (isBookmarked) {
        const res = await BookmarkService.remove(userId);
        setIsBookmarked(false);
        toast.success(res?.message || "Removed from bookmarks");
      } else {
        const res = await BookmarkService.add(userId);
        setIsBookmarked(true);
        toast.success(res?.message || "Added to bookmarks");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update bookmark");
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleBlock = async () => {
    try {
      if (!userId) return;

      setBlockLoading(true);

      if (isBlocked) {
        const res = await BlockService.unblock(userId);
        setIsBlocked(false);
        toast.success(res?.message || "Unblocked");
      } else {
        const res = await BlockService.block(userId, {
          reason: blockReason,
          reason_type: blockReasonType,
        });
        setIsBlocked(true);
        toast.success(res?.message || "Blocked");
      }

      setBlockOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setBlockLoading(false);
    }
  };

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="h-screen flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen space-y-6 px-4 md:px-10 py-6">

        {/* BACK BUTTON */}
        <Link to="/dashboard/search" className="text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors w-max">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        {/* PROFILE HEADER CARD */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="h-32 sm:h-44 bg-gradient-to-r from-purple-500 to-pink-500" />

          <div className="px-6 pb-6 -mt-14 sm:-mt-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">

            <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left gap-4 w-full md:w-auto">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-background shadow-md overflow-hidden shrink-0">
                {profile?.user?.member?.profile_image ? (
                  <img
                    src={profile.user.member.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                    {initials}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  {profile?.user?.first_name} {profile?.user?.last_name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {profile?.user?.present_address?.address_line1 || "No Location Specified"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
              <Button
                variant="default"
                className="w-full sm:w-auto shadow-sm"
                onClick={handleInterest}
                disabled={interestStatus !== null || interestLoading}
              >
                {interestLoading ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Heart className="h-4 w-4 mr-1.5" />
                )}

                {interestLoading
                  ? "Sending..."
                  : interestStatus === 0
                    ? "Pending"
                    : interestStatus === 1
                      ? "Accepted"
                      : interestStatus === 2
                        ? "Rejected"
                        : "Interest"}
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {/* Bookmark */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isBookmarked ? "default" : "outline"}
                        size="icon"
                        className={`h-9 w-9 ${isBookmarked ? "text-yellow-500" : ""}`}
                        onClick={toggleBookmark}
                        disabled={bookmarkLoading}
                      >
                        {bookmarkLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                        )}
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Send message */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`/dashboard/messages?user=${encodeId(profile?.user?.id)}`}>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>

                    <TooltipContent>
                      Send Message
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Shortlist */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isShortlisted ? "default" : "outline"}
                        size="icon"
                        className={`h-9 w-9 ${isShortlisted ? "text-yellow-500" : ""}`}
                        onClick={toggleShortlist}
                        disabled={shortlistLoading}
                      >
                        {shortlistLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Star className={`h-4 w-4 ${isShortlisted ? "fill-current" : ""}`} />
                        )}
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      {isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Report */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-9 w-9 ${isReported
                            ? "text-red-600 bg-red-50"
                            : "text-red-500 hover:text-red-600 hover:bg-red-50"
                          }`}
                        onClick={() => setReportOpen(true)}
                      >
                        <Flag className={`h-4 w-4 ${isReported ? "fill-current" : ""}`} />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      {isReported ? "Already Reported" : "Report Profile"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Block */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-9 w-9 ${isBlocked
                            ? "text-red-600 bg-red-50"
                            : "text-red-500 hover:text-red-600 hover:bg-red-50"
                          }`}
                        onClick={() => setBlockOpen(true)}
                        disabled={blockLoading}
                      >
                        {blockLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ShieldBan className={`h-4 w-4 ${isBlocked ? "fill-current" : ""}`} />
                        )}
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      {isBlocked ? "Unblock Profile" : "Block Profile"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

          </div>
        </div>

        {/* ABOUT ACCENT BLOCK */}
        <AboutTab about={profile?.about} />

        {/* DETAIL PROFILE TABS */}
        <Tabs defaultValue="education" className="w-full">
          <div className="relative w-full flex items-center">

            <button
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
              aria-label="Scroll Tabs Left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scroll-smooth px-9"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`div::-webkit-scrollbar { display: none !important; }`}</style>

              <TabsList className="flex w-max gap-1 bg-muted/50 border border-border/60 rounded-lg p-1">
                <TabsTrigger value="gallery" className="text-xs sm:text-sm">Gallery</TabsTrigger>
                <TabsTrigger value="education" className="text-xs sm:text-sm">Education</TabsTrigger>
                <TabsTrigger value="profession" className="text-xs sm:text-sm">Profession</TabsTrigger>
                <TabsTrigger value="physical" className="text-xs sm:text-sm">Physical attributes</TabsTrigger>
                <TabsTrigger value="religion" className="text-xs sm:text-sm">Religion</TabsTrigger>
                <TabsTrigger value="present-address" className="text-xs sm:text-sm">Present address</TabsTrigger>
                <TabsTrigger value="permanent-address" className="text-xs sm:text-sm">Permanent address</TabsTrigger>
                <TabsTrigger value="astro" className="text-xs sm:text-sm">Astronomic</TabsTrigger>
                <TabsTrigger value="family" className="text-xs sm:text-sm">Family</TabsTrigger>
                <TabsTrigger value="hobbies" className="text-xs sm:text-sm">Hobbies</TabsTrigger>
                <TabsTrigger value="life-style" className="text-xs sm:text-sm">Lifestyle</TabsTrigger>
                <TabsTrigger value="relatives" className="text-xs sm:text-sm">Relatives</TabsTrigger>
                <TabsTrigger value="siblings" className="text-xs sm:text-sm">Siblings</TabsTrigger>
              </TabsList>
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
              aria-label="Scroll Tabs Right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>

          <div className="mt-4">

            <TabsContent value="gallery" className="focus-visible:outline-none">
              <ProfileGalleryTab profile={profile} />
            </TabsContent>
            <TabsContent value="education" className="focus-visible:outline-none">
              <EducationTab profile={profile} />
            </TabsContent>
            <TabsContent value="profession" className="focus-visible:outline-none">
              <ProfessionTab profile={profile} />
            </TabsContent>
            <TabsContent value="physical" className="focus-visible:outline-none">
              <PhysicalTab profile={profile} />
            </TabsContent>
            <TabsContent value="religion" className="focus-visible:outline-none">
              <ReligionTab profile={profile} />
            </TabsContent>
            <TabsContent value="present-address" className="focus-visible:outline-none">
              <PresentAddressTab profile={profile} />
            </TabsContent>
            <TabsContent value="permanent-address" className="focus-visible:outline-none">
              <PermanentAddressTab profile={profile} />
            </TabsContent>
            <TabsContent value="astro" className="focus-visible:outline-none">
              <AstroTab profile={profile} />
            </TabsContent>
            <TabsContent value="family" className="focus-visible:outline-none">
              <FamilyInfoTab profile={profile} />
            </TabsContent>
            <TabsContent value="hobbies" className="focus-visible:outline-none">
              <HobbiesTab profile={profile} />
            </TabsContent>
            <TabsContent value="life-style" className="focus-visible:outline-none">
              <LifestyleTab profile={profile} />
            </TabsContent>
            <TabsContent value="relatives" className="focus-visible:outline-none">
              <RelativeInfoTab profile={profile} />
            </TabsContent>
            <TabsContent value="siblings" className="focus-visible:outline-none">
              <SiblingsInfoTab profile={profile} />
            </TabsContent>
          </div>

        </Tabs>
      </div>

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        reportedUserId={userId!}
        onSuccess={() => setIsReported(true)}
      />
      <BlockProfileModal
        open={blockOpen}
        onClose={() => setBlockOpen(false)}
        isBlocked={isBlocked}
        blockReasonType={blockReasonType}
        setBlockReasonType={setBlockReasonType}
        blockReason={blockReason}
        setBlockReason={setBlockReason}
        onConfirm={handleBlock}
      />
    </DashboardLayout>
  );
};

export default ProfileViewPage;