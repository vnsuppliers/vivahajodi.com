import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Eye } from "lucide-react";
import { professionInfoService } from "@/services/profession_info.service";
import { masterService } from "@/services/master.service";
import type { ProfessionInfo } from "@/interfaces/profession.interface";
import CreateProfessionModal from "./modals/CreateProfessionModal";
import EditProfessionModal from "./modals/EditProfessionModal";
import DeleteProfessionConfirmModal from "./modals/DeleteProfessionConfirmModal";

interface Props {
  userId: string;
}

const ProfessionInfo = ({ userId }: Props) => {

  const [list, setList] = useState<any[]>([]);
  const [professions, setProfessions] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  // TABLE-ONLY display maps — modals never touch these
  const [tableStates, setTableStates] = useState<any[]>([]);
  const [tableCities, setTableCities] = useState<any[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const initialForm: ProfessionInfo = {
    profession_id: "",
    designation_id: "",
    company_name: "",
    experience: "",
    income: "",
    country_id: "",
    state_id: "",
    city_id: "",
    location: "",
    description: "",
    status: 1,
    profession_info_id: "",
  };

  const [form, setForm] = useState<ProfessionInfo>(initialForm);

  const fetchList = useCallback(async () => {
    try {
      if (!userId) return;
      const res = await professionInfoService.getByUserId(userId);
      const data = res?.data ?? res ?? [];
      setList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchList();
    masterService.getCountries().then((res) => {
      setCountries(Array.isArray(res) ? res : []);
    });
    masterService.getProfessionMaster().then((res) => {
      setProfessions(Array.isArray(res) ? res : []);
    });
  }, [fetchList]);

  // Load states/cities only for TABLE display
  useEffect(() => {
    if (!list.length) return;

    const countryIds = [...new Set(list.map((i) => i.country_id).filter(Boolean))];
    const stateIds = [...new Set(list.map((i) => i.state_id).filter(Boolean))];

    countryIds.forEach(async (id) => {
      const res = await masterService.getStates(Number(id));
      setTableStates((prev) => {
        const merged = [...prev, ...(res || [])];
        return Array.from(new Map(merged.map((s) => [s.id, s])).values());
      });
    });

    stateIds.forEach(async (id) => {
      const res = await masterService.getCities(Number(id));
      setTableCities((prev) => {
        const merged = [...prev, ...(res || [])];
        return Array.from(new Map(merged.map((c) => [c.id, c])).values());
      });
    });
  }, [list]);

  const countryMap = new Map(countries.map((c) => [String(c.id), c.name]));
  const stateMap = new Map(tableStates.map((s) => [String(s.id), s.name]));
  const cityMap = new Map(tableCities.map((c) => [String(c.id), c.name]));

  const getLocation = (item: any) => {
    const country = countryMap.get(String(item.country_id)) || " ";
    const state = stateMap.get(String(item.state_id)) || " ";
    const city = cityMap.get(String(item.city_id)) || " ";
    return `${country}, ${state}, ${city}`;
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!form.profession_id) { toast.error("Profession is required"); return; }
      if (!form.designation_id) { toast.error("Designation is required"); return; }

      const payload = {
        profession_id: String(form.profession_id),
        designation_id: String(form.designation_id),
        company_name: form.company_name || "",
        experience: form.experience || "",
        income: form.income || "",
        location: form.location || "",
        description: form.description || "",
        status: Number(form.status),
        country_id: form.country_id ? String(form.country_id) : null,
        state_id: form.state_id ? String(form.state_id) : null,
        city_id: form.city_id ? String(form.city_id) : null,
      };

      if (form.profession_info_id) {
        await professionInfoService.update(form.profession_info_id, payload);
        toast.success("Profession updated successfully");
      } else {
        await professionInfoService.create(userId, payload);
        toast.success("Profession created successfully");
      }

      setCreateOpen(false);
      setEditOpen(false);
      setForm(initialForm);
      await fetchList();

    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await professionInfoService.delete(deleteTarget.encrypted_id);
      toast.success("Profession deleted successfully");
      setDeleteOpen(false);
      await fetchList();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl border p-6 mt-5 shadow-sm">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">Professional Details</h2>
        <Button onClick={() => { setForm(initialForm); setCreateOpen(true); }}>
          Add Profession
        </Button>
      </div>

      <div className="overflow-y-auto max-h-[420px] border rounded-xl">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-slate-50 sticky top-0 z-20">
            <tr className="border-b">
              <th className="p-3 text-left">Profession</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Income</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center sticky right-0 z-20 bg-slate-50 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-3">
                    {item.profession?.profession_name || " "}
                    <div>
                      {Number(item.status) === 1 ? (
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
                  </td>
                  <td className="p-3">{item.designation?.designation_name || " "}</td>
                  <td className="p-3">{item.company_name || " "}</td>
                  <td className="p-3">{item.experience || " "}</td>
                  <td className="p-3">{item.income || "-"}</td>

                  {/* Location */}
                  <td className="p-3 align-top">
                    <div className="max-w-[220px] break-words whitespace-pre-wrap">
                      {getLocation(item)}
                    </div>
                  </td>

                  {/* Address */}
                  <td className="p-3 align-top">
                    <div
                      className="max-w-[250px] max-h-24 overflow-y-auto break-words whitespace-pre-wrap"
                      title={item.location}
                    >
                      {item.location || "-"}
                    </div>
                  </td>

                  {/* Description */}
                  <td className="p-3 align-top">
                    <div
                      className="max-w-[300px] max-h-24 overflow-y-auto break-words whitespace-pre-wrap"
                      title={item.description}
                    >
                      {item.description || "-"}
                    </div>
                  </td>
                  <td className="p-3 sticky right-0 z-10 bg-white">
                    <div className="flex items-center justify-center gap-2">

                      {/* Edit — just set form and open modal. Modal loads its own dropdown data internally. */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setForm({
                            ...item,
                            profession_info_id: item.encrypted_id,
                            profession_id: String(item.profession_id),
                            designation_id: String(item.designation_id),
                            country_id: String(item.country_id),
                            state_id: String(item.state_id),
                            city_id: String(item.city_id),
                          });
                          setEditOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => { setDeleteTarget(item); setDeleteOpen(true); }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10 text-muted-foreground">
                  No profession info found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* No more states/cities/designations props */}
      <CreateProfessionModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        loading={loading}
        handleSave={handleSave}
        form={form}
        setForm={setForm}
        professions={professions}
        countries={countries}
      />

      <EditProfessionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        loading={loading}
        handleSave={handleSave}
        form={form}
        setForm={setForm}
        professions={professions}
        countries={countries}
      />

      <DeleteProfessionConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProfessionInfo;