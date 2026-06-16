import React, { useState } from 'react';

function App() {
  const [roiEmployees, setRoiEmployees] = useState(50);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#006AA7] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold">ProForgeHR</div>
            <div className="text-lg opacity-90">People. Process. Performance.</div>
          </div>
          <div className="text-sm">GD Trade Group</div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
          Intelligent Workforce Management
        </h1>
        <p className="text-2xl text-gray-600 mb-12">Built for your business. Choose the modules you need.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/login" className="bg-[#006AA7] text-white px-10 py-4 rounded-2xl text-lg font-medium">Sign In</a>
          <a href="#" className="border border-gray-300 px-10 py-4 rounded-2xl text-lg font-medium">Book Consultation</a>
        </div>
      </div>

      {/* Simple ROI */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Estimated Savings</h2>
          <div className="text-6xl font-bold text-[#006AA7]">R{Math.round(roiEmployees * 1500).toLocaleString()}</div>
          <p className="text-gray-500">per year for {roiEmployees} employees</p>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 text-center">
        © 2026 ProForgeHR — GD Trade Group • Durban North, South Africa
      </footer>
    </div>
  );
}

export default App;
