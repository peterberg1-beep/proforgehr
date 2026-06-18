import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import Login from './pages/Login';
import SelectOrganization from './pages/SelectOrganization';

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">You are now logged in and in organisation mode.</p>
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
