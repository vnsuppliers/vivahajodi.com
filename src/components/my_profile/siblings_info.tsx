import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import {
    Pencil,
    Trash2,
    Eye,
} from "lucide-react";

import { masterService } from "@/services/master.service";
import { siblingsInfoService } from "@/services/siblings_info.service";

import CreateSiblingsInfoModal from "./modals/CreateSiblingsInfoModal";
import EditSiblingsInfoModal from "./modals/EditSiblingsInfoModal";
import DeleteSiblingsInfoConfirmModal from "./modals/DeleteSiblingsInfoConfirmModal";

interface Props {
    userId: string;
}

const initialForm = {
    sibling_info_id: "",

    name: "",
    date_of_birth: "",
    relation: "",
    is_elder: 0,

    marital_status: "",

    educational_qualification: "",
    profession: "",
    company_name: "",

    spouse_name: "",
    spouse_profession: "",

    children_count: "",

    additional_notes: "",

    country_id: "",
    state_id: "",
    city_id: "",

    status: 1,
};

const SiblingsInfo = ({ userId }: Props) => {

    const [list, setList] = useState<any[]>([]);

    const [countries, setCountries] = useState<any[]>([]);

    const [tableStates, setTableStates] =
        useState<any[]>([]);

    const [tableCities, setTableCities] =
        useState<any[]>([]);

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [deleteTarget, setDeleteTarget] =
        useState<any>(null);

    const [form, setForm] =
        useState(initialForm);

    // ================= FETCH =================
    const fetchList = useCallback(async () => {
        try {
            if (!userId) return;

            const res =
                await siblingsInfoService.getByUserId(
                    userId
                );

            const data = res?.data ?? res ?? [];

            setList(Array.isArray(data) ? data : []);

        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    // ================= LOAD =================
    useEffect(() => {
        fetchList();

        masterService.getCountries().then((res) => {
            setCountries(
                Array.isArray(res) ? res : []
            );
        });

    }, [fetchList]);

    // ================= LOAD STATES/CITIES =================
    useEffect(() => {

        if (!list.length) return;

        const countryIds = [
            ...new Set(
                list
                    .map((i) => i.country_id)
                    .filter(Boolean)
            ),
        ];

        const stateIds = [
            ...new Set(
                list
                    .map((i) => i.state_id)
                    .filter(Boolean)
            ),
        ];

        countryIds.forEach(async (id) => {

            const res =
                await masterService.getStates(
                    Number(id)
                );

            setTableStates((prev) => {

                const merged = [
                    ...prev,
                    ...(res || []),
                ];

                return Array.from(
                    new Map(
                        merged.map((s) => [s.id, s])
                    ).values()
                );

            });

        });

        stateIds.forEach(async (id) => {

            const res =
                await masterService.getCities(
                    Number(id)
                );

            setTableCities((prev) => {

                const merged = [
                    ...prev,
                    ...(res || []),
                ];

                return Array.from(
                    new Map(
                        merged.map((c) => [c.id, c])
                    ).values()
                );

            });

        });

    }, [list]);

    // ================= MAPS =================
    const countryMap = new Map(
        countries.map((c) => [
            String(c.id),
            c.name,
        ])
    );

    const stateMap = new Map(
        tableStates.map((s) => [
            String(s.id),
            s.name,
        ])
    );

    const cityMap = new Map(
        tableCities.map((c) => [
            String(c.id),
            c.name,
        ])
    );

    // ================= LOCATION =================
    const getLocation = (item: any) => {

        const country =
            countryMap.get(
                String(item.country_id)
            ) || "";

        const state =
            stateMap.get(
                String(item.state_id)
            ) || "";

        const city =
            cityMap.get(
                String(item.city_id)
            ) || "";

        return `${country}, ${state}, ${city}`;

    };

    // ================= SAVE =================
    const handleSave = async () => {

        try {

            setLoading(true);

            const payload = {
                name: form.name || "",
                date_of_birth:
                    form.date_of_birth || "",

                relation: form.relation || "",

                is_elder: Number(form.is_elder),

                marital_status:
                    form.marital_status || "",

                educational_qualification:
                    form.educational_qualification || "",

                profession:
                    form.profession || "",

                company_name:
                    form.company_name || "",

                spouse_name:
                    form.spouse_name || "",

                spouse_profession:
                    form.spouse_profession || "",

                children_count:
                    form.children_count || "",

                additional_notes:
                    form.additional_notes || "",

                country_id:
                    form.country_id || null,

                state_id:
                    form.state_id || null,

                city_id:
                    form.city_id || null,

                status:
                    Number(form.status),
            };

            // UPDATE
            if (form.sibling_info_id) {

                await siblingsInfoService.update(
                    form.sibling_info_id,
                    payload
                );

                toast.success(
                    "Sibling updated successfully"
                );

            } else {

                // CREATE
                await siblingsInfoService.create(
                    userId,
                    payload
                );

                toast.success(
                    "Sibling created successfully"
                );
            }

            setCreateOpen(false);
            setEditOpen(false);

            setForm(initialForm);

            await fetchList();

        } catch (error: any) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE =================
    const handleDelete = async () => {

        try {

            setLoading(true);

            await siblingsInfoService.delete(
                deleteTarget.encrypted_id
            );

            toast.success(
                "Sibling deleted successfully"
            );

            setDeleteOpen(false);

            await fetchList();

        } catch (error: any) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Delete failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-3xl border p-6 mt-5 shadow-sm">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold">
                    Siblings Information
                </h2>

                <Button
                    onClick={() => {
                        setForm(initialForm);
                        setCreateOpen(true);
                    }}
                >
                    Add Sibling
                </Button>

            </div>

                    {/* TABLE */}
<div className="border rounded-2xl overflow-hidden">

    <div
    className="overflow-x-auto overflow-y-auto max-h-[420px] relative"
        style={{ WebkitOverflowScrolling: "touch" }}
    >
        <table className="w-max min-w-[1200px] text-sm">

            <thead className="bg-slate-50 sticky top-0 z-20">
                <tr className="border-b">
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Name</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Relation</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Elder / Younger</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Marital Status</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Education</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Sibling name / Profession</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Spouse name / Profession</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Children</th>
                    <th className="p-3 text-left font-semibold whitespace-nowrap">Location</th>
                    <th className="p-3 text-center font-semibold sticky right-0 z-20 bg-slate-50 min-w-[120px]">Actions</th>
                </tr>
            </thead>

            <tbody>
                {list.length > 0 ? (
                    list.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">

                            {/* NAME */}
                            <td className="p-3 align-top min-w-[180px]">
                                <div className="font-medium break-words">{item.name || "-"}</div>
                                <div className="mt-2">
                                    {Number(item.status) === 1 ? (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                                            <Eye className="h-3 w-3" /> Visible
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            Hidden
                                        </span>
                                    )}
                                </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">{item.relation || "-"}</td>

                            <td className="p-3 whitespace-nowrap">
                                {Number(item.is_elder) === 1 ? "Elder" : Number(item.is_elder) === 2 ? "Twins" : "Younger"}
                            </td>

                            <td className="p-3 whitespace-nowrap">{item.marital_status || "-"}</td>

                            <td className="p-3 min-w-[200px] break-words">{item.educational_qualification || "-"}</td>

                            <td className="p-3 min-w-[220px]">
                                <div className="break-words">{item.profession || "-"}</div>
                                <div className="text-xs text-muted-foreground break-words mt-1">{item.company_name || ""}</div>
                            </td>

                            <td className="p-3 min-w-[200px]">
                                <div className="break-words">{item.spouse_name || "-"}</div>
                                <div className="text-xs text-muted-foreground break-words mt-1">{item.spouse_profession || ""}</div>
                            </td>

                            <td className="p-3 whitespace-nowrap">{item.children_count || "-"}</td>

                            <td className="p-3 min-w-[220px] break-words">{getLocation(item)}</td>

                            {/* ACTIONS */}
                            <td className="p-3 sticky right-0 z-30 bg-white">
                                <div className="flex items-center justify-center gap-2 relative z-40">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setForm({
                                                ...item,
                                                sibling_info_id: item.encrypted_id,
                                                country_id: String(item.country_id || ""),
                                                state_id: String(item.state_id || ""),
                                                city_id: String(item.city_id || ""),
                                            });
                                            setEditOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setDeleteTarget(item);
                                            setDeleteOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={10} className="text-center py-10 text-muted-foreground">
                            No sibling information found
                        </td>
                    </tr>
                )}
            </tbody>

        </table>
    </div>

</div>

            {/* CREATE */}
            <CreateSiblingsInfoModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                loading={loading}
                handleSave={handleSave}
                form={form}
                setForm={setForm}
                countries={countries}
            />

            {/* EDIT */}
            <EditSiblingsInfoModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                loading={loading}
                handleSave={handleSave}
                form={form}
                setForm={setForm}
                countries={countries}
            />

            {/* DELETE */}
            <DeleteSiblingsInfoConfirmModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />

        </div>
    );
};

export default SiblingsInfo;