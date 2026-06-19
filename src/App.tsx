import React, { useState } from 'react';

// Improved Landing Page
const Landing = ({ onSignIn }: { onSignIn: () => void }) => (
  <div className="min-h-screen bg-white flex flex-col">
    {/* Top Navigation */}
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#006AA7]">ProForgeHR</span>
        </div>
        <button 
          onClick={onSignIn}
          className="bg-[#006AA7] hover:bg-[#005589] text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          Sign In
        </button>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-[#0F172A] leading-tight tracking-tight mb-6">
          Enterprise HR.<br />
          <span className="text-[#006AA7]">Simple. Secure. Powerful.</span>
        </h1>
        
        <p className="text-2xl text-gray-600 mb-4">
          Built for businesses that demand precision, compliance, and clarity.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-lg text-gray-500 mb-10">
          <span>People</span>
          <span className="text-gray-300">•</span>
          <span>Process</span>
          <span className="text-gray-300">•</span>
          <span>Performance</span>
        </div>

        <button 
          onClick={onSignIn}
          className="bg-[#006AA7] hover:bg-[#005589] text-white text-xl font-semibold px-10 py-4 rounded-2xl transition-all active:scale-[0.985]"
        >
          Get Started – Sign In
        </button>

        <p className="mt-6 text-sm text-gray-400">
          Trusted by growing South African businesses
        </p>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
        © 2026 ProForgeHR • GD Trade Group • Durban, South Africa
      </div>
    </div>
  </div>
);

// Simple Login Page
const Login = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(); // Demo mode - always succeeds
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome back</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to your workspace</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Work Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              placeholder="you@company.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              required 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-3.5 rounded-xl font-semibold text-lg mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo mode — any email/password works
        </p>
      </div>
    </div>
  );
};

// Simple Select Organisation
const SelectOrganization = ({ onSelect, onBack }: { onSelect: () => void; onBack: () => void }) => (
  <div className="min-h-screen bg-[#F8FAFC] p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Select Organisation</h1>
          <p className="text-gray-500">Choose where you want to work</p>
        </div>
        <button onClick={onBack} className="border px-5 py-2 rounded-xl">Back</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-semibold text-xl mb-1">ACME Construction</h3>
          <p className="text-sm text-gray-500 mb-4">Standalone Organisation</p>
          <button 
            onClick={onSelect}
            className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-3 rounded-xl font-medium"
          >
            Enter Organisation
          </button>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-semibold text-xl mb-1">Bedrock Construction</h3>
          <p className="text-sm text-gray-500 mb-1">Part of GD Trade Group</p>
          <button 
            onClick={onSelect}
            className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-3 rounded-xl font-medium"
          >
            Enter Organisation
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Simple Dashboard
const Dashboard = ({ onExit }: { onExit: () => void }) => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
        <button 
          onClick={onExit}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Exit Organisation
        </button>
      </div>
      <p className="text-gray-600">You are now securely inside an organisation.</p>
      <p className="mt-4 text-sm text-gray-500">Real modules and data will appear here.</p>
    </div>
  </div>
);

function App() {
  const [page, setPage] = useState<'landing' | 'login' | 'select' | 'dashboard'>('landing');

  return (
    <>
      {page === 'landing' && <Landing onSignIn={() => setPage('login')} />}
      {page === 'login' && <Login onSuccess={() => setPage('select')} />}
      {page === 'select' && <SelectOrganization onSelect={() => setPage('dashboard')} onBack={() => setPage('landing')} />}
      {page === 'dashboard' && <Dashboard onExit={() => setPage('select')} />}
    </>
  );
}

export default App;
