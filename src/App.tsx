import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import { clearOrgSession } from './lib/orgSession';

// Use your real files if possible, fallback to simple demo
const Login = () => <div>Login Page - Loading your original...</div>; // We will replace with your real one later
const SelectOrganization = () => <div>Select Organisation - Loading your original...</div>;

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
      <p className="text-lg text-gray-600">You are now in <strong>GD Trade Group</strong> mode.</p>
      <p className="mt-4 text-gray-500">This is a protected area. Only users in the selected organisation/group can see data here.</p>
    </div>
  </div>
);

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/select-organization" component={SelectOrganization} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={() => <div className="p-20 text-center text-xl">404 - Page Not Found</div>} />
    </Switch>
  );
}

export default App;
