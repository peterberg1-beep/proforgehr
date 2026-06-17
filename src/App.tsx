import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';

// Try to import your real files (with fallbacks)
let Login;
try {
  Login = require('./pages/Login').default;
} catch {
  Login = () => <div className="p-20 text-center">Login Page</div>;
}

let SelectOrganization;
try {
  SelectOrganization = require('./pages/SelectOrganization').default;
} catch {
  SelectOrganization = () => <div className="p-20 text-center">Select Organisation</div>;
}

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>This is the secured area.</p>
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
      <Route component={() => <div>404</div>} />
    </Switch>
  );
}

export default App;
