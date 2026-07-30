import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown, Check } from "lucide-react";
import { masterService } from "@/services/master.service";
import { familyInfoService } from "@/services/family_info.service";
import { Switch } from "@/components/ui/switch";

interface Props {
    userId: string;
}

const initialState = {
    father_name: "",
    father_occupation: "",
    father_education: "",
    father_status: "",

    mother_name: "",
    mother_occupation: "",
    mother_education: "",
    mother_status: "",

    family_type: "",
    family_values: "",

    country_id: "",
    state_id: "",
    city_id: "",

    address: "",
    pincode: "",

    status: 1,
};

const FamilyInfo = ({ userId }: Props) => {
    const [form, setForm] = useState(initialState);
    const [original, setOriginal] = useState(initialState);
    const [isEditing, setIsEditing] = useState(false);

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const [openCountry, setOpenCountry] = useState(false);
    const [openState, setOpenState] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                // ================= COUNTRIES =================
                const countryRes = await masterService.getCountries();
                setCountries(Array.isArray(countryRes) ? countryRes : []);

                // ================= FAMILY INFO =================
                const res = await familyInfoService.getFamilyInfo(userId);

                if (res) {
                    const data = {
                        father_name: res.father_name || "",
                        father_occupation: res.father_occupation || "",
                        father_education: res.father_education || "",
                        father_status: res.father_status || "",

                        mother_name: res.mother_name || "",
                        mother_occupation: res.mother_occupation || "",
                        mother_education: res.mother_education || "",
                        mother_status: res.mother_status || "",

                        family_type: res.family_type || "",
                        family_values: res.family_values || "",

                        country_id: res.country_id
                            ? String(res.country_id)
                            : "",

                        state_id: res.state_id
                            ? String(res.state_id)
                            : "",

                        city_id: res.city_id
                            ? String(res.city_id)
                            : "",

                        address: res.address || "",
                        pincode: res.pincode || "",

                        status: res.status || 1,
                    };

                    setForm(data);
                    setOriginal(data);

                    // ================= LOAD STATES =================
                    if (res.country_id) {
                        const stateRes = await masterService.getStates(
                            Number(res.country_id)
                        );

                        setStates(Array.isArray(stateRes) ? stateRes : []);
                    }

                    // ================= LOAD CITIES =================
                    if (res.state_id) {
                        const cityRes = await masterService.getCities(
                            Number(res.state_id)
                        );

                        setCities(Array.isArray(cityRes) ? cityRes : []);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userId) {
            load();
        }
    }, [userId]);

    // ================= COUNTRY =================
    const handleCountry = async (id: string) => {
        setForm((p) => ({
            ...p,
            country_id: id,
            state_id: "",
            city_id: "",
        }));

        const res = await masterService.getStates(Number(id));
        setStates(Array.isArray(res) ? res : []);
        setCities([]);
    };

    // ================= STATE =================
    const handleState = async (id: string) => {
        setForm((p) => ({
            ...p,
            state_id: id,
            city_id: "",
        }));

        const res = await masterService.getCities(Number(id));
        setCities(Array.isArray(res) ? res : []);
    };

    const update = (key: string, value: string) => {
        setForm((p) => ({ ...p, [key]: value }));
    };

    const handleEdit = () => {
        setOriginal(form);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm(original);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const res = await familyInfoService.updateCreateFamilyInfo(
                userId,
                form
            );

            setOriginal(form);
            setIsEditing(false);

            toast.success(
                res?.message || "Family info updated successfully"
            );

        } catch (error: any) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update family info"
            );
        }
    };

    return (
        <div className="bg-card border rounded-3xl p-6 mt-5">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* STATUS */}
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
                        <p className="text-sm font-medium">
                            Profile Visibility
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {form.status === 1
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

                            <Button onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Father */}
                <div>
                    <Label>Father Name</Label>
                    <Input
                        placeholder="Enter father's full name"
                        disabled={!isEditing}
                        value={form.father_name}
                        onChange={(e) => update("father_name", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Father Occupation</Label>
                    <Input
                        placeholder="Father's occupation (e.g. Farmer / Engineer / Business)"
                        disabled={!isEditing}
                        value={form.father_occupation}
                        onChange={(e) => update("father_occupation", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Father Education</Label>
                    <Input
                        placeholder="Father education (e.g. SSC / Graduate / Post Graduate)"
                        disabled={!isEditing}
                        value={form.father_education}
                        onChange={(e) => update("father_education", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Father Status</Label>
                    <Input
                        placeholder="Father status (e.g. Alive / Deceased / Retired)"
                        disabled={!isEditing}
                        value={form.father_status}
                        onChange={(e) => update("father_status", e.target.value)}
                    />
                </div>

                {/* Mother */}
                <div>
                    <Label>Mother Name</Label>
                    <Input
                        placeholder="Enter mother's full name"
                        disabled={!isEditing}
                        value={form.mother_name}
                        onChange={(e) => update("mother_name", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Mother Occupation</Label>
                    <Input
                        placeholder="Mother's occupation (e.g. Homemaker / Teacher)"
                        disabled={!isEditing}
                        value={form.mother_occupation}
                        onChange={(e) => update("mother_occupation", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Mother Education</Label>
                    <Input
                        placeholder="Mother education (e.g. SSC / Graduate / Post Graduate)"
                        disabled={!isEditing}
                        value={form.mother_education}
                        onChange={(e) => update("mother_education", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Mother Status</Label>
                    <Input
                        placeholder="Mother status (e.g. Alive / Deceased)"
                        disabled={!isEditing}
                        value={form.mother_status}
                        onChange={(e) => update("mother_status", e.target.value)}
                    />
                </div>

                {/* Family */}
                <div>
                    <Label>Family Type</Label>
                    <Input
                        placeholder="Family type (e.g. Nuclear / Joint / Extended)"
                        disabled={!isEditing}
                        value={form.family_type}
                        onChange={(e) => update("family_type", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Family Values</Label>
                    <Input
                        placeholder="Family values (e.g. Traditional / Moderate / Liberal)"
                        disabled={!isEditing}
                        value={form.family_values}
                        onChange={(e) => update("family_values", e.target.value)}
                    />
                </div>

                {/* COUNTRY */}
                <div>
                    <Label>Country</Label>
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                            <Button
                                className="w-full justify-between"
                                variant="outline"
                                disabled={!isEditing}
                            >
                                {countries.find(c => String(c.id) === form.country_id)?.name || "Select Country (e.g. India)"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {countries.map(c => (
                                        <CommandItem key={c.id} onSelect={() => {
                                            handleCountry(String(c.id));
                                            setOpenCountry(false);
                                        }}>
                                            <Check className={form.country_id === String(c.id) ? "opacity-100" : "opacity-0"} />
                                            {c.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* STATE */}
                <div>
                    <Label>State</Label>
                    <Popover open={openState} onOpenChange={setOpenState}>
                        <PopoverTrigger asChild>
                            <Button
                                className="w-full justify-between"
                                variant="outline"
                                disabled={!isEditing || !form.country_id}
                            >
                                {states.find(s => String(s.id) === form.state_id)?.name || "Select State (e.g. Andhra Pradesh)"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {states.map(s => (
                                        <CommandItem key={s.id} onSelect={() => {
                                            handleState(String(s.id));
                                            setOpenState(false);
                                        }}>
                                            {s.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* CITY */}
                <div>
                    <Label>City</Label>
                    <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                            <Button
                                className="w-full justify-between"
                                variant="outline"
                                disabled={!isEditing || !form.state_id}
                            >
                                {cities.find(c => String(c.id) === form.city_id)?.name || "Select City (e.g. Vijayawada)"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {cities.map(c => (
                                        <CommandItem key={c.id} onSelect={() => {
                                            update("city_id", String(c.id));
                                            setOpenCity(false);
                                        }}>
                                            {c.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* PINCODE */}
                <div>
                    <Label>Pincode</Label>
                    <Input
                        placeholder="Enter pincode (e.g. 520001)"
                        disabled={!isEditing}
                        value={form.pincode}
                        onChange={(e) => update("pincode", e.target.value)}
                    />
                </div>

                {/* ADDRESS FULL ROW */}
                <div className="md:col-span-3">
                    <Label>Address</Label>
                    <textarea
                        placeholder="Enter full address (House No, Street, Area, Landmark)"
                        className="mt-2 w-full min-h-[100px] rounded-md border px-3 py-2 text-sm"
                        disabled={!isEditing}
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                    />
                </div>

            </div>
        </div>
    );
};

export default FamilyInfo;