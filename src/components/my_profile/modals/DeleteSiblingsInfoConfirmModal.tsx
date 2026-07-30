import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Trash2,
  Loader2,
} from "lucide-react";

interface Props {
  open: boolean;

  onClose: () => void;

  onConfirm: () => void;

  loading: boolean;

  siblingName?: string;
}

export const DeleteSiblingsInfoConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  siblingName,
}: Props) => {

  return (

    <Dialog
      open={open}
      onOpenChange={onClose}
    >

      <DialogContent className="sm:max-w-md rounded-2xl">

        {/* HEADER */}
        <DialogHeader>

          <DialogTitle className="flex items-center gap-2 text-red-600">

            <Trash2 className="h-5 w-5" />

            Delete Sibling

          </DialogTitle>

        </DialogHeader>

        {/* BODY */}
        <div className="py-2">

          <p className="text-sm text-muted-foreground leading-6">

            Are you sure you want to delete{" "}

            <span className="font-semibold text-foreground">
              {siblingName || "this sibling"}
            </span>

            ? This action cannot be undone.

          </p>

        </div>

        {/* FOOTER */}
        <DialogFooter className="gap-2 sm:gap-0">

          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >

            {loading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}

            Delete

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
};

export default DeleteSiblingsInfoConfirmModal;