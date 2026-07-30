import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { encodeId } from "@/utils/encodeId";

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
};

type Props = {
    interest: {
        status: "pending" | "accepted" | "rejected";
        created_at?: string;
    };
    profile: any;
    showActions?: boolean;
    onAccept?: () => void;
    onReject?: () => void;
     loading?: boolean;
    disabled?: boolean;
};

export const InterestCard = ({
    interest,
    profile,
    showActions = false,
    onAccept,
    onReject,
    loading = false,
    disabled = false,
}: Props) => {
    if (!profile) return null;

    return (
        <div className="bg-card rounded-xl border p-4 shadow flex items-center gap-4">
            {profile.avatar ? (
                <img
                    src={profile.avatar}
                    className="h-14 w-14 rounded-full object-cover"
                />
            ) : (
                <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {profile.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                </div>
            )}

            <div className="flex-1">
                <p className="font-medium">
                    {profile.name}
                </p>

                <p className="text-sm text-muted-foreground">
                    {profile.location} • {profile.occupation}
                </p>

                <p className="text-xs text-muted-foreground">
                    Interested on{" "}
                    {interest.created_at
                        ? new Date(interest.created_at).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                          })
                        : ""}
                </p>
            </div>

            <Badge className={statusColors[interest.status] || ""}>
                {interest.status}
            </Badge>

            <div className="flex gap-2">
                <Link to={`/dashboard/profile/${encodeId(profile.id)}`}>
                    <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>

                {showActions && interest.status === "pending" && (
                    <>
                        <Button
                            onClick={onAccept}
                            disabled={disabled}
                        >
                            {loading ? "Accepting..." : "Accept"}
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={onReject}
                            disabled={disabled}
                        >
                            {loading ? "Please wait..." : "Reject"}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};