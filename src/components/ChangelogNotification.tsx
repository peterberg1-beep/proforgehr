import { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── CHANGELOG ────────────────────────────────────────────────────────────────
// Add a new entry here each time a module or major feature ships.
// The LATEST_VERSION key is stored in localStorage — bumping it causes the
// notification to reappear for all users who have previously dismissed it.
// ──────────────────────────────────────────────────────────────────────────────
const LATEST_VERSION = 'v1.1.0';

const CHANGELOG: {
  version: string;
  date: string;
  label: 'New' | 'Improved' | 'Fixed';
  items: string[];
}[] = [
  {
    version: 'v1.1.0',
    date: 'May 2026',
    label: 'New',
    items: [
      'Employees module — full CRUD, profile photo upload, bulk CSV import, PDF export',
      'Employee profile page — 25+ fields across Personal, Employment, Emergency & Notes tabs',
      'Three-tier intelligence pyramid — Foundation → Growth → Enterprise journey',
      'Updated landing page with new hero copy and ProForgeHR branding',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'April 2026',
    label: 'New',
    items: [
      'ProForgeHR platform launched — Intelligent Workforce Management',
      'Organisation dashboard with module tiles and live stats',
      'Foundation tier modules available: Gantt Chart Builder',
      'Multi-tenancy, role-based access, and subscription tiers (Foundation / Growth / Enterprise)',
      '14-day free trial with pre-loaded demo data',
    ],
  },
];

// ─── Coming Soon ──────────────────────────────────────────────────────────────
const COMING_SOON = [
  'Leave Management — requests, approvals, balances, calendar',
  'Time & Attendance — clock in/out, timesheets, manager approval',
  'Employee Scheduling — rosters, shift swaps, conflict detection',
  'Onboarding & Offboarding — checklists, task assignment, document acknowledgement',
];

export function ChangelogNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const dismissedVersion = localStorage.getItem('changelog-dismissed-version');
    if (dismissedVersion !== LATEST_VERSION) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('changelog-dismissed-version', LATEST_VERSION);
  };

  if (!isVisible || isDismissed) return null;

  const latest = CHANGELOG[0];
  const previous = CHANGELOG.slice(1);

  return (
    <div className="fixed top-4 right-4 max-w-sm z-50 shadow-xl">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#006AA7] to-[#007A4D]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">What's New in ProForgeHR</span>
          </div>
          <button onClick={handleDismiss} className="text-white/70 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Latest release */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#006AA7] text-white">{latest.version}</span>
              <span className="text-xs text-slate-400">{latest.date}</span>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{latest.label}</span>
            </div>
            <ul className="space-y-1.5">
              {latest.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Coming soon */}
          <div className="mb-4 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Coming Soon</span>
            </div>
            <ul className="space-y-1.5">
              {COMING_SOON.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Previous releases (expandable) */}
          {previous.length > 0 && (
            <div className="border-t border-slate-100 pt-3">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-[#006AA7] hover:underline mb-2 block"
              >
                {showAll ? 'Hide' : 'Show'} previous releases
              </button>
              {showAll && previous.map((release) => (
                <div key={release.version} className="mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{release.version}</span>
                    <span className="text-xs text-slate-400">{release.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {release.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="h-3 w-3 text-slate-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex justify-end">
          <Button size="sm" onClick={handleDismiss} className="text-xs bg-[#006AA7] hover:bg-[#005a8e]">
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
