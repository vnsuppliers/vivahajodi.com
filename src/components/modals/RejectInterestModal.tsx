import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    reason: string;
    setReason: (value: string) => void;
    onConfirm: () => void;
    loading?: boolean;
};

export default function RejectInterestModal({
    open,
    onClose,
    reason,
    setReason,
    onConfirm,
    loading = false,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={(value) => !loading && !value && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Why are you rejecting this interest?
                    </DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder="Enter reason..."
                    value={reason}
                    disabled={loading}
                    onChange={(e) => setReason(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        disabled={!reason.trim() || loading}
                    >
                        {loading ? "Rejecting..." : "Reject"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}