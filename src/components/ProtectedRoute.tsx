import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <div className="animate-pulse text-primary font-display text-xl">Verifying Session...</div>
      </div>
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  //  Blocked Check
  if (user?.account_status === "BLOCKED") return <Navigate to="/blocked" replace />;

  //  Suspended Check
  if (user?.is_verified === 2 || user?.account_status === "SUSPENDED") return <Navigate to="/suspended" replace />;

  //  Under Review Check
  if (user?.is_verified === 0) return <Navigate to="/under-review" replace />;

  return <>{children}</>;
};