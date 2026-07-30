import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const UnderReviewRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.is_verified === 1) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};