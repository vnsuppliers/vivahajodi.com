import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

import {
    PhysicalAttributesFormData,
    initialPhysicalAttributesFormData,
} from "@/interfaces/physical_attributes.interface";

import { physicalAttributesService } from "@/services/physical_attributes.service";

const PhysicalAttributesInfo = ({ userId }: { userId: string }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(1);

    const [formData, setFormData] =
        useState<PhysicalAttributesFormData>(
            initialPhysicalAttributesFormData
        );

    const [originalData, setOriginalData] =
        useState<PhysicalAttributesFormData>(
            initialPhysicalAttributesFormData
        );

    // ================= FETCH =================
    useEffect(() => {
        if (!userId) return;

        physicalAttributesService
            .getPhysicalAttributes(userId)
            .then((res) => {
                const data = res?.data ?? res;
                if (!data) return;

                setStatus(Number(data.status ?? 1));

                const mapped: PhysicalAttributesFormData = {
                    height: data.height || "",
                    weight: data.weight || "",
                    body_type: data.body_type || "",
                    complexion: data.complexion || "",
                    physical_status: data.physical_status || "",
                    blood_group: data.blood_group || "",
                    eye_color: data.eye_color || "",
                    hair_color: data.hair_color || "",
                    hair_type: data.hair_type || "",
                    hair_length: data.hair_length || "",
                    skin_tone: data.skin_tone || "",
                    fitness_level: data.fitness_level || "",
                    disability: data.disability || "",
                    disability_details: data.disability_details || "",
                    spectacles: data.spectacles || "",
                    lens_usage: data.lens_usage || "",
                    beard_style: data.beard_style || "",
                    tattoo: data.tattoo || "",
                    physique: data.physique || "",
                    shoe_size: data.shoe_size || "",
                    dress_size: data.dress_size || "",
                    health_condition: data.health_condition || "",
                    medical_conditions: data.medical_conditions || "",
                    genetic_disorders: data.genetic_disorders || "",
                    appearance_notes: data.appearance_notes || "",
                };

                setFormData(mapped);
                setOriginalData(mapped);
            })
            .catch((err) =>
                console.log("PHYSICAL ATTRIBUTES FETCH ERROR:", err)
            );
    }, [userId]);

    // ================= HANDLE CHANGE =================
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ================= EDIT =================
    const handleEdit = () => {
        setOriginalData(formData);
        setIsEditing(true);
    };

    // ================= CANCEL =================
    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
    };

    // ================= SAVE =================
    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!userId) {
                toast.error("User ID not found");
                return;
            }

            const payload = {
                ...formData,
                status,
            };

            const res =
                await physicalAttributesService.updateCreate(
                    userId,
                    payload
                );

            toast.success(
                res?.message ||
                "Physical attributes updated successfully"
            );

            setOriginalData(formData);
            setIsEditing(false);
        } catch (err: any) {
            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Update failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= LABELS =================
    const fieldLabels: Record<
        keyof PhysicalAttributesFormData,
        string
    > = {
        height: "Height",
        weight: "Weight",
        body_type: "Body Type",
        complexion: "Complexion",
        physical_status: "Physical Status",
        blood_group: "Blood Group",
        eye_color: "Eye Color",
        hair_color: "Hair Color",
        hair_type: "Hair Type",
        hair_length: "Hair Length",
        skin_tone: "Skin Tone",
        fitness_level: "Fitness Level",
        disability: "Disability",
        disability_details: "Disability Details",
        spectacles: "Spectacles",
        lens_usage: "Lens Usage",
        beard_style: "Beard Style",
        tattoo: "Tattoo",
        physique: "Physique",
        shoe_size: "Shoe Size",
        dress_size: "Dress Size",
        health_condition: "Health Condition",
        medical_conditions: "Medical Conditions",
        genetic_disorders: "Genetic Disorders",
        appearance_notes: "Appearance Notes",
    };

    // ================= PLACEHOLDERS =================
    const fieldPlaceholders: Record<
        keyof PhysicalAttributesFormData,
        string
    > = {
        height: "Enter height",
        weight: "Enter weight",
        body_type: "Enter body type",
        complexion: "Enter complexion",
        physical_status: "Enter physical status",
        blood_group: "Enter blood group",
        eye_color: "Enter eye color",
        hair_color: "Enter hair color",
        hair_type: "Enter hair type",
        hair_length: "Enter hair length",
        skin_tone: "Enter skin tone",
        fitness_level: "Enter fitness level",
        disability: "Enter disability",
        disability_details: "Enter disability details",
        spectacles: "Enter spectacles",
        lens_usage: "Enter lens usage",
        beard_style: "Enter beard style",
        tattoo: "Enter tattoo",
        physique: "Enter physique",
        shoe_size: "Enter shoe size",
        dress_size: "Enter dress size",
        health_condition: "Enter health condition",
        medical_conditions: "Enter medical conditions",
        genetic_disorders: "Enter genetic disorders",
        appearance_notes: "Enter appearance notes",
    };

    return (
        <div className="bg-card border rounded-3xl p-6 mt-5">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* STATUS */}
                <div className="flex items-center gap-3">
                    <Switch
                        checked={status === 1}
                        disabled={!isEditing}
                        onCheckedChange={(checked) =>
                            setStatus(checked ? 1 : 0)
                        }
                    />

                    <div>
                        <p className="text-sm font-medium">
                            Profile Visibility
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {status === 1
                                ? "Visible to other users"
                                : "Hidden from other users"}
                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-end">
                    {!isEditing ? (
                        <Button onClick={handleEdit}>
                            Edit
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Changes"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {(Object.keys(formData) as Array<
                    keyof PhysicalAttributesFormData
                >).map((key) => (
                    <div
                        key={key}
                        className={
                            key === "appearance_notes"
                                ? "md:col-span-2 xl:col-span-3"
                                : ""
                        }
                    >

                        <Label>
                            {fieldLabels[key]}
                        </Label>

                        {key === "appearance_notes" ? (
                            <Textarea
                                name={key}
                                value={formData[key] ?? ""}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                    }))
                                }
                                disabled={!isEditing}
                                placeholder={fieldPlaceholders[key]}
                                className="mt-1 min-h-[120px]"
                            />
                        ) : (
                            <Input
                                name={key}
                                value={formData[key] ?? ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder={fieldPlaceholders[key]}
                                className="mt-1"
                            />
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
};

export default PhysicalAttributesInfo;