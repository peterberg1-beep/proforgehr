import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { getOrgSession } from "@/lib/orgSession";
import { AlertTriangle, Clock, X, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

/**
 * TrialBanner — shown at the top of the app during the trial period.
 * Displays days remaining and an upgrade CTA.
 * Dismissible per session (reappears on next login).
 */
export function TrialBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [, setLocation] = useLocation();
  const { data: subscription, isLoading } = trpc.subscription.getMySubscription.useQuery(
    undefined,
    {
      staleTime: 5 * 60 * 1000,
      // Only fire when an org is actually selected — this query uses orgProcedure
      // and will throw "No organization selected" if called without an org session.
      enabled: !!getOrgSession(),
    }
  );

  if (isLoading || !subscription || dismissed) return null;
  if (!subscription.isTrialing) return null;

  const days = subscription.trialDaysRemaining ?? 0;
  const isExpired = subscription.isTrialExpired;
  const isUrgent = days <= 3;
  const isWarning = days <= 7 && days > 3;

  if (isExpired) {
    return (
      <div className="w-full bg-red-600 text-white px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold">Your trial has expired.</span>
            <span className="ml-2 text-red-100">
              Upgrade now to continue accessing ProForgeHR and keep your data.
            </span>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-white text-red-600 hover:bg-red-50 shrink-0 font-semibold"
          onClick={() => setLocation("/upgrade")}>
            Upgrade Now <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  const bgColor = isUrgent
    ? "bg-orange-500"
    : isWarning
    ? "bg-amber-500"
    : "bg-[#006AA7]";

  return (
    <div className={`w-full ${bgColor} text-white px-4 py-2.5 flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-3">
        <Clock className="h-4 w-4 shrink-0" />
        <span className="text-sm">
          {isUrgent ? (
            <>
              <span className="font-bold">Only {days} day{days !== 1 ? "s" : ""} left</span> in your free trial.
            </>
          ) : (
            <>
              <span className="font-semibold">{days} days remaining</span> in your free trial of{" "}
              <span className="font-semibold">{subscription.planName}</span>.
            </>
          )}{" "}
          No credit card required to upgrade.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          variant="outline"
          className="border-white/50 text-white hover:bg-white/20 bg-transparent text-xs h-7"
          onClick={() => setLocation("/upgrade")}>
          <Zap className="mr-1 h-3 w-3" />
          Upgrade
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss trial banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
