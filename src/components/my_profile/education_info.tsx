import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { masterService } from "@/services/master.service";
import { educationalInfoService } from "@/services/education_info.service";

import CreateEducationModal from "./modals/CreateEducationModal";
import EditEducationModal from "./modals/EditEducationModal";

import { Pencil, GraduationCap, Eye, Trash2 } from "lucide-react";
import type { EducationForm } from "@/interfaces/education.interface";
import DeleteConfirmModal from "./modals/DeleteEducationConfirmModal";

interface Props {
    userId: string;
}

const EducationInfo = ({ userId }: Props) => {
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [tableSpecialisations, setTableSpecialisations] = useState<any[]>([]);
    const [educations, setEducations] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [tableStates, setTableStates] = useState<any[]>([]);
    const [tableCities, setTableCities] = useState<any[]>([]);
    const [educationList, setEducationList] = useState<any[]>([]);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const initialForm: EducationForm = {
        education_id: "",
        specialisation_id: "",
        country_id: "",
        state_id: "",
        city_id: "",
        college_name: "",
        university_name: "",
        passing_year: "",
        education_address: "",
        education_info_status: "",
        status: 1,
        is_highest_education: false,
        education_info_id: "",
    };

    const [form, setForm] = useState<EducationForm>(initialForm);

    // ================= FETCH =================
    const fetchList = useCallback(async () => {
        if (!userId) return;
        const res = await educationalInfoService.getEducationInfo(userId);
        const data = res?.data || res || [];
        setEducationList(Array.isArray(data) ? data : []);
    }, [userId]);

    useEffect(() => {
        masterService.getEducation().then((res) => setEducations(Array.isArray(res) ? res : []));
        masterService.getCountries().then((res) => setCountries(Array.isArray(res) ? res : []));
        fetchList();
    }, [fetchList]);

    // ================= LOAD TABLE LOOKUP DATA =================
    useEffect(() => {
        if (!educationList.length) return;

        const countryIds = [...new Set(educationList.map(i => i.country_id).filter(Boolean))];
        const stateIds = [...new Set(educationList.map(i => i.state_id).filter(Boolean))];
        const educationIds = [...new Set(educationList.map(i => i.education_id).filter(Boolean))];

        countryIds.forEach(async (id) => {
            const res = await masterService.getStates(Number(id));
            setTableStates(prev => {
                const merged = [...prev, ...(Array.isArray(res) ? res : [])];
                return Array.from(new Map(merged.map(s => [s.id, s])).values());
            });
        });

        stateIds.forEach(async (id) => {
            const res = await masterService.getCities(Number(id));
            setTableCities(prev => {
                const merged = [...prev, ...(Array.isArray(res) ? res : [])];
                return Array.from(new Map(merged.map(c => [c.id, c])).values());
            });
        });

        educationIds.forEach(async (id) => {
            const res = await masterService.getSpecialisations(Number(id));
            setTableSpecialisations(prev => {
                const merged = [...prev, ...(Array.isArray(res) ? res : [])];
                return Array.from(new Map(merged.map(s => [s.id, s])).values());
            });
        });

    }, [educationList]);

    // ================= MAPS =================
    const countryMap = new Map(countries.map(c => [String(c.id), c.name]));
    const stateMap = new Map(tableStates.map(s => [String(s.id), s.name]));
    const cityMap = new Map(tableCities.map(c => [String(c.id), c.name]));
    const specialisationMap = new Map(tableSpecialisations.map(s => [String(s.id), s.name]));

    // ================= TRIGGER EDIT CLOSURE MODAL =================
    const handleTriggerEdit = (item: any) => {
        // 🔥 FIXED: Converts the integers directly into dynamic string forms for drop-downs
        setForm({
            education_info_id: String(item.id),
            education_id: item.education_id ? String(item.education_id) : "",
            specialisation_id: item.specialisation_id ? String(item.specialisation_id) : "",
            country_id: item.country_id ? String(item.country_id) : "",
            state_id: item.state_id ? String(item.state_id) : "",
            city_id: item.city_id ? String(item.city_id) : "",
            college_name: item.college_name ?? "",
            university_name: item.university_name ?? "",
            passing_year: item.passing_year ? String(item.passing_year) : "",
            education_address: item.education_address ?? "",
            education_info_status: item.education_info_status ? String(item.education_info_status) : "",
            status: item.status !== undefined ? Number(item.status) : 1,
            is_highest_education: item.is_highest_education === 1 || item.is_highest_education === true,
        });
        setEditOpen(true);
    };

    // ================= SAVE =================
    const handleSave = async () => {
        try {
            setLoading(true);

            const {
                education_info_id,
                encrypted_id,
                id,
                user_id,
                created_at,
                updated_at,
                ...rest
            } = form as any;

            const payload = {
                ...rest,
                education_id: Number(form.education_id),
                specialisation_id: Number(form.specialisation_id),
                country_id: Number(form.country_id),
                state_id: Number(form.state_id),
                city_id: Number(form.city_id),
                passing_year: Number(form.passing_year),
                is_highest_education: form.is_highest_education ? 1 : 0,
                education_info_status: Number(form.education_info_status),
            };

            if (form.education_info_id) {
                await educationalInfoService.updateEducationInfo(form.education_info_id, payload);
                toast.success("Updated successfully");
            } else {
                await educationalInfoService.createEducationInfo(userId, payload);
                toast.success("Created successfully");
            }

            setCreateOpen(false);
            setEditOpen(false);
            fetchList();
        } catch (e: any) {
            const msg = e?.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg.join(", ") : (msg || "Failed"));
        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE =================
// ================= DELETE =================
    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            setDeleteLoading(true);
            await educationalInfoService.deleteEducationInfo(deleteTarget.id);
            toast.success("Deleted successfully");
            setDeleteOpen(false);
            setDeleteTarget(null);
            fetchList();
        } catch (e) {
            toast.error("Failed to delete record");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-3xl border p-6 mt-5 shadow-sm">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">Education Details</h2>
                <Button onClick={() => { setForm(initialForm); setCreateOpen(true); }}>
                    Add Education
                </Button>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="grid gap-3 md:hidden">
                {educationList.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No education info found</p>
                ) : (
                    educationList.map((item) => {
                        const isHighest = item.is_highest_education === 1;
                        const isActive = item.status === 1;

                        return (
                            <div key={item.id} className="border rounded-xl p-3 bg-white shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className="font-semibold">
                                        {educations.find(e => String(e.id) === String(item.education_id))?.name || "-"}
                                    </div>
                                    <div className="flex gap-1 flex-wrap justify-end">
                                        {isHighest && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                                <GraduationCap className="h-3 w-3" />
                                                Highest Degree
                                            </span>
                                        )}
                                        {isActive ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                                <Eye className="h-3 w-3" />
                                                Visible to Others
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 mt-1 font-medium">
                                    {specialisationMap.get(String(item.specialisation_id)) || "-"}
                                </div>

                                <div className="text-sm text-gray-500 mt-0.5">
                                    {item.college_name || "-"} • {item.passing_year || "-"}
                                </div>

                                <div className="mt-1">
                                    {item.education_info_status == 1 ? (
                                        <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                            Completed
                                        </span>
                                    ) : item.education_info_status == 2 ? (
                                        <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                                            Pursuing
                                        </span>
                                    ) : (
                                        <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                                            Dropped
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <Button size="icon" variant="ghost" onClick={() => handleTriggerEdit(item)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => { setDeleteTarget(item); setDeleteOpen(true); }}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block">
                <div className="overflow-y-auto max-h-[420px] border rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 sticky top-0 z-20">
                            <tr>
                                <th className="p-3 text-left">Education Level</th>
                                <th className="p-3 text-left">Specialisation</th>
                                <th className="p-3 text-left">College</th>
                                <th className="p-3 text-left">University</th>
                                <th className="p-3 text-left">Year</th>
                                <th className="p-3 text-left">Country</th>
                                <th className="p-3 text-left">State</th>
                                <th className="p-3 text-left">City</th>
                                <th className="p-3 text-left">Edu. Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {educationList.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-10 text-muted-foreground">
                                        No education info found
                                    </td>
                                </tr>
                            ) : (
                                educationList.map((item) => {
                                    const isHighest = item.is_highest_education === 1;
                                    const isActive = item.status === 1;

                                    return (
                                        <tr key={item.id} className="border-b hover:bg-slate-50">
                                            <td className="p-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium">
                                                        {educations.find(e => String(e.id) === String(item.education_id))?.name || "-"}
                                                    </span>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {isHighest && (
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                                                <GraduationCap className="h-3 w-3" />
                                                                Highest Degree
                                                            </span>
                                                        )}
                                                        {isActive ? (
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                                                <Eye className="h-3 w-3" />
                                                                Visible to Others
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                                Hidden
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-3">{specialisationMap.get(String(item.specialisation_id)) || "-"}</td>
                                            <td className="p-3">{item.college_name || "-"}</td>
                                            <td className="p-3">{item.university_name || "-"}</td>
                                            <td className="p-3">{item.passing_year || "-"}</td>
                                            <td className="p-3">{countryMap.get(String(item.country_id)) || "-"}</td>
                                            <td className="p-3">{stateMap.get(String(item.state_id)) || "-"}</td>
                                            <td className="p-3">{cityMap.get(String(item.city_id)) || "-"}</td>

                                            <td className="p-3">
                                                {item.education_info_status == 1 ? (
                                                    <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                        Completed
                                                    </span>
                                                ) : item.education_info_status == 2 ? (
                                                    <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                                                        Pursuing
                                                    </span>
                                                ) : item.education_info_status == 3 ? (
                                                    <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                                                        Dropped
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>

                                            <td className="p-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Button size="icon" variant="ghost" onClick={() => handleTriggerEdit(item)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={() => { setDeleteTarget(item); setDeleteOpen(true); }}>
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALS */}
            <CreateEducationModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                loading={loading}
                handleSave={handleSave}
                form={form}
                setForm={setForm}
                educations={educations}
                countries={countries}
            />

            <EditEducationModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                loading={loading}
                handleSave={handleSave}
                form={form}
                setForm={setForm}
                educations={educations}
                countries={countries}
            />

            <DeleteConfirmModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
                loading={deleteLoading}
            />

        </div>
    );
};

export default EducationInfo;   