import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, User, Search, Heart, Mail, MailOpen, Bookmark, ThumbsUp,
  Eye, MessageCircle, Bell, ShieldBan, Flag, Settings, LogOut,
  CreditCard
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/dashboard/my-profile", icon: User },
  { title: "Search Profiles", url: "/dashboard/search", icon: Search },
  { title: "Matches", url: "/dashboard/matches", icon: Heart },
  { title: "Received Interests", url: "/dashboard/interests/received", icon: MailOpen },
  { title: "Sent Interests", url: "/dashboard/interests/sent", icon: Mail },
  { title: "Rejected Interests", url: "/dashboard/interests/rejected", icon: Mail },
  { title: "Accepted Interests", url: "/dashboard/interests/accepted", icon: Mail },
  { title: "Shortlisted", url: "/dashboard/shortlisted", icon: Bookmark },
  { title: "Profile Visitors", url: "/dashboard/visitors", icon: Eye },
  { title: "Messages", url: "/dashboard/messages", icon: MessageCircle },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Blocked Users", url: "/dashboard/blocked", icon: ShieldBan },
  { title: "Submitted Reports", url: "/dashboard/submitted-reports", icon: Flag },
  { title: "Receieved Reports", url: "/dashboard/received-reports", icon: Flag },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
 { title: "Subscription Plans", url: "/dashboard/subscription/subscription-plans", icon: CreditCard },
 { title: "Success Story rating", url: "/dashboard/subscription/success-story-rating", icon: CreditCard },
];

function AppSidebarContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {!collapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full gradient-hero flex items-center justify-center text-sm font-bold text-primary-foreground">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-sidebar-foreground">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-sidebar-foreground/60">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="hover:bg-sidebar-accent/50 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="mr-4" />
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="font-display font-bold text-foreground">Vivāha</span>
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
