import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_LOGO, APP_LOGO_HORIZONTAL } from "@/const";
import { Loader2, Building2, ChevronRight, LayoutDashboard, LogOut, Home, Plus, Layers } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { setOrgSession, clearOrgSession } from "@/lib/orgSession";

// NOTE: org session is cleared inside a useEffect on mount (see below).
// Do NOT call clearOrgSession() at module level — it would run every time
// the module is evaluated, wiping the session that was just set by Enter.

export default function SelectOrganization() {
  const { user } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgIndustry, setNewOrgIndustry] = useState("");
  const [newOrgCountry, setNewOrgCountry] = useState("ZA");
  const [newOrgAdminEmail, setNewOrgAdminEmail] = useState("");
  const utils = trpc.useUtils();

  // Clear any stale org session when this page actually mounts.
  // Must be in useEffect (not module level) so it only runs on mount,
  // not when the module is evaluated during bundle load.
  useEffect(() => {
    clearOrgSession();
  }, []);

  // Fetch user's organizations using tRPC
  const { data: rawOrganizations = [], isLoading, error } = trpc.auth.getMyOrganizations.useQuery();
  // Cast to include group fields returned by the enriched server query
  const organizations = rawOrganizations as Array<typeof rawOrganizations[0] & { groupId: string | null; groupName: string | null }>;

  // MUST be declared before any early returns — Rules of Hooks
  const createOrgMutation = trpc.userManagement.adminCreateOrganization.useMutation({
    onSuccess: (data) => {
      toast.success(`Organisation "${newOrgName}" created successfully!`);
      setCreateOrgOpen(false);
      setNewOrgName("");
      setNewOrgIndustry("");
      setNewOrgCountry("ZA");
      setNewOrgAdminEmail("");
      utils.auth.getMyOrganizations.invalidate();
      // Auto-enter the new org
      setTimeout(() => {
        import("@/lib/orgSession").then(({ setOrgSession }) => {
          setOrgSession(data.orgId);
          window.location.href = "/dashboard";
        });
      }, 800);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create organisation");
    },
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      clearOrgSession();
      window.location.href = "/";
    },
  });

  // Handle redirect when no organizations found
  useEffect(() => {
    if (!isLoading && (!organizations || organizations.length === 0)) {
      if (error) {
        toast.error(`Error loading organizations: ${error.message}`);
      } else {
        // New user with no org — send to group setup wizard
      }
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = "/group-setup-wizard";
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, organizations, error]);

  const handleSelectOrganization = (orgId: string) => {
    setSelectedOrg(orgId);
    setOrgSession(orgId);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          {APP_LOGO && (
            <img src={APP_LOGO} alt="ProForgeHR" className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          )}
          <Loader2 className="h-6 w-6 animate-spin text-[#006AA7] mx-auto" />
        </div>
      </div>
    );
  }

  if (redirecting || !organizations || organizations.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#374151] mb-4">Setting up your workspace...</p>
          <Loader2 className="h-6 w-6 animate-spin text-[#006AA7] mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo — clicking goes to home page */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {APP_LOGO_HORIZONTAL ? (
              <img src={APP_LOGO_HORIZONTAL} alt="ProForgeHR" className="h-12 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                {APP_LOGO && <img src={APP_LOGO} alt="ProForgeHR" className="h-10 w-10 object-contain" />}
                <span className="text-xl font-bold text-[#006AA7]">ProForgeHR</span>
              </div>
            )}
          </a>

          {/* Right side — email + action buttons */}
          <div className="flex items-center gap-3">
            {user?.email && (
              <span className="text-sm text-[#6B7280] hidden sm:block">{user.email}</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = "/"}
              className="gap-1.5 text-[#374151] border-gray-300 hover:bg-gray-50"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              {logout.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Page heading */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#0F172A]">Select Organisation</h1>
          <p className="text-[#6B7280] mt-1">Choose the organisation you want to work with today</p>
        </div>

        {/* Admin Dashboard shortcut */}
        {user?.role === "admin" && (
          <div className="mb-8 p-4 bg-blue-50 border border-[#006AA7]/20 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#006AA7]">ProForgeHR Admin Access</p>
              <p className="text-sm text-[#6B7280]">You have system-wide admin privileges</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setCreateOrgOpen(true)}
                className="gap-2 border-[#006AA7] text-[#006AA7] hover:bg-blue-50"
              >
                <Plus className="w-4 h-4" />
                New Organisation
              </Button>
              <Button
                onClick={() => window.location.href = "/admin-dashboard"}
                className="bg-[#006AA7] hover:bg-[#005a8e] text-white gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Organizations Grid — grouped by group name */}
        {(() => {
          // Separate grouped orgs from standalone orgs
          const grouped = new Map<string, { groupName: string; orgs: typeof organizations }>();
          const standalone: typeof organizations = [];

          for (const org of organizations) {
            if (org.groupId && org.groupName) {
              if (!grouped.has(org.groupId)) {
                grouped.set(org.groupId, { groupName: org.groupName, orgs: [] });
              }
              grouped.get(org.groupId)!.orgs.push(org);
            } else {
              standalone.push(org);
            }
          }

          const OrgCard = ({ org }: { org: typeof organizations[0] }) => (
            <Card
              key={org.id}
              className="bg-white border-gray-200 hover:border-[#006AA7] hover:shadow-md cursor-pointer transition-all group"
              onClick={() => handleSelectOrganization(org.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 border border-[#006AA7]/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-[#006AA7]" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-[#0F172A] text-base truncate">{org.name}</CardTitle>
                    {org.role && (
                      <CardDescription className="text-[#6B7280] text-xs mt-0.5 capitalize">
                        {org.role}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-[#006AA7] hover:bg-[#005a8e] text-white font-medium gap-2 group-hover:gap-3 transition-all"
                  disabled={selectedOrg === org.id}
                >
                  {selectedOrg === org.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Enter
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );

          return (
            <div className="space-y-8 mb-10">
              {/* Grouped organisations */}
              {Array.from(grouped.entries()).map(([groupId, { groupName, orgs: groupOrgs }]) => (
                <div key={groupId}>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="h-4 w-4 text-[#006AA7]" />
                    <span className="text-sm font-semibold text-[#006AA7] uppercase tracking-wide">{groupName}</span>
                    <span className="text-xs text-[#9CA3AF] ml-1">{groupOrgs.length} organisation{groupOrgs.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pl-2 border-l-2 border-[#006AA7]/20">
                    {groupOrgs.map(org => <OrgCard key={org.id} org={org} />)}
                  </div>
                </div>
              ))}

              {/* Standalone organisations (not in any group) */}
              {standalone.length > 0 && (
                <div>
                  {grouped.size > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-[#6B7280]" />
                      <span className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Standalone Organisations</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {standalone.map(org => <OrgCard key={org.id} org={org} />)}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Three brand pillars */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-[#006AA7] text-sm font-bold">P</span>
            </div>
            <p className="text-xs font-semibold text-[#006AA7]">People</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-[#007A4D] text-sm font-bold">P</span>
            </div>
            <p className="text-xs font-semibold text-[#007A4D]">Process</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-[#FFB81C] text-sm font-bold">P</span>
            </div>
            <p className="text-xs font-semibold text-[#B8860B]">Performance</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#9CA3AF] text-xs">
          © 2026 ProForgeHR · People. Process. Performance.
        </p>
      </div>

      {/* Create New Organisation Dialog */}
      <Dialog open={createOrgOpen} onOpenChange={(v) => { if (!v) setCreateOrgOpen(false); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Organisation</DialogTitle>
            <DialogDescription className="text-[#6B7280]">
              Create a new client organisation with a 90-day demo subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-[#374151] mb-1.5 block">Organisation Name *</Label>
              <Input
                placeholder="e.g. Bedrock Group"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#374151] mb-1.5 block">Industry</Label>
              <Input
                placeholder="e.g. Construction, Manufacturing"
                value={newOrgIndustry}
                onChange={(e) => setNewOrgIndustry(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#374151] mb-1.5 block">Country</Label>
              <Select value={newOrgCountry} onValueChange={setNewOrgCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ZA">South Africa (ZAR)</SelectItem>
                  <SelectItem value="IE">Ireland (EUR)</SelectItem>
                  <SelectItem value="GB">United Kingdom (GBP)</SelectItem>
                  <SelectItem value="US">United States (USD)</SelectItem>
                  <SelectItem value="AU">Australia (AUD)</SelectItem>
                  <SelectItem value="NZ">New Zealand (NZD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#374151] mb-1.5 block">
                Link to Existing User (optional)
              </Label>
              <Input
                placeholder="user@email.com — adds them as owner"
                value={newOrgAdminEmail}
                onChange={(e) => setNewOrgAdminEmail(e.target.value)}
              />
              <p className="text-xs text-[#9CA3AF] mt-1">
                Leave blank to create the org without a linked user. You can add users later.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOrgOpen(false)}>Cancel</Button>
            <Button
              onClick={() => createOrgMutation.mutate({
                name: newOrgName,
                industry: newOrgIndustry || undefined,
                country: newOrgCountry,
                adminEmail: newOrgAdminEmail || undefined,
              })}
              disabled={!newOrgName.trim() || createOrgMutation.isPending}
              className="bg-[#006AA7] hover:bg-[#005a8e] text-white"
            >
              {createOrgMutation.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Creating...</>
              ) : (
                "Create Organisation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
