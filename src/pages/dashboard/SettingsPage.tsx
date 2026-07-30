import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Camera, Loader2, Clock, Ban, UserX, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { ProfileSettingsService } from "@/services/profile_settings.service";

const SettingsPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Status mapping: 1 = Active, 0 = Pending, 2 = Suspended, 3 = Deactivated
  const [userStatus, setUserStatus] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_online: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileSettingsService.getProfile();
        setFormData({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
          password: "",
          is_online: data.is_online === 1 || data.is_online === true,
        });

        if (data.profile_image) {
          setPreview(data.profile_image);
        }

        setUserStatus(data.is_verified ?? 1);
        setStatusMessage(data.account_status_message ?? "");
      } catch (error) {
        toast.error("Failed to load profile settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    if (file) {
      data.append("profile_image", file);
    }

    try {
      await ProfileSettingsService.updateProfile(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="w-full flex justify-center items-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center py-8">
        <div className="w-full max-w-2xl bg-card rounded-2xl border border-border p-8 shadow-sm space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
            <p className="text-sm text-muted-foreground">Modify your credentials and profile presence information details below.</p>
          </div>

          {/*  STATUS 0: PENDING REVIEW */}
          {userStatus === 0 && (
            <div className="flex items-start gap-4 bg-amber-500/10 border border-amber-500/20 text-amber-800 p-5 rounded-xl text-sm leading-relaxed">
              <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div className="space-y-2 w-full">
                <div className="text-base font-bold text-amber-900">Account Status: Pending Review</div>
                <p className="text-amber-800/90">Your profile layout details are editable on this page. However, updates will not reflect across matching feeds until our administration moderation team finishes verification check processing rules.</p>
              </div>
            </div>
          )}

          {/*  STATUS 2: SUSPENDED */}
          {userStatus === 2 && (
            <div className="flex items-start gap-4 bg-destructive/10 border border-destructive/20 text-destructive p-5 rounded-xl text-sm leading-relaxed">
              <Ban className="h-5 w-5 flex-shrink-0 mt-0.5 text-destructive" />
              <div className="space-y-3 w-full">
                <div className="text-base font-bold text-red-900">Account Status: Suspended</div>
                <p className="text-red-800/90">Your public profile features remain frozen across global matchmaking channels. You can use the form below to correct your credentials or fix errors specified by administration compliance filters.</p>
                <div className="pt-2 border-t border-destructive/20 text-xs text-red-900 bg-destructive/5 p-3 rounded-lg">
                  <span className="font-bold uppercase tracking-wider block mb-1 text-red-950">Reason for Suspension:</span>
                  <p className="italic font-medium text-sm">"{statusMessage || "Violation of matchmaking community usage guidelines."}"</p>
                </div>
              </div>
            </div>
          )}

          {/*  STATUS 3: DEACTIVATED */}
          {userStatus === 3 && (
            <div className="flex items-start gap-4 bg-muted border border-border text-foreground/80 p-5 rounded-xl text-sm leading-relaxed">
              <UserX className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="space-y-3 w-full">
                <div className="text-base font-bold text-foreground">Account Status: Deactivated</div>
                <p className="text-muted-foreground">Your presence registry records are currently hidden from other members. You are fully allowed to safely complete, edit, and update your profile parameters below.</p>
                <div className="pt-2 border-t border-border/60 text-xs text-foreground/90 bg-muted/50 p-3 rounded-lg">
                  <span className="font-bold uppercase tracking-wider block mb-1 text-foreground/70">Reason for Deactivation:</span>
                  <p className="italic font-medium text-sm">"{statusMessage || "Requested by profile owner or admin configuration modification."}"</p>
                </div>
              </div>
            </div>
          )}

          {/* FORM HOUSING */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full border-4 border-muted overflow-hidden bg-muted flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <Label htmlFor="picture" className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:opacity-90 transition-opacity">
                <Camera className="h-4 w-4" />
                <input id="picture" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </Label>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <Input value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="Leave blank to keep current password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border">
              <div>
                <p className="text-sm font-medium">Online Status</p>
              </div>
              <Switch checked={formData.is_online} onCheckedChange={(val) => setFormData({ ...formData, is_online: val })} />
            </div>

            <Button size="lg" className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {saving ? "Saving Changes..." : "Save Profile Changes"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;