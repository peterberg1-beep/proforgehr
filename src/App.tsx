import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import { isInOrgMode } from './lib/orgSession';

// Placeholder components
const Login = () => <div className="min-h-screen flex items-center justify-center">Login Page (coming soon)</div>;
const SelectOrganization = () => <div className="min-h-screen flex items-center justify-center">Select Organisation / Group (coming soon)</div>;
const Dashboard = () => <div className="min-h-screen flex items-center justify-center">Organisation Dashboard - Secured Area</div>;
const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

function App() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />

      {/* Organisation Selection */}
      <Route path="/select-organization" component={SelectOrganization} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin-dashboard" component={Dashboard} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
