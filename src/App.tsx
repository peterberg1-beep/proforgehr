import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import { isInOrgMode, clearOrgSession } from './lib/orgSession';

// Simple placeholders
const Login = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign In to ProForgeHR</h1>
      <button 
        onClick={() => window.location.href = "/select-organization"}
        className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-4 rounded-2xl font-medium text-lg"
      >
        Sign In (Demo)
      </button>
      <p className="text-center text-sm text-gray-500 mt-6">Demo mode — click to continue</p>
    </div>
  </div>
);

const SelectOrganization = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm text-center">
      <h2 className="text-2xl font-bold mb-6">Select Organisation</h2>
      <button 
        onClick={() => {
          // Simulate selecting GD Trade Group
          localStorage.setItem('selectedOrganization', JSON.stringify({ id: "gd-trade", name: "GD Trade Group" }));
          window.location.href = "/dashboard";
        }}
        className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-4 rounded-2xl font-medium mb-4"
      >
        GD Trade Group
      </button>
      <button 
        onClick={() => window.location.href = "/"}
        className="w-full border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-medium"
      >
        Back to Home
      </button>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
        <button 
          onClick={() => {
            clearOrgSession();
            window.location.href = "/select-organization";
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Exit Organisation
        </button>
      </div>
      <p className="text-gray-600">This is a secured area. Only users belonging to the selected organisation can see data here.</p>
    </div>
  </div>
);

const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/select-organization" component={SelectOrganization} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin-dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
