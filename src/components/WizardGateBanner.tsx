import { trpc } from "@/lib/trpc";
import { getOrgSession } from "@/lib/orgSession";
import { Wand2, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * WizardGateBanner — shown at the top of all module pages when the Setup Wizard
 * has not been completed. Soft-lock: users can still access modules but are
 * reminded to complete setup first.
 *
 * Hidden on: /dashboard, /setup-wizard, /group-setup-wizard, /support,
 *             /implementation-journey, /self-service, /group-overview
 */

const EXCLUDED_PATHS = [
  "/dashboard",
  "/setup-wizard",
  "/group-setup-wizard",
  "/support",
  "/implementation-journey",
  "/self-service",
  "/group-overview",
  "/settings",
  "/upgrade",
];

export function WizardGateBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [location, navigate] = useLocation();

  const { data: wizardState, isLoading } = trpc.setupWizard.getState.useQuery(
    undefined,
    {
      staleTime: 2 * 60 * 1000,
      enabled: !!getOrgSession(),
    }
  );

  // Don't show on excluded paths
  const isExcluded = EXCLUDED_PATHS.some(p => location === p || location.startsWith(p + "/"));
  if (isExcluded) return null;

  // Don't show if loading, dismissed, or wizard already complete
  if (isLoading || dismissed) return null;
  if (wizardState?.isComplete) return null;

  const currentStep = wizardState?.currentStep ?? 1;
  const completedCount = wizardState?.completedSteps
    ? (JSON.parse(wizardState.completedSteps as unknown as string) as number[]).length
    : 0;
  const hasStarted = wizardState !== null && completedCount > 0;

  return (
    <div className="w-full bg-[#006AA7] text-white px-4 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Wand2 className="h-4 w-4 shrink-0" />
        <span className="text-sm">
          {hasStarted ? (
            <>
              <span className="font-semibold">Setup Wizard in progress</span> — you're on step {currentStep} of 8.{" "}
              Complete setup to unlock full platform access and start your Implementation Journey.
            </>
          ) : (
            <>
              <span className="font-semibold">Complete your Setup Wizard</span> to configure your organisation,
              meet your consultant, and unlock full platform access.
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          className="bg-white text-[#006AA7] hover:bg-blue-50 text-xs h-7 font-semibold"
          onClick={() => navigate("/setup-wizard")}
        >
          {hasStarted ? "Continue Setup" : "Start Setup"}
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
