import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import type { RelativesInfo as RelativesInfoType } from "@/interfaces/relatives_info.interface";
import { relativesInfoService } from "@/services/relatives_info.service";

import CreateRelativesModal from "./modals/CreateRelativesModal";
import EditRelativesModal from "./modals/EditRelativesModal";
import DeleteRelativesConfirmModal from "./modals/DeleteRelativesConfirmModal";

interface Props {
  userId: string;
}

const RelativesInfo = ({ userId }: Props) => {
  const [list, setList] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const initialForm: RelativesInfoType = {
    relatives_info_id: "",
    relative_name: "",
    relation: "",
    occupation: "",
    location: "",
    contact_number: "",
    email: "",
    notes: "",
    status: 1,
  };

  const [form, setForm] = useState<RelativesInfoType>(initialForm);

  // ================= FETCH =================
  const fetchList = useCallback(async () => {
    try {
      if (!userId) return;
      const res = await relativesInfoService.getByUserId(userId);
      const data = res?.data ?? res ?? [];
      setList(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        relative_name: form.relative_name || "",
        relation: form.relation || "",
        occupation: form.occupation || "",
        location: form.location || "",
        contact_number: form.contact_number || "",
        email: form.email || "",
        notes: form.notes || "",
        status: Number(form.status),
      };

      // 
      //  ADD THIS TEMPORARY LOG TO INSPECT THE DATA STRUCTURE IN CONSOLE
      console.log(" PAYLOAD SENT TO BACKEND:", JSON.stringify(payload, null, 2));

      if (form.relatives_info_id) {
        await relativesInfoService.update(form.relatives_info_id, payload);
        toast.success("Relative info updated successfully");
      } else {
        await relativesInfoService.create(userId, payload);
        toast.success("Relative info created successfully");
      }

      setCreateOpen(false);
      setEditOpen(false);
      setForm(initialForm);
      await fetchList();
    } catch (error: any) {
      console.error("ERROR OBJECT:", error?.response?.data); //  Logs exact DTO feedback
      const message = error?.response?.data?.message;
      toast.error(Array.isArray(message) ? message.join(", ") : (message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      setLoading(true);
      await relativesInfoService.delete(deleteTarget.encrypted_id);
      toast.success("Relative info deleted successfully");
      setDeleteOpen(false);
      await fetchList();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (value?: string) => {
    return value?.trim() || "-";
  };

  return (
    <div className="bg-card rounded-3xl border p-6 mt-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">Relatives Information</h2>
        <Button onClick={() => { setForm(initialForm); setCreateOpen(true); }}>
          Add Relative
        </Button>
      </div>

      <div className="overflow-y-auto max-h-[500px] border rounded-xl">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-slate-50 sticky top-0 z-20">
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Relation</th>
              <th className="p-3 text-left">Occupation</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-center sticky right-0 z-20 bg-slate-50 w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-3">
                    {renderValue(item.relative_name)}
                    <div className="mt-2">
                      {Number(item.status) === 1 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          <Eye className="h-3 w-3" /> Visible
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{renderValue(item.relation)}</td>
                  <td className="p-3">{renderValue(item.occupation)}</td>
                  <td className="p-3">{renderValue(item.location)}</td>
                  <td className="p-3">{renderValue(item.contact_number)}</td>
                  <td className="p-3">{renderValue(item.email)}</td>
                  <td className="p-3">{renderValue(item.notes)}</td>
                  <td className="p-3 sticky right-0 z-10 bg-white">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setForm({
                            relative_name: item.relative_name || "",
                            relation: item.relation || "",
                            occupation: item.occupation || "",
                            location: item.location || "",
                            contact_number: item.contact_number || "",
                            email: item.email || "",
                            notes: item.notes || "",
                            status: item.status ?? 1,
                            relatives_info_id: item.encrypted_id, // Safely matches update criteria string keys
                          });
                          setEditOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setDeleteTarget(item); setDeleteOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10 text-muted-foreground">
                  No relatives info found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateRelativesModal open={createOpen} onClose={() => setCreateOpen(false)} loading={loading} handleSave={handleSave} form={form} setForm={setForm} />
      <EditRelativesModal open={editOpen} onClose={() => setEditOpen(false)} loading={loading} handleSave={handleSave} form={form} setForm={setForm} />
      <DeleteRelativesConfirmModal open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default RelativesInfo;