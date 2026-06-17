import { Button } from "@/components/ui/button";
import { useState } from "react";
import { APP_LOGO, APP_LOGO_HERO } from "@/const";
import { useLocation } from "wouter";
import {
  Users,
  Calendar,
  UserCheck,
  TrendingUp,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  ClipboardList,
  Clock,
  BarChart3,
  BookOpen,
  Brain,
  Handshake,
  Search,
  Settings,
  GraduationCap,
  FileSignature,
  Layers,
  Sparkles,
  Link2,
  Video,
  Building2,
  Wifi,
  Network,
} from "lucide-react";

// ─── Module Catalogue ────────────────────────────────────────────────────────
const MODULES = [
  {
    id: "employees",
    name: "Employees",
    description: "Central employee database — profiles, documents, history, and status.",
    icon: Users,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: [] as string[],
    combo: null as string | null,
  },
  {
    id: "leave",
    name: "Leave Management",
    description: "Leave types, balances, requests, approvals, and calendar.",
    icon: Calendar,
    color: "text-[#007A4D]",
    bg: "bg-emerald-50",
    requires: ["Employees"],
    combo: null,
  },
  {
    id: "onboarding",
    name: "Onboarding & Offboarding",
    description: "Checklists, task assignments, document acknowledgement, and exit workflows.",
    icon: UserCheck,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: ["Employees"],
    combo: "Combo: Onboarding + Offboarding",
  },
  {
    id: "time",
    name: "Time & Attendance",
    description: "Clock in/out, break tracking, timesheets, and manager approvals.",
    icon: Clock,
    color: "text-[#007A4D]",
    bg: "bg-emerald-50",
    requires: ["Employees"],
    combo: "Combo: Time & Attendance + Scheduling",
  },
  {
    id: "scheduling",
    name: "Employee Scheduling",
    description: "Shift rosters, availability, conflict detection, and schedule publishing.",
    icon: Calendar,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: ["Employees", "Time & Attendance"],
    combo: "Combo: Time & Attendance + Scheduling",
  },
  {
    id: "training",
    name: "Training & Compliance",
    description: "Training records, certifications, compliance tracking, and expiry alerts.",
    icon: BookOpen,
    color: "text-[#007A4D]",
    bg: "bg-emerald-50",
    requires: ["Employees"],
    combo: null,
  },
  {
    id: "performance",
    name: "Performance Management",
    description: "Review cycles, self-assessments, manager reviews, and performance history.",
    icon: TrendingUp,
    color: "text-[#FFB81C]",
    bg: "bg-amber-50",
    requires: ["Employees"],
    combo: "Combo: Performance + KPI Tracking",
  },
  {
    id: "kpi",
    name: "KPI Tracking",
    description: "Role-linked KPIs, real-time dashboards, and goal tracking.",
    icon: BarChart3,
    color: "text-[#FFB81C]",
    bg: "bg-amber-50",
    requires: ["Employees", "Performance Management"],
    combo: "Combo: Performance + KPI Tracking",
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Payroll processing, deductions, tax compliance, and payslip generation.",
    icon: ClipboardList,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: ["Employees", "Leave Management", "Time & Attendance"],
    combo: null,
  },
  {
    id: "compliance",
    name: "Compliance & Documents",
    description: "Policy documents, compliance obligations, and employee acknowledgements.",
    icon: Shield,
    color: "text-[#007A4D]",
    bg: "bg-emerald-50",
    requires: ["Employees"],
    combo: null,
  },
  {
    id: "analytics",
    name: "Workforce Analytics",
    description: "Headcount trends, turnover analysis, and workforce intelligence reports.",
    icon: BarChart3,
    color: "text-[#FFB81C]",
    bg: "bg-amber-50",
    requires: ["Employees"],
    combo: null,
  },
  {
    id: "ai",
    name: "AI Intelligence",
    description: "Predictive insights, anomaly detection, and AI-driven workforce recommendations.",
    icon: Brain,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: ["Employees", "4+ operational modules"],
    combo: null,
  },
  {
    id: "group-overview",
    name: "Group Overview",
    description: "Consolidated view across all organisations in your group — headcount, incidents, risks, leave, and payroll status in one screen. Includes group organogram and multi-org implementation journey tracker.",
    icon: Network,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
    requires: ["2+ Organisations"],
    combo: "Enterprise: Multi-Organisation Groups",
  },
];

// ─── Engagement Steps ─────────────────────────────────────────────────────────
const ENGAGEMENT_STEPS = [
  {
    step: "01",
    title: "Discovery Sessions",
    description:
      "Structured sessions to understand your organisation — size, locations, countries, industry, processes, and compliance obligations. Our AI analyses your profile to recommend the right modules.",
    icon: Search,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
  },
  {
    step: "02",
    title: "Module Selection",
    description:
      "Based on discovery, we present a Module Implementation Plan — the specific modules your organisation needs, in the right sequence, with dependency chains resolved and pricing confirmed upfront.",
    icon: Layers,
    color: "text-[#007A4D]",
    bg: "bg-emerald-50",
  },
  {
    step: "03",
    title: "Implementation",
    description:
      "Each module is configured to your specific requirements, your data is migrated and validated, and your key users are trained. One module at a time, done properly.",
    icon: Settings,
    color: "text-[#FFB81C]",
    bg: "bg-amber-50",
  },
  {
    step: "04",
    title: "Signoff & Training Record",
    description:
      "Every completed module generates a formal signoff — a training record stored inside the platform listing every user trained, the date, and your acceptance. An auditable implementation history that lives in your system.",
    icon: FileSignature,
    color: "text-[#006AA7]",
    bg: "bg-blue-50",
  },
];

const MARKETS = [
  "South Africa (POPI Act compliance)",
  "European Union — Ireland, Nordic Countries, UK (GDPR compliance)",
  "United States",
  "Australia & New Zealand",
];

export default function Landing() {
  const [, navigate] = useLocation();

  // ROI Calculator state
  const [roiEmployees, setRoiEmployees] = useState(50);
  const [roiHrStaff, setRoiHrStaff] = useState(2);
  const [roiAvgSalary, setRoiAvgSalary] = useState(25000);

  // ROI Calculations
  const hrAdminHoursPerEmployee = 4; // hours/month manual HR admin per employee
  const hrHourlyRate = roiAvgSalary / 160; // 160 working hours/month
  const adminTimeSaved = roiEmployees * hrAdminHoursPerEmployee * 0.7; // 70% reduction
  const adminCostSaved = adminTimeSaved * hrHourlyRate;
  const complianceFineRisk = roiEmployees * 500; // estimated annual fine risk per employee
  const complianceSaved = complianceFineRisk * 0.8; // 80% risk reduction
  const leaveAdminSaved = roiEmployees * 200; // R200/employee/year in manual leave admin
  const payrollErrorSaved = roiEmployees * 150; // R150/employee/year in payroll error corrections
  const totalAnnualSaving = (adminCostSaved * 12) + complianceSaved + leaveAdminSaved + payrollErrorSaved;
  const estimatedPlatformCost = roiEmployees * 120 * 12; // R120/employee/month
  const roi = ((totalAnnualSaving - estimatedPlatformCost) / estimatedPlatformCost) * 100;
  const paybackMonths = Math.ceil(estimatedPlatformCost / (totalAnnualSaving / 12));

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="https://proforgehr.com" className="flex items-center gap-2 no-underline">
              {APP_LOGO && (
                <img src={APP_LOGO} alt="ProForgeHR" className="h-9 w-9 object-contain rounded-sm" />
              )}
              <div className="flex flex-col leading-tight">
                <span className="text-[#006AA7] font-bold text-lg tracking-tight">ProForgeHR</span>
                <span className="text-[#6B7280] text-[10px] tracking-wide">People. Process. Performance.</span>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/login")} className="text-[#0F172A] hover:text-[#006AA7]">
                Sign In
              </Button>
              <Button onClick={() => navigate("/register")} className="bg-[#006AA7] hover:bg-[#005a8e] text-white">
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50 py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#006AA7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#007A4D]"></span>
                People. Process. Performance.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4 leading-tight">
                Intelligent
                <span className="text-[#006AA7]"> Workforce</span>
                <br />
                <span className="text-[#007A4D]">Management</span>
                <span className="text-[#0F172A]"> Built Around Your Business</span>
              </h1>
              <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
                ProForgeHR is a modular workforce management platform. You choose the modules your organisation actually needs. We implement them with you.
              </p>
              <div className="mb-6 p-4 rounded-xl bg-[#0F172A] border border-[#1e3a5f]">
                <p className="text-[#FFB81C] font-semibold text-base mb-1">The platform tracks your business. We build it with you.</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  No bundles. No rigid tiers. A catalogue of modules, a structured consulting engagement, and an AI-assisted discovery process that matches your organisation's needs to the right solution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => navigate("/discovery")} size="lg" className="bg-[#006AA7] hover:bg-[#005a8e] text-white gap-2 px-8">
                  <Sparkles className="h-5 w-5" /> Start Your Discovery
                </Button>
                <Button size="lg" variant="outline" className="border-[#006AA7] text-[#006AA7] hover:bg-blue-50 px-8" onClick={() => navigate("/register")}>
                  Book a Consultation
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                <span className="flex items-center gap-1.5 text-sm text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#007A4D] inline-block"></span>You choose the modules</span>
                <span className="flex items-center gap-1.5 text-sm text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#007A4D] inline-block"></span>We implement with you</span>
                <span className="flex items-center gap-1.5 text-sm text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#007A4D] inline-block"></span>Pay only for what you run</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <img src={APP_LOGO_HERO} alt="ProForgeHR — People. Process. Performance." className="w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">The Engagement Model</p>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">How a ProForgeHR Engagement Works</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Every engagement follows a structured process. We start by understanding your business — not by showing you a pricing page.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGAGEMENT_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:border-[#006AA7] hover:shadow-md transition-all">
                  <div className="text-xs font-black text-[#6B7280] tracking-widest mb-3">{step.step}</div>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${step.bg} mb-4`}>
                    <Icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Delivery Modes ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">How We Work With You</p>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">In Person. Or Live Online. Same Commitment.</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Every ProForgeHR engagement is conducted by a specialist who is fully present — whether that means sitting across the table from you or sharing a screen with you from anywhere in the world. The format changes. The focus does not.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* In-Person */}
            <div className="bg-[#0F172A] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#006AA7] flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">On-Site Engagement</div>
                  <div className="text-sm text-blue-300">Your premises — full presence</div>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed mb-5">
                Your specialist travels to your location. Discovery sessions, process mapping, configuration workshops, and training all happen at your site — with your team, in your environment, using your actual data and workflows.
              </p>
              <ul className="space-y-2">
                {[
                  "Specialist at your premises for the full engagement",
                  "Hands-on with your team and your processes",
                  "Ideal for complex, multi-department implementations",
                  "Higher consulting fee — reflects travel and on-site time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-blue-200 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-[#FFB81C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Live Web Seminar */}
            <div className="bg-[#006AA7] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Live Web Seminar</div>
                  <div className="text-sm text-blue-200">Same room. Different location.</div>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">
                We use high-quality camera and screen-sharing technology to put your specialist in the room with you — virtually. Discovery, process mapping, configuration, and training all run as live interactive sessions. Not a recording. Not a webinar. A real working session.
              </p>
              <ul className="space-y-2">
                {[
                  "Live, interactive sessions — not pre-recorded content",
                  "Camera technology creates genuine shared presence",
                  "Same structured engagement as on-site",
                  "Lower consulting fee — no travel cost passed on",
                  "Available globally — no geographic restriction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-blue-100 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-[#FFB81C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Clarification banner */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex items-start gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#FFB81C] flex items-center justify-center mt-0.5">
              <Wifi className="h-4 w-4 text-[#0F172A]" />
            </div>
            <div>
              <p className="font-semibold text-[#0F172A] text-sm mb-1">The web seminar format is not a cost-cutting measure — it is a delivery choice.</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                The same specialist, the same structured process, the same signoff rigour. The only difference is that your specialist is not physically in the room. For organisations with distributed teams, international locations, or time-sensitive implementations, the web seminar format often delivers a faster, more flexible engagement at a lower total cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Needs Matching ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Intelligent Discovery</p>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">AI-Assisted Module Matching</h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Our discovery sessions are structured to capture the information our AI needs to match your organisation's profile to the right modules. We ask the right questions — about your size, your locations, your countries of operation, your industry, and your processes — and the AI does the analysis.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                The output is a <strong className="text-[#0F172A]">Module Implementation Plan</strong> — a formal document that specifies which modules you need, in what order, with all dependency chains resolved and pricing confirmed before any work begins.
              </p>
              <ul className="space-y-3">
                {[
                  "Matches your operational profile to the optimal module set",
                  "Identifies module dependencies automatically",
                  "Flags compliance requirements per country",
                  "Estimates implementation complexity and timeline",
                  "Generates a phased implementation sequence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#4B5563] text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-[#007A4D] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F172A] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFB81C] flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-[#0F172A]" />
                </div>
                <div>
                  <div className="font-bold text-white">AI Discovery Engine</div>
                  <div className="text-sm text-blue-300">Needs-matching in action</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Organisation size", value: "51–200 employees" },
                  { label: "Locations", value: "3 sites, 1 country" },
                  { label: "Industry", value: "Construction" },
                  { label: "Shift-based operations", value: "Yes" },
                  { label: "Compliance", value: "POPI Act (ZA)" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-blue-300 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[#FFB81C] text-xs font-semibold uppercase tracking-wider mb-3">Recommended modules</p>
                <div className="flex flex-wrap gap-2">
                  {["Employees", "Leave", "Time & Attendance", "Scheduling", "Training", "Compliance", "Payroll"].map((m) => (
                    <span key={m} className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module Catalogue ─────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Platform Modules</p>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Choose What Your Business Needs</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Every module is built to work independently or as part of a connected suite. You do not buy a bundle — you select the modules that solve your specific problems. Our discovery process determines the right combination for your organisation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div key={mod.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-[#006AA7] hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${mod.bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${mod.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F172A] text-sm">{mod.name}</h3>
                      <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {mod.requires.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Link2 className="h-3 w-3 text-[#6B7280] flex-shrink-0" />
                        <span className="text-[10px] text-[#6B7280]">Requires: {mod.requires.join(", ")}</span>
                      </div>
                    )}
                    {mod.combo && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-[#FFB81C] font-medium border border-amber-100">{mod.combo}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-[#6B7280] mt-8">
            Module catalogue grows continuously. New modules are added based on client needs and industry requirements.
          </p>
        </div>
      </section>

      {/* ── Group Overview Enterprise Feature ──────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#006AA7] py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FECC02]/20 text-[#FECC02] text-xs font-bold uppercase tracking-widest mb-6">
                <Network className="h-3.5 w-3.5" />
                Enterprise Feature
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                One Group.<br />
                <span className="text-[#FECC02]">Complete Visibility.</span>
              </h2>
              <p className="text-blue-200 text-base leading-relaxed mb-8">
                If your business operates across multiple companies, divisions, or subsidiaries, ProForgeHR gives you a single Group Overview screen that consolidates everything — headcount, open incidents, active risks, leave in flight, and pending expense approvals — across every organisation in your group.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Building2, title: "Group Dashboard", desc: "Total headcount, incidents, risks, and approvals across all organisations in one screen." },
                  { icon: Network, title: "Group Organogram", desc: "Visual group structure showing holding company and subsidiaries — visible to all users, without exposing sensitive data." },
                  { icon: Globe, title: "Multi-Org Journey Tracker", desc: "Track the ProForgeHR implementation progress for every organisation in the group simultaneously." },
                  { icon: Layers, title: "Seamless Org Switching", desc: "Move between organisations instantly from any module — no logout, no reload, no friction." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mt-0.5">
                      <item.icon className="h-4.5 w-4.5 text-[#FECC02]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-blue-300 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">Bedrock Construction</span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">Bedrock Auto</span>
                <span className="px-3 py-1.5 rounded-full bg-[#FECC02]/20 text-[#FECC02] text-xs font-medium border border-[#FECC02]/30">+ Add any subsidiary</span>
              </div>
            </div>
            {/* Right: Visual mock */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#FECC02]" />
                    <span className="font-bold text-white text-sm">Group Overview</span>
                  </div>
                  <span className="text-[10px] bg-[#FECC02]/20 text-[#FECC02] font-semibold px-2 py-1 rounded-full">2 Organisations</span>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { label: "Headcount", value: "47", color: "text-white" },
                    { label: "Incidents", value: "2", color: "text-red-400" },
                    { label: "Risks", value: "5", color: "text-amber-400" },
                    { label: "Pending", value: "3", color: "text-green-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-lg p-2.5 text-center">
                      <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[9px] text-blue-300 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Org cards */}
                {[
                  { name: "Bedrock Construction", headcount: 32, incidents: 1, progress: 70, isHQ: true },
                  { name: "Bedrock Auto", headcount: 15, incidents: 1, progress: 30, isHQ: false },
                ].map((org) => (
                  <div key={org.name} className="bg-white/5 rounded-xl p-4 mb-3 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#FECC02]" />
                        <span className="text-white text-xs font-semibold">{org.name}</span>
                        {org.isHQ && <span className="text-[9px] bg-[#FECC02] text-[#0F172A] font-bold px-1.5 py-0.5 rounded-full">HQ</span>}
                      </div>
                      <span className="text-[10px] text-blue-300">{org.headcount} staff</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-[#006AA7] to-[#FECC02] h-1.5 rounded-full" style={{ width: `${org.progress}%` }} />
                    </div>
                    <p className="text-[9px] text-blue-400 mt-1">{org.progress}% implementation complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consulting Fees ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Transparent Pricing</p>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Two Revenue Streams, Zero Surprises</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Every engagement has two components: a consulting fee for the implementation work, and a platform subscription for the modules you are running. Both are confirmed in the Module Implementation Plan before any work begins.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0F172A] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#006AA7] flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Consulting Fee</div>
                  <div className="text-sm text-blue-300">Per engagement — fixed price</div>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Covers discovery sessions, module configuration, data migration, training, and signoff. Quoted as a fixed fee before work begins — no hourly surprises.
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB81C] mb-3">Fee is based on</p>
              <ul className="space-y-2">
                {[
                  "Organisation size (headcount)",
                  "Number of locations",
                  "Countries of operation",
                  "Number of modules being implemented",
                  "Complexity of data migration",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-blue-200 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C] flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#006AA7] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Platform Subscription</div>
                  <div className="text-sm text-blue-200">Per module — monthly or annual</div>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Billed per module, per organisation — not per user. Costs stay predictable as your headcount grows. You only pay for modules that are live and signed off.
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB81C] mb-3">How it works</p>
              <ul className="space-y-2">
                {[
                  "Per-module pricing — no bundles",
                  "Combo pricing for related modules (e.g. Time & Scheduling)",
                  "Add modules at any time — new consulting engagement",
                  "Remove modules — subscription adjusted immediately",
                  "Annual subscription discount available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-blue-100 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FFB81C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signoff & Training Records ────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FileSignature className="h-5 w-5 text-[#007A4D]" />
                </div>
                <div className="font-bold text-[#0F172A]">Module Implementation Signoff</div>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Module", value: "Leave Management" },
                  { label: "Implemented by", value: "ProForgeHR Specialist" },
                  { label: "Date", value: "15 May 2026" },
                  { label: "Users trained", value: "4 (HR, 2 Managers, Admin)" },
                  { label: "Status", value: "✓ Signed off" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-[#6B7280]">{item.label}</span>
                    <span className={`font-medium ${item.label === "Status" ? "text-[#007A4D]" : "text-[#0F172A]"}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <p className="text-xs text-[#007A4D] leading-relaxed">
                  This record is stored permanently in the Training Records module — accessible to HR, management, and auditors at any time.
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Accountability Built In</p>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Every Module Gets a Signoff</h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                When a module implementation is complete, we do not just hand over a login. We conduct a formal signoff — a documented record that confirms the module has been configured to the agreed specification and that your people have been trained.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                That record lives inside your Training Records module — permanently. It tells you who was trained, when, on what, and by whom. When new staff join, it tells them what systems exist and when retraining is due.
              </p>
              <ul className="space-y-3">
                {[
                  "Auditable implementation history inside the platform",
                  "Training records per user per module",
                  "Retraining prompts when records approach review date",
                  "Compliance evidence for labour and data protection audits",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#4B5563] text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-[#007A4D] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo vs Consultation ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Two Ways to Start</p>
            <h2 className="text-3xl font-bold text-[#0F172A]">Explore or Engage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-[#006AA7]" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">See the Demo</div>
                  <div className="text-sm text-[#6B7280]">Explore the platform</div>
                </div>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
                The demo is a curated capability showcase — a realistic environment populated with real HR data across all modules. It answers one question: <em>"Can this platform do what we need?"</em>
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Realistic organisation with real employee data",
                  "All modules visible and navigable",
                  "No configuration required — just explore",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#4B5563] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006AA7] flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate("/login")} variant="outline" className="w-full border-[#006AA7] text-[#006AA7] hover:bg-blue-50 gap-2">
                View the Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-[#006AA7] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">Book a Consultation</div>
                  <div className="text-sm text-blue-200">Start your engagement</div>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">
                The consultation is where the real work begins. We learn about your organisation, run the AI discovery process, and produce a Module Implementation Plan — before any commitment is made. Choose on-site or live web seminar — the process is identical.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "On-site or live web seminar — your choice",
                  "AI-assisted needs matching",
                  "Module Implementation Plan produced",
                  "Fixed-fee quote before work begins",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-blue-100 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#FFB81C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate("/register")} className="w-full bg-[#FFB81C] text-[#0F172A] hover:bg-[#e6a519] font-semibold gap-2">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">About ProForgeHR</p>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Built in South Africa. Delivered Globally.</h2>
              <p className="text-[#6B7280] mb-4 leading-relaxed">
                ProForgeHR is a product of GD Trade (Pty) Ltd, headquartered in Durban North, KwaZulu-Natal, South Africa. The platform was built on the belief that the knowledge and skill to understand why a business needs certain information — and how to capture it in a way that drives real decisions — is what makes the difference between a system that works and one that collects dust.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                We serve organisations across multiple regions with localised compliance knowledge, regional pricing, and dedicated implementation specialists.
              </p>
              <div className="flex items-center gap-2 mt-4 text-[#6B7280]">
                <MapPin className="h-4 w-4 text-[#006AA7]" />
                <span className="text-sm">Durban North, KwaZulu-Natal, South Africa</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Compliance-Aware by Region</h3>
              <ul className="space-y-3">
                {MARKETS.map((market) => (
                  <li key={market} className="flex items-center gap-3 text-[#6B7280]">
                    <CheckCircle className="h-5 w-5 text-[#007A4D] flex-shrink-0" />
                    <span>{market}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-[#006AA7] leading-relaxed">
                  Our AI discovery engine flags compliance obligations per country automatically — so your Module Implementation Plan accounts for POPI Act, GDPR, and local labour law requirements from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#006AA7]/10 text-[#006AA7] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              ROI Calculator
            </div>
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">What Does ProForgeHR Save You?</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-lg">
              Adjust the sliders to match your organisation. See your estimated return on investment in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Sliders */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
              <h3 className="text-lg font-bold text-[#0F172A]">Your Organisation</h3>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#374151]">Number of Employees</label>
                  <span className="text-[#006AA7] font-bold text-lg">{roiEmployees}</span>
                </div>
                <input
                  type="range" min={5} max={500} step={5}
                  value={roiEmployees}
                  onChange={e => setRoiEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AA7]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5</span><span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#374151]">HR / Admin Staff</label>
                  <span className="text-[#006AA7] font-bold text-lg">{roiHrStaff}</span>
                </div>
                <input
                  type="range" min={1} max={10} step={1}
                  value={roiHrStaff}
                  onChange={e => setRoiHrStaff(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AA7]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span><span>10</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#374151]">Average Monthly Salary (ZAR)</label>
                  <span className="text-[#006AA7] font-bold text-lg">R{roiAvgSalary.toLocaleString()}</span>
                </div>
                <input
                  type="range" min={8000} max={80000} step={1000}
                  value={roiAvgSalary}
                  onChange={e => setRoiAvgSalary(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006AA7]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>R8,000</span><span>R80,000</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 text-xs text-[#6B7280] space-y-1">
                <p className="font-medium text-[#374151] mb-2">Savings Assumptions</p>
                <p>• 70% reduction in manual HR admin time (4 hrs/employee/month)</p>
                <p>• 80% reduction in POPI/BCEA compliance fine risk</p>
                <p>• Elimination of manual leave tracking costs (R200/employee/year)</p>
                <p>• Payroll error correction savings (R150/employee/year)</p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#006AA7] to-[#004f7c] rounded-2xl p-8 text-white">
                <div className="text-sm text-blue-200 mb-1">Estimated Annual Saving</div>
                <div className="text-5xl font-bold mb-1">R{Math.round(totalAnnualSaving).toLocaleString()}</div>
                <div className="text-blue-200 text-sm">per year across your organisation</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs text-[#6B7280] mb-1">Platform Cost</div>
                  <div className="text-2xl font-bold text-[#0F172A]">R{Math.round(estimatedPlatformCost).toLocaleString()}</div>
                  <div className="text-xs text-[#6B7280]">/year (est. R120/user/mo)</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs text-[#6B7280] mb-1">Return on Investment</div>
                  <div className={`text-2xl font-bold ${roi > 0 ? 'text-[#007A4D]' : 'text-red-500'}`}>{Math.round(roi)}%</div>
                  <div className="text-xs text-[#6B7280]">first year ROI</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs text-[#6B7280] mb-1">Payback Period</div>
                  <div className="text-2xl font-bold text-[#0F172A]">{paybackMonths < 1 ? '< 1' : paybackMonths} mo</div>
                  <div className="text-xs text-[#6B7280]">to recover investment</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs text-[#6B7280] mb-1">Admin Hours Freed</div>
                  <div className="text-2xl font-bold text-[#0F172A]">{Math.round(adminTimeSaved * 12)}</div>
                  <div className="text-xs text-[#6B7280]">hours/year returned to work</div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: "HR Admin Time Saved", value: `R${Math.round(adminCostSaved * 12).toLocaleString()}/yr`, color: "bg-blue-500" },
                  { label: "Compliance Risk Reduction", value: `R${Math.round(complianceSaved).toLocaleString()}/yr`, color: "bg-emerald-500" },
                  { label: "Leave Admin Automation", value: `R${Math.round(leaveAdminSaved).toLocaleString()}/yr`, color: "bg-amber-500" },
                  { label: "Payroll Error Elimination", value: `R${Math.round(payrollErrorSaved).toLocaleString()}/yr`, color: "bg-purple-500" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-sm text-[#374151]">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#9CA3AF] text-center">
                * Estimates based on industry benchmarks. Actual savings vary by organisation size, industry, and current processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#006AA7] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">The Platform Tracks Your Business.</h2>
          <p className="text-3xl font-bold text-[#FFB81C] mb-6">We Build It With You.</p>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Book a consultation with a ProForgeHR specialist. We will run the discovery process, match your organisation to the right modules, and produce a Module Implementation Plan — before any commitment is made.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/register")} size="lg" className="bg-[#FFB81C] hover:bg-[#e6a519] text-[#0F172A] font-semibold gap-2 px-8">
              Book a Consultation <ArrowRight className="h-5 w-5" />
            </Button>
            <Button onClick={() => navigate("/login")} size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
              View the Demo
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            {/* Brand */}
            <a href="https://proforgehr.com" className="flex items-center gap-2 no-underline">
              {APP_LOGO && <img src={APP_LOGO} alt="ProForgeHR" className="h-8 w-8 object-contain" />}
              <span className="text-[#006AA7] font-bold text-sm">ProForgeHR</span>
            </a>
            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href="/terms" className="text-[#6B7280] hover:text-[#006AA7] transition-colors">Terms of Service</a>
              <a href="/privacy" className="text-[#6B7280] hover:text-[#006AA7] transition-colors">Privacy Policy</a>
              <a href="/refund-policy" className="text-[#6B7280] hover:text-[#006AA7] transition-colors">Refund Policy</a>
              <a href="/cancellation-policy" className="text-[#6B7280] hover:text-[#006AA7] transition-colors">Cancellation Policy</a>
            </div>
            {/* Copyright */}
            <div className="text-center text-xs text-[#6B7280]">
              © 2026 ProForgeHR — A GD Trade (Pty) Ltd Product · Durban North, KwaZulu-Natal, South Africa · Payments processed by PayFast by Network
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Force full width and better base styling
const containerClass = "max-w-7xl mx-auto px-6 lg:px-8";
