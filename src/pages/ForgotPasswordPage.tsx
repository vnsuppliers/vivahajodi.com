import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setSent(true);
    toast.success("Password reset link sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Heart className="h-7 w-7 text-primary fill-primary" />
          <span className="font-display text-xl font-bold text-foreground">Vivāha</span>
        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Forgot Password</h1>
        <p className="text-muted-foreground mb-8">Enter your email and we'll send you a reset link</p>

        {sent ? (
          <div className="bg-rose-light rounded-xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">Check your inbox!</p>
            <p className="text-sm text-muted-foreground mb-4">We've sent a password reset link to <strong>{email}</strong></p>
            <Link to="/login"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to Login</Button></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" /></div>
            <Button type="submit" className="w-full">Send Reset Link</Button>
            <Link to="/login" className="flex items-center gap-2 text-sm text-primary hover:underline justify-center">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
