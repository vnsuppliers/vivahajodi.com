import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { astronomicInfoService } from "@/services/astronomic_info.service";

interface Props {
    userId: string;
}

const initialState = {
    zodiac_sign: "",
    moon_sign: "",
    padam: "",
    place_of_birth: "",
    time_of_birth: "",
    gothram: "",
    astro_notes: "",
    status: 1,
};

const ZODIAC_SIGNS = [
    { id: 1, label: "Aries (మేషం)" },
    { id: 2, label: "Taurus (వృషభం)" },
    { id: 3, label: "Gemini (మిథునం)" },
    { id: 4, label: "Cancer (కర్కాటకం)" },
    { id: 5, label: "Leo (సింహం)" },
    { id: 6, label: "Virgo (కన్యా)" },
    { id: 7, label: "Libra (తులా)" },
    { id: 8, label: "Scorpio (వృశ్చికం)" },
    { id: 9, label: "Sagittarius (ధనుస్సు)" },
    { id: 10, label: "Capricorn (మకరం)" },
    { id: 11, label: "Aquarius (కుంభం)" },
    { id: 12, label: "Pisces (మీనం)" },
];

const AstronomicInfo = ({ userId }: Props) => {
    const [form, setForm] = useState(initialState);
    const [original, setOriginal] = useState(initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [openZodiac, setOpenZodiac] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await astronomicInfoService.getAstroInfo(userId);

                if (res) {
                    // NEW HELPER: Converts "22:00:00" or "14:00" to "10:00 PM" or "2:00 PM"
                    const formatDbTimeTo12Hour = (rawTime: string | null | undefined): string => {
                        if (!rawTime) return "";
                        const cleaned = String(rawTime).trim();
                        
                        // Match HH:mm:ss or HH:mm
                        const match = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
                        if (!match) return cleaned; // Return as-is if it's already customized

                        let hours = parseInt(match[1], 10);
                        const minutes = match[2];
                        const ampm = hours >= 12 ? "PM" : "AM";

                        hours = hours % 12;
                        hours = hours ? hours : 12; // The hour '0' should be '12'

                        return `${hours}:${minutes} ${ampm}`;
                    };

                    const data = {
                        zodiac_sign: res.zodiac_sign ? String(res.zodiac_sign) : "",
                        moon_sign: res.moon_sign || "",
                        padam: res.padam || "",
                        place_of_birth: res.place_of_birth || "",
                        //  Format the raw database string on load
                        time_of_birth: formatDbTimeTo12Hour(res.time_of_birth),
                        gothram: res.gothram || "",
                        astro_notes: res.astro_notes || "",
                        status: Number(res.status ?? 1),
                    };

                    setForm(data);
                    setOriginal(data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) load();
    }, [userId]);

    const update = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleEdit = () => {
        setOriginal({ ...form });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm({ ...original });
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const timeValue = form.time_of_birth.trim();

            // ULTRA-FLEXIBLE REGEX: Matches "10Am", "10:00am", "10:00AM", "14:00", "10:00 AM", "10pm"
            const flexibleTimeRegex = /^(\d{1,2})(:[0-5]\d)?(:[0-5]\d)?\s*([a-op-z]{2})?$/i;

            if (timeValue && !flexibleTimeRegex.test(timeValue)) {
                toast.error("Please enter a valid time layout (e.g., 10Am, 10:00 AM, or 14:00)");
                return;
            }

            const payload = {
                ...form,
                zodiac_sign: form.zodiac_sign ? Number(form.zodiac_sign) : null,
                status: Number(form.status),
                time_of_birth: timeValue || null,
            };

            const res = await astronomicInfoService.updateCreateAstroInfo(userId, payload);

            setOriginal({ ...form });
            setIsEditing(false);
            toast.success(res?.message || "Saved successfully");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Save failed");
        }
    };

    return (
        <div className="bg-card border rounded-3xl p-6 mt-5">
            {/* HEADER */}
            <div className="flex justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Switch
                        checked={form.status === 1}
                        disabled={!isEditing}
                        onCheckedChange={(checked) =>
                            setForm((prev) => ({
                                ...prev,
                                status: checked ? 1 : 0,
                            }))
                        }
                    />
                    <div>
                        <p className="text-sm font-medium">Astro Profile</p>
                        <p className="text-xs text-muted-foreground">
                            {form.status === 1 ? "Active" : "Inactive"}
                        </p>
                    </div>
                </div>

                <div>
                    {!isEditing ? (
                        <Button onClick={handleEdit}>Edit</Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* ZODIAC */}
                <div>
                    <Label>Zodiac Sign</Label>
                    <Popover open={openZodiac} onOpenChange={setOpenZodiac}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={!isEditing}
                                variant="outline"
                                className="w-full justify-between"
                            >
                                {ZODIAC_SIGNS.find((z) => z.id === Number(form.zodiac_sign))?.label || "Select Zodiac"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 bg-white border shadow-md">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandList>
                                    {ZODIAC_SIGNS.map((z) => (
                                        <CommandItem
                                            key={z.id}
                                            onSelect={() => {
                                                setForm((prev) => ({
                                                    ...prev,
                                                    zodiac_sign: String(z.id),
                                                }));
                                                setOpenZodiac(false);
                                            }}
                                        >
                                            {z.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label>Moon Sign</Label>
                    <Input
                        disabled={!isEditing}
                        value={form.moon_sign}
                        onChange={(e) => update("moon_sign", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Padam</Label>
                    <Input
                        disabled={!isEditing}
                        value={form.padam}
                        onChange={(e) => update("padam", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Place of Birth</Label>
                    <Input
                        disabled={!isEditing}
                        value={form.place_of_birth}
                        onChange={(e) => update("place_of_birth", e.target.value)}
                    />
                </div>

                {/* TIME OF BIRTH FIELD */}
                <div>
                    <Label>Time of Birth</Label>
                    <Input
                        type="text"
                        disabled={!isEditing}
                        placeholder="e.g., 10Am, 10:00 PM, 14:00"
                        value={form.time_of_birth}
                        onChange={(e) => update("time_of_birth", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Gothram</Label>
                    <Input
                        disabled={!isEditing}
                        value={form.gothram}
                        onChange={(e) => update("gothram", e.target.value)}
                    />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                    <Label>Notes</Label>
                    <textarea
                        disabled={!isEditing}
                        value={form.astro_notes}
                        onChange={(e) => update("astro_notes", e.target.value)}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default AstronomicInfo;