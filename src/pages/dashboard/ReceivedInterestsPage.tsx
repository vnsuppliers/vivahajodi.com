import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InterestCard } from "@/components/interests/InterestCard";
import { InterestsService } from "@/services/interests.service";
import { StatusMessage, UserStatusType } from "@/components/StatusMessage";
import RejectInterestModal from "@/components/modals/RejectInterestModal";
import { HeartCrack } from "lucide-react";

export const ReceivedInterestsPage = () => {
    const [interests, setInterests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [rejectOpen, setRejectOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedInterestId, setSelectedInterestId] = useState<number | null>(null);

    // Can be a number code or string code ("BLOCKED", "SUSPENDED", etc.)
    const [userStatus, setUserStatus] = useState<number | string>(1);
    const [statusMessage, setStatusMessage] = useState<string>("");

    const [processingId, setProcessingId] = useState<number | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            const data = await InterestsService.getReceived();
            setInterests(data || []);
            setUserStatus(1);
        } catch (err: any) {
            console.error(err);
            setInterests([]);

            const backendMessage = err?.response?.data?.message || "";
            const errorCode = err?.response?.data?.errorCode || "";
            const status = err?.response?.status;
            setStatusMessage(backendMessage);

            // --- STRATEGY: Premium Restriction & Error Code Evaluation ---
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
        load();
    }, []);

    const handleAccept = async (id: number) => {
        if (userStatus !== 1) return;

        try {
            setProcessingId(id);
            await InterestsService.accept(id);
            await load();
        } finally {
            setProcessingId(null);
        }
    };

    const handleCloseRejectModal = () => {
        setRejectOpen(false);
        setRejectReason("");
        setSelectedInterestId(null);
    };

    const handleRejectConfirm = async () => {
        if (!selectedInterestId || userStatus !== 1) return;

        try {
            setProcessingId(selectedInterestId);
            await InterestsService.reject(selectedInterestId, rejectReason);
            handleCloseRejectModal();
            await load();
        } finally {
            setProcessingId(null);
        }
    };

    const pendingInterests = interests.filter((i) => i.status === 0);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Received Interests</h1>

                {/* Account Status Guards */}
                {userStatus !== 1 ? (
                    <StatusMessage status={userStatus as UserStatusType} message={statusMessage} />
                ) : loading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-24 w-full bg-muted animate-pulse rounded-xl border border-border" />
                        ))}
                    </div>
                ) : pendingInterests.length === 0 ? (
                    /* High-End, Branded Empty State Design using System Colors */
                    <div className="relative overflow-hidden flex flex-col items-center justify-center text-center p-16 bg-card rounded-2xl border border-border shadow-sm max-w-2xl mx-auto mt-8">
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 space-y-4">
                            <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm mx-auto">
                                <HeartCrack className="h-7 w-7 stroke-[1.5]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                                    No Interests Received Yet
                                </h3>
                                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                                    When other members express interest in matching with your profile, their requests will instantly show up right here.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {pendingInterests.map((interest) => (
                            <InterestCard
                                key={interest.id}
                                interest={{
                                    status: "pending",
                                    created_at: interest.created_at,
                                }}
                                profile={{
                                    id: interest.by.id,
                                    name: `${interest.by.first_name} ${interest.by.last_name}`,
                                    avatar: interest.by.profile_image ?? "",
                                    location: [
                                        interest.by.present_address?.address_line1,
                                        interest.by.present_address?.countrymaster?.name,
                                    ]
                                        .filter(Boolean)
                                        .join(", ") || "N/A",
                                    occupation: interest.by.profession_info?.company_name ?? "N/A",
                                }}
                                showActions
                                loading={processingId === interest.id}
                                disabled={processingId !== null}
                                onAccept={() => handleAccept(interest.id)}
                                onReject={() => {
                                    if (processingId !== null) return;

                                    setSelectedInterestId(interest.id);
                                    setRejectReason("");
                                    setRejectOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}

                <RejectInterestModal
                    open={rejectOpen}
                    onClose={handleCloseRejectModal}
                    reason={rejectReason}
                    setReason={setRejectReason}
                    onConfirm={handleRejectConfirm}
                    loading={processingId !== null}
                />
            </div>
        </DashboardLayout>
    );
};