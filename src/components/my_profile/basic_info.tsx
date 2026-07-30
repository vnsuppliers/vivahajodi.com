import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { masterService } from "@/services/master.service";
import { basicInfoService } from "@/services/basic_info.service";

import type { BasicInfoProps } from "@/interfaces/basic-info.interface";

import { toast } from "sonner";

interface FormData {
  first_name: string;
  last_name: string;
  gender_id: string;
  marital_status_id: string;
  dob: string;
  about: string;
  profile_pic: string;
  is_online: number; // 1 for active, 0 for inactive
}

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  gender_id: "",
  marital_status_id: "",
  dob: "",
  about: "",
  profile_pic: "",
  is_online: 1,
};

// Parses "yyyy-MM-dd" as LOCAL time, not UTC — avoids off-by-one-day bug
const parseDob = (dob: string): Date => {
  const [year, month, day] = dob.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Extending interface locally to dynamically handle parent context state refreshes
interface ExtendedBasicInfoProps extends BasicInfoProps {
  onRefresh?: () => void;
}

const BasicInfo = ({ profile, onRefresh }: ExtendedBasicInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [originalData, setOriginalData] = useState<FormData>(initialFormData);

  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);

  // MASTER DATA
  useEffect(() => {
    masterService.getGenders().then((res) => setGenders(res || []));
  }, []);

  // MAP PROFILE
  useEffect(() => {
    if (!profile) return;

    const formatted: FormData = {
      first_name: profile?.user?.first_name ?? "",
      last_name: profile?.user?.last_name ?? "",
      gender_id: profile?.gender_id ? String(profile.gender_id) : "",
      marital_status_id: profile?.marital_status_id
        ? String(profile.marital_status_id)
        : "",
      dob: profile?.date_of_birth ?? "",
      about: profile?.about ?? "",
      profile_pic: profile?.profile_image ?? "",
      is_online: profile?.user?.is_online !== undefined ? Number(profile.user.is_online) : 1,
    };

    setFormData(formatted);
    setOriginalData(formatted);
  }, [profile]);

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!profile?.user?.id) return;

    try {
      setLoading(true);

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender_id: Number(formData.gender_id),
        marital_status_id: formData.marital_status_id
          ? Number(formData.marital_status_id)
          : null,
        date_of_birth: formData.dob || null,
        about: formData.about,
        is_online: formData.is_online,
      };

      const res = await basicInfoService.updateBasicInfo(
        String(profile.user.id),
        payload
      );

      toast.success(res?.message || "Basic info updated successfully");

      setOriginalData(formData);
      setIsEditing(false);

      // Instantly triggers parent page's layout state to fetch refreshed data
      if (onRefresh) {
        onRefresh();
      }
    } catch (err: any) {
      console.error(err);
      // Reads either standard array validations or custom string exceptions cleanly
      const backendError = err?.response?.data?.message;
      const parsedMessage = Array.isArray(backendError)
        ? backendError[0]
        : backendError;

      toast.error(parsedMessage || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl border p-8 mt-5">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Basic Information</h2>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        )}
      </div>

      {/* FORM */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label>First Name</Label>
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select
            value={formData.gender_id}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, gender_id: value }))
            }
            disabled={!isEditing}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((g) => (
                <SelectItem key={g.id} value={String(g.id)}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* DOB */}
        <div>
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={!isEditing}
                variant="outline"
                className="w-full justify-start mt-2"
              >
                {formData.dob
                  ? format(parseDob(formData.dob), "dd MMM yyyy")
                  : "Select DOB"}
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode="single"
                selected={formData.dob ? parseDob(formData.dob) : undefined}
                onSelect={(date) => {
                  if (!date) return;
                  setFormData((p) => ({
                    ...p,
                    dob: format(date, "yyyy-MM-dd"),
                  }));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* is_online SWITCH */}
        <div className="flex flex-col justify-end pb-2">
          <div className="flex items-center space-x-2 h-10 mt-2">
            <Switch
              id="profile-is_online"
              checked={formData.is_online === 1}
              disabled={!isEditing}
              onCheckedChange={(checked) =>
                setFormData((p) => ({ ...p, is_online: checked ? 1 : 0 }))
              }
            />
            <Label htmlFor="profile-is_online" className="cursor-pointer select-none">
              {formData.is_online === 1 ? "Profile Active" : "Profile Inactive"}
            </Label>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="mt-6">
        <Label>About</Label>
        <Textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          disabled={!isEditing}
          className="mt-2"
        />
      </div>

      {/* SUBMIT */}
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;