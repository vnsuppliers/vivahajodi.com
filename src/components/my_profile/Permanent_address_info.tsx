import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

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

import { Check } from "lucide-react";

import { masterService } from "@/services/master.service";
import { permanentAddressService } from "@/services/permanent_address.service";

interface Props {
    userId: string;
}

const initialState = {
    country_id: "",
    state_id: "",
    city_id: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    status: 1 as number,
};

const onlyNumbers = (val: string) => val.replace(/[^0-9]/g, "");

const PermanentAddress = ({ userId }: Props) => {
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
                const countryRes = await masterService.getCountries();
                setCountries(Array.isArray(countryRes) ? countryRes : []);

                const res = await permanentAddressService.getPermanentAddress(userId);

                if (res) {
                    const data = {
                        country_id: res.country_id ? String(res.country_id) : "",
                        state_id: res.state_id ? String(res.state_id) : "",
                        city_id: res.city_id ? String(res.city_id) : "",
                        address_line1: res.address_line1 || "",
                        address_line2: res.address_line2 || "",
                        pincode: res.pincode || "",
                        status: Number(res.status ?? 1),
                    };

                    setForm(data);
                    setOriginal(data);

                    if (res.country_id) {
                        const stateRes = await masterService.getStates(Number(res.country_id));
                        setStates(Array.isArray(stateRes) ? stateRes : []);
                    }

                    if (res.state_id) {
                        const cityRes = await masterService.getCities(Number(res.state_id));
                        setCities(Array.isArray(cityRes) ? cityRes : []);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) load();
    }, [userId]);

    const update = (key: string, value: string) => {
        setForm((p) => ({ ...p, [key]: value }));
    };

    const handleCountry = async (id: number) => {
        setForm((p) => ({
            ...p,
            country_id: String(id),
            state_id: "",
            city_id: "",
        }));

        const res = await masterService.getStates(id);
        setStates(Array.isArray(res) ? res : []);
        setCities([]);
    };

    const handleState = async (id: number) => {
        setForm((p) => ({
            ...p,
            state_id: String(id),
            city_id: "",
        }));

        const res = await masterService.getCities(id);
        setCities(Array.isArray(res) ? res : []);
    };

    const handleSave = async () => {
        // ✅ extra safety before API call
        if (!form.country_id || !form.state_id || !form.city_id) {
            toast.error("Please select country, state and city");
            return;
        }

        if (!/^[0-9]{4,10}$/.test(form.pincode)) {
            toast.error("Pincode must be numbers only");
            return;
        }

        try {
            const res = await permanentAddressService.updateCreatePermanentAddress(
                userId,
                form
            );

            setOriginal(form);
            setIsEditing(false);

            toast.success(res?.message || "Permanent address updated successfully");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update address");
        }
    };

    const handleCancel = () => {
        setForm(original);
        setIsEditing(false);
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
                            setForm((prev) => ({ ...prev, status: checked ? 1 : 0 }))
                        }
                    />

                    <div>
                        <p className="text-sm font-medium">Profile Visibility</p>
                        <p className="text-xs text-muted-foreground">
                            {form.status === 1 ? "Visible" : "Hidden"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save</Button>
                        </>
                    )}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* COUNTRY */}
                <div>
                    <Label>Country</Label>
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                            <Button disabled={!isEditing} className="w-full justify-between" variant="outline">
                                {countries.find(c => String(c.id) === form.country_id)?.name || "Select Country"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {countries.map(c => (
                                        <CommandItem
                                            key={c.id}
                                            onSelect={() => handleCountry(Number(c.id))}
                                        >
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
                            <Button disabled={!isEditing || !form.country_id} className="w-full justify-between" variant="outline">
                                {states.find(s => String(s.id) === form.state_id)?.name || "Select State"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {states.map(s => (
                                        <CommandItem
                                            key={s.id}
                                            onSelect={() => handleState(Number(s.id))}
                                        >
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
                            <Button disabled={!isEditing || !form.state_id} className="w-full justify-between" variant="outline">
                                {cities.find(c => String(c.id) === form.city_id)?.name || "Select City"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput />
                                <CommandList>
                                    {cities.map(c => (
                                        <CommandItem
                                            key={c.id}
                                            onSelect={() => update("city_id", String(c.id))}
                                        >
                                            {c.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* ADDRESS 1 */}
                <div>
                    <Label>Address Line 1</Label>
                    <textarea
                        disabled={!isEditing}
                        className="w-full border rounded-md p-2"
                        value={form.address_line1}
                        onChange={(e) => update("address_line1", e.target.value)}
                    />
                </div>

                {/* ADDRESS 2 */}
                <div>
                    <Label>Address Line 2</Label>
                    <textarea
                        disabled={!isEditing}
                        className="w-full border rounded-md p-2"
                        value={form.address_line2}
                        onChange={(e) => update("address_line2", e.target.value)}
                    />
                </div>

                {/* PINCODE (STRICT NUMERIC) */}
                <div>
                    <Label>Pincode</Label>
                    <Input
                        disabled={!isEditing}
                        value={form.pincode}
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(e) =>
                            update("pincode", onlyNumbers(e.target.value))
                        }
                        placeholder="Only numbers allowed"
                    />
                </div>
            </div>
        </div>
    );
};

export default PermanentAddress;