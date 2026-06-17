import React from 'react';
import { APP_LOGO, APP_LOGO_HERO } from './const';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#006AA7] text-white py-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={APP_LOGO} 
              alt="ProForgeHR" 
              className="h-12 object-contain" 
            />
            <div>
              <div className="text-3xl font-bold tracking-tight">ProForgeHR</div>
              <div className="text-sm opacity-90 -mt-1">People. Process. Performance.</div>
            </div>
          </div>
          <div className="text-sm font-medium hidden md:block">GD Trade Group</div>
        </div>
      </div>

      {/* Hero with Logo */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <img 
          src={APP_LOGO_HERO} 
          alt="ProForgeHR Hero" 
          className="mx-auto mb-12 max-h-[320px] object-contain" 
        />
        
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
          Intelligent Workforce Management
        </h1>
        <p className="text-2xl text-gray-600 mb-12">Built for your business. Choose the modules you need.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/login" className="bg-[#006AA7] text-white px-10 py-4 rounded-2xl text-lg font-medium hover:bg-[#005589]">
            Sign In
          </a>
          <a href="#" className="border border-gray-300 px-10 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50">
            Book Consultation
          </a>
        </div>
      </div>

      {/* Key Modules */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key Modules</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "👥", title: "People", desc: "Employee management, profiles, onboarding & more." },
              { icon: "📋", title: "Process", desc: "SOPs, workflows, approvals and compliance." },
              { icon: "📊", title: "Performance", desc: "KPIs, Gantt charts, project portfolio." }
            ].map((module, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm text-left">
                <div className="text-6xl mb-8">{module.icon}</div>
                <h3 className="font-semibold text-3xl mb-4">{module.title}</h3>
                <p className="text-gray-600 text-lg">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-16 text-center">
        © 2026 ProForgeHR — A GD Trade Group Product • Durban North, South Africa
      </footer>
    </div>
  );
}

export default App;
