import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const BlockedPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl border border-destructive/20">
        <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center border border-destructive/20 mx-auto mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Account Blocked</h1>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Your account has been blocked by the administrator due to policy or compliance violations. If you believe this is a mistake, please contact support.
        </p>
        <Button variant="outline" onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default BlockedPage;