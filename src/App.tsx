import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';

// Placeholder pages (we will create/fix them later)
const Login = () => <div className="p-20 text-center">Login Page (coming soon)</div>;
const SelectOrganization = () => <div className="p-20 text-center">Select Organisation (coming soon)</div>;
const NotFound = () => <div className="p-20 text-center">404 - Page Not Found</div>;

function App() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />

      {/* After login - Organisation Selection */}
      <Route path="/select-organization" component={SelectOrganization} />

      {/* Protected area - will be secured in next steps */}
      <Route path="/dashboard" component={() => <div>Organisation Dashboard (secured area)</div>} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
