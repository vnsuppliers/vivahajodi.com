import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  title = "Delete Record",
  description = "Are you sure you want to delete this record? This action cannot be undone.",
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">{description}</p>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;