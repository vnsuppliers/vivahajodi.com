import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    gender: "", dateOfBirth: "", religion: "", motherTongue: "", country: "", state: "", city: ""
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password || !form.gender) {
      toast.error("Please fill all required fields"); return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match"); return;
    }
    setLoading(true);
    const success = await register(form);
    setLoading(false);
    if (success) { toast.success("Account created!"); navigate("/dashboard"); }
  };

  const selectClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground mt-1.5 h-10";

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 gradient-hero items-center justify-center p-12">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gold mx-auto mb-6 fill-gold/30" />
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Begin Your Journey</h2>
          <p className="text-primary-foreground/80 max-w-sm">Create your profile and find your perfect life partner today.</p>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 overflow-auto">
        <div className="w-full max-w-2xl py-8">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            <span className="font-display text-xl font-bold text-foreground">Vivāha</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>First Name *</Label><Input placeholder="First name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="mt-1.5" /></div>
              <div><Label>Last Name</Label><Input placeholder="Last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Email *</Label><Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5" /></div>
              <div><Label>Phone</Label><Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Password *</Label><Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} className="mt-1.5" /></div>
              <div><Label>Confirm Password *</Label><Input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Gender *</Label>
                <select className={selectClass} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div><Label>Date of Birth</Label><Input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Religion</Label>
                <select className={selectClass} value={form.religion} onChange={(e) => update("religion", e.target.value)}>
                  <option value="">Select Religion</option>
                  <option>Hindu</option><option>Muslim</option><option>Christian</option><option>Sikh</option><option>Buddhist</option><option>Jain</option><option>Other</option>
                </select>
              </div>
              <div><Label>Mother Tongue</Label><Input placeholder="e.g. Hindi, Tamil" value={form.motherTongue} onChange={(e) => update("motherTongue", e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label>Country</Label><Input placeholder="India" value={form.country} onChange={(e) => update("country", e.target.value)} className="mt-1.5" /></div>
              <div><Label>State</Label><Input placeholder="Maharashtra" value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1.5" /></div>
              <div><Label>City</Label><Input placeholder="Mumbai" value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1.5" /></div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" required />
              <p className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating Account..." : "Create Account"}</Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
