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

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
          Intelligent Workforce Management
        </h1>
        <p className="text-2xl text-gray-600 mb-12">Built for your business. Choose the modules you need.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/login" className="bg-[#006AA7] text-white px-10 py-4 rounded-2xl text-lg font-medium hover:bg-[#005589]">Sign In</a>
          <a href="#" className="border border-gray-300 px-10 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50">Book Consultation</a>
        </div>
      </div>

      {/* Key Modules */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Modules</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="text-5xl mb-6">👥</div>
              <h3 className="font-semibold text-2xl mb-3">People</h3>
              <p className="text-gray-600">Employee management, profiles, onboarding & more.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="text-5xl mb-6">📋</div>
              <h3 className="font-semibold text-2xl mb-3">Process</h3>
              <p className="text-gray-600">SOPs, workflows, approvals and compliance.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="font-semibold text-2xl mb-3">Performance</h3>
              <p className="text-gray-600">KPIs, Gantt charts, project portfolio.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 text-center">
        © 2026 ProForgeHR — A GD Trade Group Product • Durban North, South Africa
      </footer>
    </div>
  );
}

export default App;
