import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse-soft text-primary font-display text-2xl">Loading...</div>
    </div>
  );
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
