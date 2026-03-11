import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

import DashboardPage from "./pages/dashboard/DashboardPage";
import MyProfilePage from "./pages/dashboard/MyProfilePage";
import SearchPage from "./pages/dashboard/SearchPage";
import MatchesPage from "./pages/dashboard/MatchesPage";
import { ReceivedInterestsPage, SentInterestsPage } from "./pages/dashboard/InterestsPage";
import { ShortlistedPage, LikedProfilesPage, VisitorsPage } from "./pages/dashboard/ListPages";
import MessagesPage from "./pages/dashboard/MessagesPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import ProfileViewPage from "./pages/dashboard/ProfileViewPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import { BlockedUsersPage, ReportsPage } from "./pages/dashboard/MiscPages";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<P><DashboardPage /></P>} />
            <Route path="/dashboard/my-profile" element={<P><MyProfilePage /></P>} />
            <Route path="/dashboard/search" element={<P><SearchPage /></P>} />
            <Route path="/dashboard/matches" element={<P><MatchesPage /></P>} />
            <Route path="/dashboard/interests/received" element={<P><ReceivedInterestsPage /></P>} />
            <Route path="/dashboard/interests/sent" element={<P><SentInterestsPage /></P>} />
            <Route path="/dashboard/shortlisted" element={<P><ShortlistedPage /></P>} />
            <Route path="/dashboard/liked" element={<P><LikedProfilesPage /></P>} />
            <Route path="/dashboard/visitors" element={<P><VisitorsPage /></P>} />
            <Route path="/dashboard/messages" element={<P><MessagesPage /></P>} />
            <Route path="/dashboard/notifications" element={<P><NotificationsPage /></P>} />
            <Route path="/dashboard/profile/:id" element={<P><ProfileViewPage /></P>} />
            <Route path="/dashboard/settings" element={<P><SettingsPage /></P>} />
            <Route path="/dashboard/blocked" element={<P><BlockedUsersPage /></P>} />
            <Route path="/dashboard/reports" element={<P><ReportsPage /></P>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
