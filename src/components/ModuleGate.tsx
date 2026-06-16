import { type ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { getOrgSession } from "@/lib/orgSession";
import { canAccessModule, normalizeTier, MODULES, TIER_INFO, type ModuleKey } from "@shared/modules";
import { Lock, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

interface ModuleGateProps {
  moduleKey: ModuleKey;
  children: ReactNode;
}

/**
 * ModuleGate — wraps a module page and shows an upgrade prompt
 * if the org's current plan does not include the module.
 *
 * Usage:
 *   <ModuleGate moduleKey="recruitment">
 *     <RecruitmentPage />
 *   </ModuleGate>
 */
export function ModuleGate({ moduleKey, children }: ModuleGateProps) {
  const [, setLocation] = useLocation();
  const { data: subscription, isLoading } = trpc.subscription.getMySubscription.useQuery(
    undefined,
    {
      staleTime: 5 * 60 * 1000,
      // Only fire when an org is actually selected — this query uses orgProcedure
      enabled: !!getOrgSession(),
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If no subscription data, allow access (fail open — don't block on network issues)
  if (!subscription) return <>{children}</>;

  const orgTier = normalizeTier(subscription.tier);
  const moduleDef = MODULES.find((m) => m.key === moduleKey);
  const requiredTier = moduleDef?.tier ?? "tier1";
  const hasAccess = canAccessModule(orgTier, requiredTier);

  if (hasAccess) return <>{children}</>;

  // Show upgrade prompt
  const requiredTierInfo = TIER_INFO[requiredTier];
  const currentTierInfo = TIER_INFO[orgTier];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="max-w-md">
        {/* Lock icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-9 w-9 text-muted-foreground" />
        </div>

        {/* Module name */}
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {moduleDef?.name ?? "This Module"}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-1">
          {moduleDef?.description}
        </p>

        {/* Tier badge */}
        <div className="inline-flex items-center gap-2 mt-3 mb-6 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          Available on{" "}
          <span className="font-semibold text-foreground">
            {requiredTierInfo.name}
          </span>{" "}
          — {requiredTierInfo.subtitle}
        </div>

        {/* Current plan note */}
        <p className="text-sm text-muted-foreground mb-6">
          You are currently on the{" "}
          <span className="font-semibold text-foreground">{currentTierInfo.name}</span> plan.
          Upgrade to unlock this module and{" "}
          {requiredTier === "tier2" ? "all other Growth modules" : "all Enterprise capabilities"}.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-[#006AA7] hover:bg-[#005a8e] text-white"
            onClick={() => setLocation("/upgrade")}>
          Upgrade to {requiredTierInfo.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/dashboard")}>
          Back to Dashboard
          </Button>

        </div>

        {/* Trial note */}
        {subscription.isTrialing && (
          <p className="mt-4 text-xs text-muted-foreground">
            You are currently on a free trial. Upgrading will activate your paid subscription.
          </p>
        )}
      </div>
    </div>
  );
}
