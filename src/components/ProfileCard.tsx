import { Link } from "react-router-dom";
import { Heart, Eye, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { encodeId } from "@/utils/encodeId";
import { useEffect, useState } from "react";
import { InterestsService } from "@/services/interests.service";
import { toast } from "sonner";
import { ProfileVisitorsService } from "@/services/profile_visitors_service";

export interface Profile {
  id: number;
  name: string;
  age?: number;
  about?: string;
  motherTongue?: string;
  caste?: string;
  religion?: string;
  subCaste?: string;
  avatar?: string;
  location?: string;
  education?: string;
  occupation?: string;
  height?: string;
  gender?: string;
  matchScore?: number;
}

interface ProfileCardProps {
  profile: Profile;
  compact?: boolean;
}

export const ProfileCard = ({ profile, compact }: ProfileCardProps) => {
  const initials =
    profile.name
      ?.split(" ")
      ?.map((w) => w[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "NA";

  type InterestStatus = 0 | 1 | 2 | null;

  const [interestStatus, setInterestStatus] = useState<InterestStatus>(null);
  const [loading, setLoading] = useState(false);
  const [interestId, setInterestId] = useState<number | null>(null);
  const [shortlistLoading, setShortlistLoading] = useState(false);

  useEffect(() => {
    const loadInterest = async () => {
      try {
        const sent = await InterestsService.getSent();
        const received = await InterestsService.getReceived();

        // Check sent first (so we know if WE sent it)
        const sentInterest = sent.find(
          (item: any) =>
            item.interested_to === profile.id ||
            item.to?.id === profile.id
        );

        if (sentInterest) {
          setInterestId(sentInterest.id);
          setInterestStatus(sentInterest.status);
          return;
        }

        // Then check received
        const receivedInterest = received.find(
          (item: any) =>
            item.interested_by === profile.id ||
            item.by?.id === profile.id
        );

        if (receivedInterest) {
          setInterestId(receivedInterest.id);
          setInterestStatus(receivedInterest.status);
          return;
        }

        setInterestStatus(null);
        setInterestId(null);
      } catch (error) {
        console.error(error);
        setInterestStatus(null);
      }
    };

    loadInterest();
  }, [profile.id]);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const res = await InterestsService.removeInterest(profile.id);
      setInterestStatus(null);
      setInterestId(null);
      toast.success(res?.message || "Interest cancelled");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to cancel interest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInterest = async () => {
      try {
        const sent = await InterestsService.getSent();
        const received = await InterestsService.getReceived();

        const all = [...sent, ...received];

        const interest = all.find(
          (item: any) =>
            item.interested_to === profile.id ||
            item.to?.id === profile.id ||
            item.interested_by === profile.id ||
            item.by?.id === profile.id
        );

        setInterestStatus(interest ? interest.status : null);
      } catch (error) {
        console.error(error);
        setInterestStatus(null);
      }
    };

    loadInterest();
  }, [profile.id]);

  const handleInterest = async () => {
    try {
      setLoading(true);

      //  Call the service to add to DB
      const res = await InterestsService.addToInterests(profile.id);

      //  Update state to '0' (Pending) so the button updates instantly
      setInterestStatus(0);

      toast.success(res?.message || "Interest sent successfully");
    } catch (err: any) {
      console.error("Interest error:", err);
      toast.error(err?.response?.data?.message || "Failed to send interest");
    } finally {
      setLoading(false);
    }
  };

  const matchColor =
    (profile.matchScore ?? 0) >= 75
      ? "bg-green-500 text-white"
      : (profile.matchScore ?? 0) >= 40
        ? "bg-yellow-400 text-yellow-900"
        : "bg-white/90 text-gray-700";

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">

      {/* AVATAR AREA */}
      <div className="relative w-full h-44 bg-primary overflow-hidden flex items-center justify-center">
        <span className="text-white text-5xl font-bold tracking-wide">
          {initials}
        </span>

        {profile.avatar && (
          <img
            src={profile.avatar}
            alt={profile.name}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Match badge */}
        {(profile.matchScore ?? 0) > 0 && (
          <span
            className={`absolute top-3 right-3 z-20 text-xs font-semibold px-2.5 py-1 rounded-full ${matchColor}`}
          >
            {profile.matchScore}% Match
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Name + Age */}
        <div>
          <h3 className="font-semibold text-base text-foreground leading-tight">
            {profile.name}
            {profile.age ? (
              <span className="text-muted-foreground font-normal">
                , {profile.age}
              </span>
            ) : null}
          </h3>

          {/* Location */}
          {profile.location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{profile.location}</span>
            </p>
          )}
        </div>

        {/* Key info pills */}
        <div className="flex flex-wrap gap-1.5">
          {profile.religion && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {profile.religion}
            </span>
          )}
          {profile.motherTongue && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {profile.motherTongue}
            </span>
          )}
          {profile.height && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {profile.height}
            </span>
          )}
          {profile.caste && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {profile.caste}
            </span>
          )}
        </div>

        {/* Education & Occupation */}
        {!compact && (
          <div className="space-y-1">
            {profile.education && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{profile.education}</span>
              </p>
            )}
            {profile.occupation && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{profile.occupation}</span>
              </p>
            )}
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* ACTIONS */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <Link
            to={`/dashboard/profile/${encodeId(profile.id)}`}
            onClick={() => ProfileVisitorsService.addVisit(profile.id)}
          >
            <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
              <Eye className="h-3.5 w-3.5" />
              View Profile
            </Button>
          </Link>

          <Button
            size="sm"
            className={`flex-1 gap-1.5 text-xs ${interestStatus === 0 ? "bg-amber-500 hover:bg-red-500" : ""
              }`}
            onClick={interestStatus === 0 ? handleCancel : handleInterest}
            disabled={
              (interestStatus !== null && interestStatus !== 0) ||
              loading ||
              shortlistLoading
            }
          >
            <Heart className="h-3.5 w-3.5" />
            {loading
              ? interestStatus === 0
                ? "Cancelling..."
                : "Sending..."
              : interestStatus === 0
                ? "Cancel"
                : interestStatus === 1
                  ? "Accepted"
                  : interestStatus === 2
                    ? "Rejected"
                    : "Interest"}
          </Button>
        </div>
      </div>
    </div>
  );
};