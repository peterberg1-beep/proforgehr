import { BarChart3, Users, Activity, CheckCircle, ChevronRight, Menu, X, UserPlus, BookOpen, LogOut, Building2, ChevronDown, Settings, Lock, CalendarDays, Target, Award, Clock, Briefcase, FileText, Package, LayoutGrid, AlertTriangle, Receipt, DollarSign, MessageSquare, ShieldAlert, Map, GanttChartSquare, Rocket, Check, Globe, LifeBuoy, Wand2, HardHat, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BrandingHeader } from "./BrandingHeader";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { setOrgSession, clearOrgSession } from "@/lib/orgSession";

type NavItem = { name: string; href: string; icon: React.ElementType };
type NavGroup = { label: string; items: NavItem[] };

const navigationGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    ],
  },
  {
    label: "Core HR",
    items: [
      { name: "Employees", href: "/employees", icon: Users },
      { name: "Organisation", href: "/organisation", icon: Building2 },
      { name: "Onboarding", href: "/onboarding", icon: UserPlus },
      { name: "Offboarding", href: "/offboarding", icon: LogOut },
      { name: "Leave Management", href: "/leave", icon: CalendarDays },
      { name: "Performance", href: "/performance", icon: Award },
      { name: "KPI Tracking", href: "/kpi", icon: Target },
      { name: "Time & Attendance", href: "/attendance", icon: Clock },
      { name: "Training & Compliance", href: "/training", icon: BookOpen },
    ],
  },
  {
    label: "Operations",
    items: [
      { name: "Gantt Chart", href: "/gantt", icon: GanttChartSquare },
      { name: "Shifts & Roster", href: "/shifts", icon: LayoutGrid },
      { name: "Recruitment", href: "/recruitment", icon: Briefcase },
      { name: "Documents", href: "/documents", icon: FileText },
      { name: "Assets", href: "/assets", icon: Package },
      { name: "Work Sites", href: "/work-sites", icon: HardHat },
      { name: "Site Attendance", href: "/site-attendance", icon: ClipboardList },
    ],
  },
  {
    label: "Finance & Compliance",
    items: [
      { name: "Expense Claims", href: "/expenses", icon: Receipt },
      { name: "Payroll Export", href: "/payroll", icon: DollarSign },
      { name: "Safety & Incidents", href: "/incidents", icon: AlertTriangle },
      { name: "Risk Register", href: "/risks", icon: ShieldAlert },
    ],
  },
  {
    label: "Governance",
    items: [
      { name: "Meetings & Actions", href: "/meetings", icon: MessageSquare },
      { name: "Approvals", href: "/approvals", icon: CheckCircle },
      { name: "Activity Log", href: "/activity", icon: Activity },
    ],
  },
  {
    label: "ProForgeHR",
    items: [
      { name: "Self-Service Portal", href: "/self-service", icon: Users },
      { name: "Implementation Journey", href: "/implementation-journey", icon: Rocket },
      { name: "Group Overview", href: "/group-overview", icon: Globe },
      { name: "Setup Wizard", href: "/setup-wizard", icon: Wand2 },
      { name: "Group Setup Wizard", href: "/group-setup-wizard", icon: Globe },
      { name: "Support", href: "/support", icon: LifeBuoy },
    ],
  },
];

const orgAdminNavigation: NavItem[] = [
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Organization Users", href: "/organization/users", icon: Users },
  { name: "Customer Onboarding", href: "/admin/onboard", icon: UserPlus },
  { name: "Access Control", href: "/admin/access-control-global", icon: Lock },
];

const adminNavigation: NavItem[] = [
  { name: "Admin Dashboard", href: "/admin-dashboard", icon: BarChart3 },
  { name: "Global Users", href: "/admin/users-global", icon: Users },
  { name: "Access Control", href: "/admin/access-control-global", icon: Lock },
  { name: "System Settings", href: "/admin/settings-global", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [switching, setSwitching] = useState(false);
  const { user } = useAuth();

  const currentOrgId = typeof window !== "undefined"
    ? localStorage.getItem("selectedOrganizationId")
    : null;

  const { data: organizations = [] } = trpc.auth.getMyOrganizations.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });

  const handleSwitchOrganization = (orgId: string) => {
    if (orgId === currentOrgId) {
      setShowOrgDropdown(false);
      return;
    }
    setSwitching(true);
    setShowOrgDropdown(false);
    setOrgSession(orgId);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 350);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      clearOrgSession();
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const currentOrg = organizations.find((o) => o.id === currentOrgId);

  const renderNavItem = (item: NavItem, activeColor: string, hoverColor: string) => {
    // Exact match for root-level routes; prefix match for nested routes (e.g. /employees/123)
    const isActive =
      item.href === "/dashboard"
        ? location === item.href
        : location === item.href || location.startsWith(item.href + "/");
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={closeMobileMenu}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? `${activeColor} text-white`
            : `text-[#374151] ${hoverColor}`
        )}
      >
        <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-[#6B7280] group-hover:text-[#006AA7]")} />
        <span className="flex-1">{item.name}</span>
        {isActive && <ChevronRight className="h-3.5 w-3.5" />}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white border border-gray-200 p-2 shadow-md md:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-[#0F172A]" />
        ) : (
          <Menu className="h-6 w-6 text-[#0F172A]" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo/Title */}
        <BrandingHeader />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          {navigationGroups.map((group) => (
            <div key={group.label} className="mb-2">
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(item => renderNavItem(item, "bg-[#006AA7]", "hover:bg-blue-50 hover:text-[#006AA7]"))}
              </div>
            </div>
          ))}

          {/* ProForgeHR Admin Section */}
          {user?.role === "admin" && (
            <div className="mb-2">
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-[#006AA7] uppercase tracking-widest border-t border-gray-100 mt-2">
                ProForgeHR Admin
              </p>
              <div className="space-y-0.5">
                {adminNavigation.map(item => renderNavItem(item, "bg-[#007A4D]", "hover:bg-emerald-50 hover:text-[#007A4D]"))}
              </div>
            </div>
          )}

          {/* Org Admin Section */}
          {user?.role === "admin" && (
            <div className="mb-2">
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-[#007A4D] uppercase tracking-widest border-t border-gray-100 mt-2">
                Admin
              </p>
              <div className="space-y-0.5">
                {orgAdminNavigation.map(item => renderNavItem(item, "bg-[#007A4D]", "hover:bg-emerald-50 hover:text-[#007A4D]"))}
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 space-y-2 bg-gray-50">
          {/* Organization Switcher — always visible */}
          <div className="relative">
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                switching
                  ? "bg-[#006AA7] text-white border-[#006AA7]"
                  : "bg-white border-gray-200 hover:border-[#006AA7] hover:text-[#006AA7] text-[#0F172A]"
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className={cn("h-4 w-4 shrink-0", switching ? "text-white" : "text-[#006AA7]")} />
                <span className="truncate text-left">
                  {switching ? "Switching..." : (currentOrg?.name || "Select Organisation")}
                </span>
              </div>
              {!switching && (
                <ChevronDown
                  className={cn("h-4 w-4 text-[#6B7280] transition-transform shrink-0", showOrgDropdown && "rotate-180")}
                />
              )}
            </button>

            {showOrgDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Your Organisations
                </p>
                {organizations.length === 0 && (
                  <p className="px-3 py-2 text-xs text-[#9CA3AF]">No organisations found.</p>
                )}
                {organizations.map((org) => {
                  const isActive = org.id === currentOrgId;
                  return (
                    <button
                      key={org.id}
                      onClick={() => handleSwitchOrganization(org.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors text-left",
                        isActive
                          ? "bg-blue-50 text-[#006AA7] font-semibold"
                          : "text-[#374151] hover:bg-gray-50 hover:text-[#006AA7]"
                      )}
                    >
                      <Building2 className={cn("h-4 w-4 shrink-0", isActive ? "text-[#006AA7]" : "text-[#9CA3AF]")} />
                      <span className="flex-1 truncate">{org.name}</span>
                      {isActive && <Check className="h-4 w-4 text-[#006AA7] shrink-0" />}
                    </button>
                  );
                })}
                {organizations.length === 1 && (
                  <p className="px-3 py-2 text-xs text-[#9CA3AF] border-t border-gray-100 mt-1">
                    Only one organisation linked.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Settings Button */}
          <Link
            href="/settings"
            onClick={closeMobileMenu}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              location === "/settings"
                ? "bg-[#006AA7] text-white"
                : "bg-white border border-gray-200 hover:border-[#006AA7] hover:text-[#006AA7] text-[#374151]"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors border border-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>

          <p className="text-[11px] text-[#9CA3AF] text-center pt-1 truncate">{user?.email}</p>
        </div>
      </div>
    </>
  );
}
