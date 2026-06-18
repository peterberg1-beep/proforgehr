import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_LOGO, APP_LOGO_DARK, APP_LOGO_HORIZONTAL } from "@/const";
import { Loader2, Eye, EyeOff, Shield, Users, BarChart3, Lock } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) window.location.href = "/select-organization";
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please enter your email and password."); return; }
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { toast.error(data.error || "Invalid email or password."); return; }
      toast.success("Welcome back!");
      window.location.href = "/select-organization";
    } catch {
      toast.error("Unable to connect. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-[58%] flex-col justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0F172A 0%, #0a2540 40%, #006AA7 100%)" }}
      >
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FFB81C 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #007A4D 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
          style={{ border: "1px solid #FFB81C" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ border: "1px solid #006AA7" }} />

        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="ProForgeHR" className="h-10 w-10 object-contain" />
            <span className="text-white font-bold text-xl tracking-wide">ProForgeHR</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <img src={APP_LOGO_DARK} alt="ProForgeHR" className="w-56 object-contain mb-8" style={{ filter: "drop-shadow(0 8px 32px rgba(0,106,167,0.5))" }} />
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Enterprise Workforce<br />Management
          </h1>
          <p className="text-blue-200 text-lg max-w-md leading-relaxed">
            Built for businesses that demand precision, compliance, and clarity across every team and every site.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-lg">
            {[
              { icon: Users, label: "People", sub: "HR & Leave", color: "#60a5fa" },
              { icon: BarChart3, label: "Process", sub: "KPI & Gantt", color: "#34d399" },
              { icon: Shield, label: "Performance", sub: "Reviews & Training", color: "#FFB81C" },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="rounded-xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon className="h-6 w-6 mx-auto mb-2" style={{ color }} />
                <div className="text-white font-semibold text-sm">{label}</div>
                <div className="text-blue-300 text-xs mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-10 text-center">
          <p className="text-blue-300 text-sm italic mb-1">"Enterprise Solutions for Modern Businesses."</p>
          <p className="text-blue-400 text-xs">© {new Date().getFullYear()} ProForgeHR · GD Trade Pty Ltd · Durban, South Africa</p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#F8FAFC] px-6 py-12">
        <div className="lg:hidden mb-8">
          <img src={APP_LOGO_HORIZONTAL} alt="ProForgeHR" className="h-10 object-contain" />
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0F172A]">Welcome back</h2>
            <p className="text-gray-500 mt-1.5 text-sm">Sign in to your ProForgeHR workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Work Email</Label>
              <Input
                id="email" type="email" autoComplete="email"
                placeholder="you@company.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-gray-300 focus:border-[#006AA7] focus:ring-[#006AA7] bg-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <a href="mailto:support@proforgehr.com?subject=Password Reset Request"
                  className="text-xs text-[#006AA7] hover:text-[#005a8e] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? "text" : "password"}
                  autoComplete="current-password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-gray-300 focus:border-[#006AA7] focus:ring-[#006AA7] bg-white pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}
              className="w-full h-11 text-white font-semibold rounded-lg transition-all"
              style={{ background: "linear-gradient(135deg, #006AA7 0%, #005a8e 100%)" }}>
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing In…</>) : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
            <Lock className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Your connection is encrypted. Access is restricted to authorised users only.</span>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Need access?{" "}
              <a href="mailto:support@proforgehr.com?subject=Access Request"
                className="text-[#006AA7] hover:underline font-medium">
                Contact your administrator
              </a>
            </p>
          </div>

          <p className="lg:hidden mt-8 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} ProForgeHR · GD Trade Pty Ltd
          </p>
        </div>
      </div>
    </div>
  );
}
