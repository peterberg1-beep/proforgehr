import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Shield } from "lucide-react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import { clearOrgSession } from "@/lib/orgSession";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title = "Admin" }: AdminLayoutProps) {
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: logo + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/admin-dashboard")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {APP_LOGO ? (
                <img src={APP_LOGO} alt="ProForgeHR" className="h-8 w-8 object-contain" />
              ) : (
                <Shield className="h-7 w-7 text-[#006AA7]" />
              )}
              <span className="text-lg font-bold text-[#006AA7]">ProForgeHR</span>
            </button>
            <span className="text-gray-300">/</span>
            <h1 className="text-sm font-semibold text-[#374151]">{title}</h1>
          </div>

          {/* Right: user info + actions */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6B7280] hidden sm:block">{user?.email}</span>
            <Button
              size="sm"
              onClick={() => (window.location.href = "/admin-dashboard")}
              className="bg-[#006AA7] hover:bg-[#005a8e] text-white gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
