import { trpc } from "@/lib/trpc";
import { getOrgSession } from "@/lib/orgSession";
import { APP_LOGO } from "@/const";
import { Loader2 } from "lucide-react";

export function BrandingHeader() {
  const { data: branding, isLoading } = trpc.branding.get.useQuery(
    undefined,
    { enabled: !!getOrgSession() }
  );

  if (isLoading) {
    return (
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <Loader2 className="h-5 w-5 animate-spin text-[#006AA7]" />
      </div>
    );
  }

  const logoUrl = branding?.logoUrl || APP_LOGO;

  return (
    <div className="flex h-16 items-center border-b border-gray-200 px-4 gap-3 bg-white">
      {logoUrl && (
        <img
          src={logoUrl}
          alt="Logo"
          className="h-9 w-9 object-contain flex-shrink-0"
        />
      )}
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-base font-bold text-[#006AA7]">ProForgeHR</span>
        <span className="text-[10px] text-[#6B7280]">People. Process. Performance.</span>
      </div>
    </div>
  );
}
