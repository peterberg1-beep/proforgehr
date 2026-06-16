import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, ChevronRight, Building2, ChevronDown, Check,
  ArrowLeft, Globe, Bell, User, LogOut, Settings, KeyRound
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { setOrgSession } from "@/lib/orgSession";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// Map of route paths to human-readable page names
const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/organisation": "Organisation",
  "/employees": "Employees",
  "/onboarding": "Onboarding",
  "/offboarding": "Offboarding",
  "/leave": "Leave Management",
  "/kpi": "KPI Tracking",
  "/performance": "Performance",
  "/attendance": "Time & Attendance",
  "/training": "Training & Compliance",
  "/recruitment": "Recruitment",
  "/documents": "Documents",
  "/assets": "Assets",
  "/shifts": "Shifts & Roster",
  "/incidents": "Safety & Incidents",
  "/expenses": "Expense Claims",
  "/payroll": "Payroll Export",
  "/meetings": "Meetings & Actions",
  "/risks": "Risk Register",
  "/self-service": "Self-Service Portal",
  "/implementation-journey": "Implementation Journey",
  "/group-overview": "Group Overview",
  "/approvals": "Approvals",
  "/activity": "Activity Log",
  "/settings": "Settings",
  "/gantt": "Gantt Chart",
  "/admin/users": "User Management",
  "/organization/users": "Organization Users",
  "/change-password": "Change Password",
  "/upgrade": "Upgrade Plan",
};

export function OrgTopBar() {
  const [location] = useLocation();
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [switching, setSwitching] = useState(false);
  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();

  const currentOrgId =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedOrganizationId")
      : null;

  const { data: organizations = [] } = trpc.auth.getMyOrganizations.useQuery(undefined, {
    retry: false,
  });

  // Fetch pending approvals count for notification bell
  // Only fire when an org is selected — this uses orgProcedure and will throw without an org session
  const { data: approvalsData } = trpc.leave.listRequests.useQuery(
    { status: "pending" },
    { retry: false, enabled: !!currentOrgId }
  );

  const pendingApprovals = approvalsData?.length ?? 0;
  const totalNotifications = pendingApprovals;

  const currentOrg = organizations.find((o) => o.id === currentOrgId);
  const isOnDashboard = location === "/dashboard";
  const pageLabel = PAGE_LABELS[location] || "";

  // Build employee sub-path label
  const isEmployeeProfile = location.startsWith("/employees/") && location !== "/employees";

  // Get user initials for avatar
  const userInitials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(e.target as Node)) {
        setShowOrgDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSwitchOrg = (orgId: string) => {
    if (orgId === currentOrgId) {
      setShowOrgDropdown(false);
      return;
    }
    setSwitching(true);
    setShowOrgDropdown(false);
    setOrgSession(orgId);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 300);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = getLoginUrl();
  };

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-gray-100 bg-white z-20 shadow-sm">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        {isOnDashboard ? (
          <span className="flex items-center gap-1.5 font-semibold text-[#006AA7]">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </span>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-[#6B7280] hover:text-[#006AA7] transition-colors font-medium shrink-0"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0" />
            {isEmployeeProfile ? (
              <>
                <Link
                  href="/employees"
                  className="text-[#6B7280] hover:text-[#006AA7] transition-colors font-medium shrink-0"
                >
                  Employees
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                <span className="text-[#0F172A] font-semibold truncate">Profile</span>
              </>
            ) : (
              <span className="text-[#0F172A] font-semibold truncate">{pageLabel}</span>
            )}
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Back to Dashboard button — only shown when not on dashboard */}
        {!isOnDashboard && (
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#006AA7] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowOrgDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg text-[#6B7280] hover:text-[#006AA7] hover:bg-blue-50 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {totalNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold leading-none">
                {totalNotifications > 9 ? "9+" : totalNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Notifications</span>
                {totalNotifications > 0 && (
                  <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">
                    {totalNotifications} pending
                  </span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {pendingApprovals > 0 && (
                  <Link
                    href="/approvals"
                    onClick={() => setShowNotifications(false)}
                    className="flex items-start gap-3 px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50"
                  >
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {pendingApprovals} Pending Leave Approval{pendingApprovals !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Review and approve outstanding requests
                      </p>
                    </div>
                  </Link>
                )}
                {totalNotifications === 0 && (
                  <div className="px-3 py-6 text-center">
                    <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">All caught up!</p>
                    <p className="text-xs text-gray-300 mt-0.5">No pending notifications</p>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 px-3 py-2">
                <Link
                  href="/approvals"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#006AA7] font-medium hover:underline"
                >
                  View all approvals →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Org Switcher */}
        <div className="relative" ref={orgDropdownRef}>
          <button
            onClick={() => {
              setShowOrgDropdown(!showOrgDropdown);
              setShowProfileDropdown(false);
              setShowNotifications(false);
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
              switching
                ? "bg-[#006AA7] text-white border-[#006AA7]"
                : "bg-white text-[#374151] border-gray-200 hover:border-[#006AA7] hover:text-[#006AA7]"
            )}
          >
            <Building2 className={cn("h-4 w-4 shrink-0", switching ? "text-white" : "text-[#006AA7]")} />
            <span className="max-w-[120px] truncate hidden sm:inline">
              {switching ? "Switching..." : (currentOrg?.name || "Select Organisation")}
            </span>
            {!switching && (
              <ChevronDown
                className={cn("h-3.5 w-3.5 text-[#6B7280] transition-transform shrink-0", showOrgDropdown && "rotate-180")}
              />
            )}
          </button>

          {showOrgDropdown && organizations.length > 0 && (
            <div className="absolute top-full right-0 mt-1 min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
              <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                Your Organisations
              </p>
              {organizations.map((org) => {
                const isActive = org.id === currentOrgId;
                return (
                  <button
                    key={org.id}
                    onClick={() => handleSwitchOrg(org.id)}
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
                  Only one organisation linked to your account.
                </p>
              )}
              {/* Group Overview link */}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link
                  href="/group-overview"
                  onClick={() => setShowOrgDropdown(false)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#006AA7] hover:bg-blue-50 font-medium"
                >
                  <Globe className="h-4 w-4 shrink-0 text-[#006AA7]" />
                  <span>Group Overview</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Button */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowOrgDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#006AA7] text-white text-xs font-bold hover:bg-[#005a8e] transition-colors shrink-0"
            title={user?.name || user?.email || "Profile"}
          >
            {userInitials}
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {/* User info header */}
              <div className="px-3 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email || ""}</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#374151] hover:bg-gray-50 hover:text-[#006AA7] transition-colors"
                >
                  <Settings className="h-4 w-4 text-[#9CA3AF]" />
                  Settings
                </Link>
                <Link
                  href="/change-password"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#374151] hover:bg-gray-50 hover:text-[#006AA7] transition-colors"
                >
                  <KeyRound className="h-4 w-4 text-[#9CA3AF]" />
                  Change Password
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
