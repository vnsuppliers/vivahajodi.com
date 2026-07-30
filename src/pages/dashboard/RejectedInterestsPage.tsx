import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InterestsService } from "@/services/interests.service";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartOff } from "lucide-react";

type FilterType = "all" | "me" | "other";

export const RejectedInterestsPage = () => {
    const [interests, setInterests] = useState<any[]>([]);
    const [filter, setFilter] = useState<FilterType>("all");
    const [loading, setLoading] = useState(true);

    // Can be a number code or string code ("BLOCKED", "SUSPENDED", etc.)
    const [userStatus, setUserStatus] = useState<number | string>(1);
    const [statusMessage, setStatusMessage] = useState<string>("");

    const load = async (type: FilterType) => {
        try {
            setLoading(true);
            const data = await InterestsService.getRejected(type);
            setInterests(data || []);
            setUserStatus(1); // Set status to active if call succeeds
        } catch (err: any) {
            console.error(err);
            setInterests([]);

            const backendMessage = err?.response?.data?.message || "";
            const errorCode = err?.response?.data?.errorCode || "";
            const status = err?.response?.status;
            setStatusMessage(backendMessage);

            // --- STRATEGY: Premium restrictions & error code evaluation ---
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

    useEffect(() => {
        load(filter);
    }, [filter]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Rejected Interests</h1>
                    {userStatus === 1 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage rejected interests and review history
                        </p>
                    )}
                </div>

                {/* Account Status Guards */}
                {userStatus !== 1 ? (
                    <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
                ) : (
                    <>
                        {/* FILTERS */}
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setFilter("all")}
                                variant={filter === "all" ? "default" : "outline"}
                                disabled={loading}
                            >
                                All
                            </Button>

                            <Button
                                onClick={() => setFilter("me")}
                                variant={filter === "me" ? "default" : "outline"}
                                disabled={loading}
                            >
                                Rejected by Me
                            </Button>

                            <Button
                                onClick={() => setFilter("other")}
                                variant={filter === "other" ? "default" : "outline"}
                                disabled={loading}
                            >
                                Rejected by Others
                            </Button>
                        </div>

                        {/* TABLE & BEAUTIFIED EMPTY STATE */}
                        {interests.length === 0 && !loading ? (
                            <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-4">
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                                <div className="relative z-10 space-y-4">
                                    <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                                        <HeartOff className="h-7 w-7 stroke-[1.5]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                                            No Entries to Show
                                        </h3>
                                        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                                            There are currently no records inside this specific filter timeline. Any rejected interest actions will populate right here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto border rounded-xl bg-card shadow-sm">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-foreground">Name</th>
                                            <th className="p-3 text-left font-semibold text-foreground">Location</th>
                                            <th className="p-3 text-left font-semibold text-foreground">Occupation</th>
                                            <th className="p-3 text-left font-semibold text-foreground">Reason</th>
                                            <th className="p-3 text-left font-semibold text-foreground">Date</th>
                                            <th className="p-3 text-left font-semibold text-foreground">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="p-8 text-center text-muted-foreground animate-pulse font-medium">
                                                    Loading historical registry logs...
                                                </td>
                                            </tr>
                                        ) : (
                                            interests.map((interest) => (
                                                <tr key={interest.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                                                    <td className="p-3 font-medium text-foreground">
                                                        {interest.by?.first_name || "Unknown"} {interest.by?.last_name || ""}
                                                    </td>

                                                    <td className="p-3 text-muted-foreground">
                                                        {interest.by?.present_address?.address_line1 || "N/A"}
                                                    </td>

                                                    <td className="p-3 text-muted-foreground">
                                                        {interest.by?.profession_info?.company_name || "N/A"}
                                                    </td>

                                                    <td className="p-3 text-destructive font-medium">
                                                        {interest.reason || "No reason provided"}
                                                    </td>

                                                    <td className="p-3 text-muted-foreground">
                                                        {interest.created_at
                                                            ? new Date(interest.created_at).toLocaleDateString("en-IN")
                                                            : "-"}
                                                    </td>

                                                    <td className="p-3">
                                                        <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 shadow-none border-none font-semibold">
                                                            Rejected
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default RejectedInterestsPage;