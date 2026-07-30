import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  handleSave: () => void;

  form: any;

  setForm: React.Dispatch<React.SetStateAction<any>>;
}

const CreateHobbiesModal = ({
  open,
  onClose,
  loading,
  handleSave,
  form,
  setForm,
}: Props) => {

  // ================= CLOSE =================
  const handleClose = () => {
    setForm({
      hobbies: "",
      interests: "",
      favorite_music: "",
      favorite_movies: "",
      favorite_books: "",
      sports: "",
      activities: "",
      languages_known: "",
      entertainment_preferences: "",
      travel_interests: "",
      status: 1,
    });

    onClose();
  };

  // ================= FIELDS =================
  const fields = [
    {
      key: "hobbies",
      label: "Hobbies",
      placeholder: "Reading",
    },
    {
      key: "interests",
      label: "Interests",
      placeholder: "Technology",
    },
    {
      key: "favorite_music",
      label: "Favorite Music",
      placeholder: "Melody",
    },
    {
      key: "favorite_movies",
      label: "Favorite Movies",
      placeholder: "Drama",
    },
    {
      key: "favorite_books",
      label: "Favorite Books",
      placeholder: "Novels",
    },
    {
      key: "sports",
      label: "Sports",
      placeholder: "Cricket",
    },
    {
      key: "activities",
      label: "Activities",
      placeholder: "Gym",
    },
    {
      key: "languages_known",
      label: "Languages Known",
      placeholder: "English",
    },
    {
      key: "entertainment_preferences",
      label: "Entertainment Preferences",
      placeholder: "Movies",
    },
    {
      key: "travel_interests",
      label: "Travel Interests",
      placeholder: "Beach",
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col">

        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>
            Create Hobbies Info
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* STATUS */}
          <div className="flex justify-between items-center border rounded-xl p-4 mb-5">

            <div>
              <Label>Status</Label>

              <p className="text-sm text-muted-foreground mt-1">
                Active / Inactive
              </p>
            </div>

            <div
              onClick={() =>
                setForm((p: any) => ({
                  ...p,
                  status:
                    Number(p.status) === 1 ? 0 : 1,
                }))
              }
              className={`w-11 h-6 flex items-center rounded-full cursor-pointer px-1 transition ${
                Number(form.status) === 1
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  Number(form.status) === 1
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {fields.map((field) => (
              <div key={field.key}>

                <Label>
                  {field.label}
                </Label>

                <Input
                  value={form[field.key] || ""}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    setForm((prev: any) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="mt-1"
                />

              </div>
            ))}

          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="px-6 py-4 border-t shrink-0">

          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSave}
          >
            {loading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            Save Changes
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHobbiesModal;