import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    isBlocked: boolean;
    blockReasonType: string;
    setBlockReasonType: (val: any) => void;
    blockReason: string;
    setBlockReason: (val: string) => void;
    onConfirm: () => void;
};

const BlockProfileModal = ({
    open,
    onClose,
    isBlocked,
    blockReasonType,
    setBlockReasonType,
    blockReason,
    setBlockReason,
    onConfirm,
}: Props) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md p-5 rounded-xl space-y-4">

                <h2 className="text-lg font-semibold">
                    {isBlocked ? "Unblock User" : "Block User"}
                </h2>

                {!isBlocked && (
                    <>
                        <select
                            className="w-full border p-2 rounded"
                            value={blockReasonType}
                            onChange={(e) => setBlockReasonType(e.target.value)}
                        >
                            <option value="">Select Reason</option>
                            <option value="harassment">Harassment</option>
                            <option value="fake_profile">Fake Profile</option>
                            <option value="not_interested">Not Interested</option>
                            <option value="other">Other</option>
                        </select>

                        <textarea
                            className="w-full border p-2 rounded"
                            placeholder="Reason (optional)"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                        />
                    </>
                )}

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        variant={isBlocked ? "default" : "destructive"}
                        onClick={onConfirm}
                    >
                        {isBlocked ? "Unblock" : "Block"}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default BlockProfileModal;