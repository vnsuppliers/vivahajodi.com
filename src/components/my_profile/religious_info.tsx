import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { masterService } from "@/services/master.service";
import { religiousInfoService } from "@/services/religious_info_service";

interface Props {
  userId: string;
  profile: any;
}

interface FormData {
  religion_id: string;
  caste: string;
  sub_caste: string;
  mother_tongue_id: string;
}

const ReligiousInfo = ({ userId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    religion_id: "",
    caste: "",
    sub_caste: "",
    mother_tongue_id: "",
  });

  const [original, setOriginal] = useState<FormData>(form);

  const [religions, setReligions] = useState<any[]>([]);
  const [motherTongues, setMotherTongues] = useState<any[]>([]);

  // ---------------- MASTER DATA ----------------
  useEffect(() => {
    masterService.getReligions().then((res) => setReligions(res || []));
    masterService.getMotherTongues().then((res) => setMotherTongues(res || []));
  }, []);

  // ---------------- FETCH USER DATA ----------------
  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        const res = await religiousInfoService.getReligiousInfo(userId);
        const data = res?.data || res;

        const mapped = {
          religion_id: data?.religion_id ? String(data.religion_id) : "",
          caste: data?.caste || "",
          sub_caste: data?.sub_caste || "",
          mother_tongue_id: data?.mother_tongue_id
            ? String(data.mother_tongue_id)
            : "",
        };

        setForm(mapped);
        setOriginal(mapped);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [userId]);

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    try {
      setLoading(true);

      await religiousInfoService.updateReligiousInfo(userId, {
        religion_id: form.religion_id ? Number(form.religion_id) : null,
        caste: form.caste || null,
        sub_caste: form.sub_caste || null,
        mother_tongue_id: form.mother_tongue_id ? Number(form.mother_tongue_id) : null,
      });

      toast.success("Religious info updated successfully");

      setOriginal(form);
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CANCEL ----------------
  const handleCancel = () => {
    setForm(original);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-3xl border p-8 mt-5">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Religious Information</h2>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <Button className="grid grid-cols-1" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* RELIGION */}
        <div>
          <Label>Religion</Label>
          <Select
            value={form.religion_id}
            disabled={!isEditing}
            onValueChange={(value) =>
              setForm((p) => ({ ...p, religion_id: value }))
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Religion" />
            </SelectTrigger>

            <SelectContent>
              {religions.map((r) => (
                <SelectItem key={r.id} value={String(r.id)}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CASTE */}
        <div>
          <Label>Caste</Label>
          <input
            disabled={!isEditing}
            className="mt-2 w-full border rounded px-3 py-2"
            value={form.caste}
            onChange={(e) =>
              setForm((p) => ({ ...p, caste: e.target.value }))
            }
          />
        </div>

        {/* SUB CASTE */}
        <div>
          <Label>Sub Caste</Label>
          <input
            disabled={!isEditing}
            className="mt-2 w-full border rounded px-3 py-2"
            value={form.sub_caste}
            onChange={(e) =>
              setForm((p) => ({ ...p, sub_caste: e.target.value }))
            }
          />
        </div>

        {/* MOTHER TONGUE */}
        <div>
          <Label>Mother Tongue</Label>

          <Select
            value={form.mother_tongue_id}
            disabled={!isEditing}
            onValueChange={(value) =>
              setForm((p) => ({ ...p, mother_tongue_id: value }))
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Mother Tongue" />
            </SelectTrigger>

            <SelectContent>
              {motherTongues.map((m) => (
                <SelectItem key={m.id} value={String(m.id)}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* SAVE */}
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReligiousInfo;