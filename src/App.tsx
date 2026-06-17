import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import Login from './pages/Login';           // we'll create/fix these later
import SelectOrganization from './pages/SelectOrganization';

// Simple placeholder for now
function NotFound() {
  return <div className="p-20 text-center">404 - Page Not Found</div>;
}

function App() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />

      {/* Organisation Selection (after login) */}
      <Route path="/select-organization" component={SelectOrganization} />

      {/* Protected Routes - will be secured later */}
      <Route path="/admin-dashboard" component={() => <div>Admin Dashboard (coming soon)</div>} />
      <Route path="/org-dashboard" component={() => <div>Organisation Dashboard (coming soon)</div>} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
