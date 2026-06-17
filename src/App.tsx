import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import { clearOrgSession } from './lib/orgSession';

const Login = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm text-center">
      <h1 className="text-3xl font-bold mb-8">Sign In to ProForgeHR</h1>
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
      <h2 className="text-2xl font-bold mb-8">Select Organisation or Group</h2>
      <button 
        onClick={() => {
          localStorage.setItem('selectedOrganization', JSON.stringify({ 
            id: "gd-trade-group", 
            name: "GD Trade Group" 
          }));
          window.location.href = "/dashboard";
        }}
        className="w-full bg-[#006AA7] hover:bg-[#005589] text-white py-4 rounded-2xl font-medium mb-4 text-lg"
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
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">GD Trade Group Dashboard</h1>
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
      <p className="text-gray-600 text-lg">You are now securely in <strong>GD Trade Group</strong> mode.</p>
      <p className="mt-4 text-sm text-gray-500">This area is protected. Only users belonging to this organisation/group can see data here.</p>
    </div>
  </div>
);

const NotFound = () => <div className="min-h-screen flex items-center justify-center text-2xl">404 - Page Not Found</div>;

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/select-organization" component={SelectOrganization} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
