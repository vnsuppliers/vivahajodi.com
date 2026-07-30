// components/ReportModal.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ReportProfileService } from "@/services/report_profile.service";
interface Props {
    open: boolean;
    onClose: () => void;
    reportedUserId: number;
    onSuccess: () => void;
}

export default function ReportModal({ open, onClose, reportedUserId, onSuccess }: Props) {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    

    if (!open) return null;

    const submit = async () => {
        if (!reason) return toast.error("Reason required");

        try {
            setLoading(true);

            await ReportProfileService.create({
                reported_user_id: reportedUserId,
                reason,
                description,
            });

            toast.success("Reported successfully");
           
            setReason("");
            setDescription("");
             onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <div className="relative w-[92%] max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Report User</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        ✕
                    </button>
                </div>

                {/* INPUTS */}
                <div className="space-y-4">
                    <Input
                        placeholder="Reason (required)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="h-11"
                    />

                    <Textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[120px]"
                    />
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={submit} disabled={loading}>
                        Submit Report
                    </Button>
                </div>
            </div>
        </div>
    );
}