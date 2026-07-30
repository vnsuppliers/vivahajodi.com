import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GuestRoute } from "@/components/guards/GuestRoute";
import { UnderReviewRoute } from "@/components/guards/UnderReviewRoute";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import UnderReviewPage from "./pages/UnderReviewPage";

// Enforcement Pages
import BlockedPage from "./pages/blocked";
import SuspendedPage from "./pages/suspended"
import DeactivatedPage from "./pages/deactivated"

// Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import MyProfilePage from "./pages/dashboard/MyProfilePage";
import SearchPage from "./pages/dashboard/SearchPage";
import MatchesPage from "./pages/dashboard/MatchesPage";
import { ReceivedInterestsPage } from "@/pages/dashboard/ReceivedInterestsPage";
import { SentInterestsPage } from "@/pages/dashboard/SentInterestsPage";
import { ShortlistedPage, VisitorsPage } from "./pages/dashboard/ListPages";
import MessagesPage from "./pages/dashboard/MessagesPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import ProfileViewPage from "./pages/dashboard/ProfileViewPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import { BlockedUsersPage, SubmittedReportsPage, ReceievedReportPage } from "./pages/dashboard/MiscPages";
import RejectedInterestsPage from "./pages/dashboard/RejectedInterestsPage";
import AcceptedInterestsPage from "./pages/dashboard/AcceptedInterestsPage";
import NetworkProvider from "./components/NetworkProvider";
import SubscriptionPurchase from "./pages/dashboard/SubscriptionPurchase";
import SuccessStoryRatingPage from './pages/dashboard/successStoryRating';
import SubscriptionPlansList from "./pages/dashboard/SubscriptionsPlans";

const queryClient = new QueryClient();

// Shortcuts
const P = ({ children }: { children: React.ReactNode }) => <ProtectedRoute>{children}</ProtectedRoute>;
const G = ({ children }: { children: React.ReactNode }) => <GuestRoute>{children}</GuestRoute>;
const U = ({ children }: { children: React.ReactNode }) => <UnderReviewRoute>{children}</UnderReviewRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NetworkProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Always Accessible */}
              <Route path="/" element={<Index />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />

              {/* Guest Only (redirect away if logged in) */}
              <Route path="/login" element={<G><LoginPage /></G>} />
              <Route path="/register" element={<G><RegisterPage /></G>} />
              <Route path="/forgot-password" element={<G><ForgotPasswordPage /></G>} />

              {/* Status Enforcement Pages */}
              <Route path="/blocked" element={<BlockedPage />} />
              <Route path="/suspended" element={<SuspendedPage />} />
              <Route path="/deactivated" element={<DeactivatedPage />} />

              {/* Under Review Only */}
              <Route path="/under-review" element={<U><UnderReviewPage /></U>} />

              {/* Protected Dashboard */}
              <Route path="/dashboard" element={<P><DashboardPage /></P>} />
              <Route path="/dashboard/my-profile" element={<P><MyProfilePage /></P>} />
              <Route path="/dashboard/search" element={<P><SearchPage /></P>} />
              <Route path="/dashboard/matches" element={<P><MatchesPage /></P>} />
              <Route path="/dashboard/interests/received" element={<P><ReceivedInterestsPage /></P>} />
              <Route path="/dashboard/interests/sent" element={<P><SentInterestsPage /></P>} />
              <Route path="/dashboard/interests/rejected" element={<P><RejectedInterestsPage /></P>} />
              <Route path="/dashboard/interests/accepted" element={<P><AcceptedInterestsPage /></P>} />
              <Route path="/dashboard/shortlisted" element={<P><ShortlistedPage /></P>} />
              <Route path="/dashboard/visitors" element={<P><VisitorsPage /></P>} />
              <Route path="/dashboard/messages" element={<P><MessagesPage /></P>} />
              <Route path="/dashboard/notifications" element={<P><NotificationsPage /></P>} />
              <Route path="/dashboard/profile/:id" element={<P><ProfileViewPage /></P>} />
              <Route path="/dashboard/settings" element={<P><SettingsPage /></P>} />
              <Route path="/dashboard/blocked" element={<P><BlockedUsersPage /></P>} />
              <Route path="/dashboard/submitted-reports" element={<P><SubmittedReportsPage /></P>} />
              <Route path="/dashboard/received-reports" element={<P><ReceievedReportPage /></P>} />
              <Route path="/dashboard/subscription/purchase/:planId" element={<SubscriptionPurchase />} />
              <Route path="/dashboard/subscription/subscription-plans" element={<SubscriptionPlansList />} />
              <Route path="/dashboard/success-story-rating" element={<P><SuccessStoryRatingPage /></P>} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </NetworkProvider>
  </QueryClientProvider>
);

export default App;