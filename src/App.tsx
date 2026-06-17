import React from 'react';
import { APP_LOGO, APP_LOGO_HERO } from './const';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#006AA7] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={APP_LOGO} 
              alt="ProForgeHR" 
              className="h-14 w-auto object-contain" 
            />
            <div>
              <div className="text-4xl font-bold">ProForgeHR</div>
              <div className="text-lg opacity-90">People. Process. Performance.</div>
            </div>
          </div>
          <div className="text-sm font-medium">GD Trade Group</div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <img 
          src={APP_LOGO_HERO} 
          alt="ProForgeHR Hero" 
          className="mx-auto mb-12 max-h-[380px] w-auto object-contain" 
        />
        
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
          Intelligent Workforce Management
        </h1>
        <p className="text-2xl text-gray-600 mb-12">Built for your business. Choose the modules you need.</p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="/login" className="bg-[#006AA7] hover:bg-[#005589] text-white px-12 py-5 rounded-2xl text-xl font-semibold transition">
            Sign In
          </a>
          <a href="#" className="border-2 border-gray-300 hover:bg-gray-50 px-12 py-5 rounded-2xl text-xl font-semibold transition">
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
            ].map((m, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow text-left">
                <div className="text-6xl mb-6">{m.icon}</div>
                <h3 className="text-3xl font-semibold mb-4">{m.title}</h3>
                <p className="text-gray-600">{m.desc}</p>
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
