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

const CreateRelativesModal = ({
    open,
    onClose,
    loading,
    handleSave,
    form,
    setForm,
}: Props) => {

    const fields = [
        { key: "relative_name", label: "Relative Name", placeholder: "Ramesh Kumar" },
        { key: "relation", label: "Relation", placeholder: "Uncle" },
        { key: "occupation", label: "Occupation", placeholder: "Business" },
        { key: "location", label: "Location", placeholder: "Hyderabad" },
        { key: "contact_number", label: "Contact Number", placeholder: "9876543210" },
        { key: "email", label: "Email", placeholder: "example@gmail.com" },
        { key: "notes", label: "Notes", placeholder: "Close family relative" },
    ];

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col">
                {/* HEADER */}
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle>
                        {form.relatives_info_id ? "Edit Relative Information" : "Create Relative Information"}
                    </DialogTitle>
                </DialogHeader>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {/* STATUS */}
                    <div className="flex justify-between items-center border rounded-xl p-4 mb-5">
                        <div>
                            <Label>Status</Label>
                            <p className="text-sm text-muted-foreground mt-1">Active / Inactive</p>
                        </div>
                        <div
                            onClick={() =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    status: Number(prev.status) === 1 ? 0 : 1,
                                }))
                            }
                            className={`w-11 h-6 flex items-center rounded-full cursor-pointer px-1 transition ${Number(form.status) === 1 ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span className={`w-4 h-4 bg-white rounded-full transition-transform ${Number(form.status) === 1 ? "translate-x-5" : "translate-x-0"
                                }`} />
                        </div>
                    </div>

                    {/* FORM FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {fields.map((field) => (
                            <div key={field.key}>
                                <Label>{field.label}</Label>
                                <Input
                                    placeholder={field.placeholder}
                                    value={form[field.key] || ""}
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
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={handleSave}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {form.relatives_info_id ? "Save Changes" : "Create Relative"} {/* 👈 DYNAMIC LABEL */}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRelativesModal;