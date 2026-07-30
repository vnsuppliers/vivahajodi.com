import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * PUBLIC ROUTE
 * Use this for: Login, Register, Forgot Password.
 * Action: Redirects to /dashboard if already authenticated.
 */
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null; // Keep it quiet during auth check
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};