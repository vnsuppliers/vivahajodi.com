import { Clock, Ban, UserX, Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export type UserStatusType = 0 | 1 | 2 | 3 | 4 | 5 | "active" | "blocked" | "suspended" | "deactivated" | "deleted" | string;

interface StatusMessageProps {
    status: UserStatusType;
    message?: string;
}

export const StatusMessage = ({ status, message }: StatusMessageProps) => {
    const navigate = useNavigate();
    console.log("Status: ", status);

    // Normalize status to handle both numeric IDs and strings safely
    const normalizedStatus = typeof status === "string" ? status.toUpperCase() : status;

    switch (normalizedStatus) {
        case "BLOCKED":
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-destructive/40 shadow-xl max-w-2xl mx-auto mt-12 space-y-5">
                    <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center border border-destructive/20">
                        <ShieldAlert className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-destructive">Account Blocked</h3>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed font-medium">
                            {message || "Your account has been blocked by the administrator due to policy or compliance violations."}
                        </p>
                    </div>
                </div>
            );

        case 5:
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border shadow-xl max-w-2xl mx-auto mt-12">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto text-3xl">
                            👑
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-display text-2xl font-black text-foreground">
                                Premium Membership Required
                            </h3>

                            <p className="text-muted-foreground text-sm max-w-md mx-auto">
                                {message || "Unlock full access to our verified community network and discover your perfect match today."}
                            </p>
                        </div>

                        <Button
                            onClick={() => navigate("/dashboard/subscription/subscription-plans")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-xl"
                        >
                            Upgrade to Premium
                        </Button>
                    </div>
                </div>
            );

        case 0:
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border shadow-lg max-w-2xl mx-auto mt-12 space-y-5">
                    <div className="h-16 w-16 bg-muted text-muted-foreground rounded-full flex items-center justify-center border border-border">
                        <Clock className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-foreground">Verification in Progress</h3>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                            {message || "Our moderation team is securely reviewing your profile details. Full exploration tools will open up shortly."}
                        </p>
                    </div>
                </div>
            );

        case 2:
        case "SUSPENDED":
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-destructive/30 shadow-lg max-w-2xl mx-auto mt-12 space-y-5">
                    <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center border border-destructive/20">
                        <Ban className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-destructive">Access Temporarily Suspended</h3>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed font-medium">
                            {message || "Your profile operations have been restricted. Please review platform rules or appeal via administration support."}
                        </p>
                    </div>
                </div>
            );

        case 3:
        case "DEACTIVATED":
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border shadow-lg max-w-2xl mx-auto mt-12 space-y-5">
                    <div className="h-16 w-16 bg-muted text-muted-foreground/60 rounded-full flex items-center justify-center border border-border">
                        <UserX className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-foreground">Profile Deactivated</h3>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                            {message || "This profile is currently resting. You can easily reactivate it from your account security dashboard settings."}
                        </p>
                    </div>
                </div>
            );

        case 4:
        case "DELETED":
            return (
                <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-destructive/20 shadow-lg max-w-2xl mx-auto mt-12 space-y-5">
                    <div className="h-16 w-16 bg-destructive/5 text-destructive/80 rounded-full flex items-center justify-center">
                        <Trash2 className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-destructive">Account Wiped</h3>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                            {message || "This indexed account state data has been permanently cleared from search directories."}
                        </p>
                    </div>
                </div>
            );

        case 1:
        case "ACTIVE":
        default:
            return null;
    }
};