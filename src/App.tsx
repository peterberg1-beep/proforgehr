import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import { isInOrgMode, clearOrgSession } from './lib/orgSession';

// Placeholder pages
const Login = () => <div className="min-h-screen flex items-center justify-center p-8">Login Page (coming soon)</div>;
const SelectOrganization = () => <div className="min-h-screen flex items-center justify-center p-8">Select Organisation / Group (coming soon)</div>;
const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Organisation Dashboard</h1>
      <button 
        onClick={() => {
          clearOrgSession();
          window.location.href = "/select-organization";
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium"
      >
        Exit Organisation
      </button>
      <p className="mt-6 text-gray-600">This area will be secured. Only users in the correct organisation can see data here.</p>
    </div>
  </div>
);

const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

function App() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />

      {/* Organisation Selection */}
      <Route path="/select-organization" component={SelectOrganization} />

      {/* Protected Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin-dashboard" component={Dashboard} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
