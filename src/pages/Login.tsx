import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_LOGO_HORIZONTAL } from "@/const";

export default function Login({ goToSelect }: { goToSelect: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo login
    setTimeout(() => {
      setIsLoading(false);
      goToSelect(); // Use the function from App.tsx
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <a href="/" className="flex items-center gap-3 no-underline">
          {APP_LOGO_HORIZONTAL ? (
            <img src={APP_LOGO_HORIZONTAL} alt="ProForgeHR" className="h-9 object-contain" />
          ) : (
            <span className="text-xl font-bold text-[#006AA7]">ProForgeHR</span>
          )}
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#0F172A]">Welcome back</h1>
              <p className="text-gray-500 mt-2">Sign in to your ProForgeHR workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-[#006AA7] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-11 bg-[#006AA7] hover:bg-[#005589] text-white font-semibold rounded-xl text-base"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Demo mode — any email and password will work
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
