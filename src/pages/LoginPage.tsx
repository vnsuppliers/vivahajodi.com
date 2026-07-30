import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/dashboard"); // toast handled in AuthContext
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="text-center">
          <Heart className="h-16 w-16 text-yellow-400 mx-auto mb-6 fill-yellow-400/30" />
          <h2 className="font-display text-3xl font-bold text-white mb-4">Welcome Back</h2>
          <p className="text-white/80 max-w-sm">Your journey to finding the perfect partner continues here.</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            <span className="font-display text-xl font-bold text-foreground">Vivāha</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-slate-200 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl border-slate-200 focus:border-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(v as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-slate-600">Remember me</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register Free
              </Link>
            </p>

            <div className="flex justify-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest">
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;