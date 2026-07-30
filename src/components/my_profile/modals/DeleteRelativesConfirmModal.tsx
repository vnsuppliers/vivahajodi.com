import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;

  onClose: () => void;

  onConfirm: () => void;
}

const DeleteRelativesConfirmModal = ({
  open,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="
          max-w-md
        "
      >

        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>
            Delete Relative Information
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div
          className="
            py-3
            text-sm
            text-muted-foreground
          "
        >
          Are you sure you want to
          delete this relative
          information?
        </div>

        {/* FOOTER */}
        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Delete
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default DeleteRelativesConfirmModal;