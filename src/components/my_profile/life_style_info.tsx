import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  LifestyleFormData,
  initialLifestyleFormData,
} from "@/interfaces/life_style_info.interface";
import { lifeStyleInfoService } from "@/services/lifestyle.service";

const LifestyleInfo = ({ userId }: { userId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(1);

  const [formData, setFormData] = useState<LifestyleFormData>(initialLifestyleFormData);
  const [originalData, setOriginalData] = useState<LifestyleFormData>(initialLifestyleFormData);

  // ================= FETCH =================
  useEffect(() => {
    if (!userId) return;

    lifeStyleInfoService
      .getLifeStyleInfo(userId)
      .then((res) => {
        const data = res?.data ?? res;
        if (!data) return;

        setStatus(Number(data.status ?? 1));

        const mapped: LifestyleFormData = {
          diet: data.diet || "",
          smoking: data.smoking || "",
          drinking: data.drinking || "",
          body_type: data.body_type || data.bodyType || "",
          physical_status: data.physical_status || "",
          fitness_level: data.fitness_level || "",
          sleep_habit: data.sleep_habit || "",
          wake_up_time: data.wake_up_time || "",
          living_style: data.living_style || "",
          family_type: data.family_type || "",
          social_habits: data.social_habits || "",
          travel_habits: data.travel_habits || "",
          food_habits: data.food_habits || "",
          fashion_style: data.fashion_style || "",
          pet_preference: data.pet_preference || "",
          driving_habit: data.driving_habit || "",
          work_life_balance: data.work_life_balance || "",
          religious_lifestyle:
            data.religious_lifestyle || data.religious_ife_style || "",
        };

        setFormData(mapped);
        setOriginalData(mapped);
      })
      .catch((err) => console.log("LIFESTYLE FETCH ERROR:", err));
  }, [userId]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      //  FIXED: Explicitly construct the payload with ONLY valid DTO properties.
      // This completely strips out accidental hidden properties like 'id' or 'user_id' from the body object.
      const payload = {
        diet: formData.diet || "",
        smoking: formData.smoking || "",
        drinking: formData.drinking || "",
        body_type: formData.body_type || "",
        physical_status: formData.physical_status || "",
        fitness_level: formData.fitness_level || "",
        sleep_habit: formData.sleep_habit || "",
        wake_up_time: formData.wake_up_time || "",
        living_style: formData.living_style || "",
        family_type: formData.family_type || "",
        social_habits: formData.social_habits || "",
        travel_habits: formData.travel_habits || "",
        food_habits: formData.food_habits || "",
        fashion_style: formData.fashion_style || "",
        pet_preference: formData.pet_preference || "",
        driving_habit: formData.driving_habit || "",
        work_life_balance: formData.work_life_balance || "",
        religious_lifestyle: formData.religious_lifestyle || "",
        status: Number(status),
      };

      const res = await lifeStyleInfoService.updateCreate(userId, payload);

      toast.success(res?.message || "Lifestyle updated successfully");
      setOriginalData(formData);
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.message;
      toast.error(
        Array.isArray(message) ? message.join(", ") : (message || "Update failed")
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldLabels: Record<keyof LifestyleFormData, string> = {
    diet: "Diet",
    smoking: "Smoking",
    drinking: "Drinking",
    body_type: "Body Type",
    physical_status: "Physical Status",
    fitness_level: "Fitness Level",
    sleep_habit: "Sleep Habit",
    wake_up_time: "Wake Up Time",
    living_style: "Living Style",
    family_type: "Family Type",
    social_habits: "Social Habits",
    travel_habits: "Travel Habits",
    food_habits: "Food Habits",
    fashion_style: "Fashion Style",
    pet_preference: "Pet Preference",
    driving_habit: "Driving Habit",
    work_life_balance: "Work Life Balance",
    religious_lifestyle: "Religious Lifestyle",
  };

  const fieldPlaceholders: Record<keyof LifestyleFormData, string> = {
    diet: "Enter diet",
    smoking: "Enter smoking habit",
    drinking: "Enter drinking habit",
    body_type: "Enter body type",
    physical_status: "Enter physical status",
    fitness_level: "Enter fitness level",
    sleep_habit: "Enter sleep habit",
    wake_up_time: "Enter wake up time",
    living_style: "Enter living style",
    family_type: "Enter family type",
    social_habits: "Enter social habits",
    travel_habits: "Enter travel habits",
    food_habits: "Enter food habits",
    fashion_style: "Enter fashion style",
    pet_preference: "Enter pet preference",
    driving_habit: "Enter driving habit",
    work_life_balance: "Enter work life balance",
    religious_lifestyle: "Enter religious lifestyle",
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
            onCheckedChange={(checked) => setStatus(checked ? 1 : 0)}
          />
          <div>
            <p className="text-sm font-medium">Profile Visibility</p>
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
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(Object.keys(formData) as Array<keyof LifestyleFormData>).map((key) => (
          <div key={key}>
            <Label>{fieldLabels[key]}</Label>

            <Input
              name={key}
              value={formData[key] ?? ""}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={fieldPlaceholders[key]}
              className="mt-1"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default LifestyleInfo;