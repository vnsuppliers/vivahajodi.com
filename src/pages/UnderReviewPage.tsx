// src/pages/UnderReviewPage.tsx
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const UnderReviewPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl border">
        <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Account Under Review</h1>
        <p className="text-muted-foreground mb-8">
          Your account is being reviewed by our team. You'll get access once approved.
        </p>
        <Button variant="outline" onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UnderReviewPage;