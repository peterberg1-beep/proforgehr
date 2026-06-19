import React from 'react';
import { Route, Switch } from "wouter";
import Landing from './pages/Landing';
import Login from './pages/Login';
import SelectOrganization from './pages/SelectOrganization';

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('selectedOrganization');
            window.location.href = "/select-organization";
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Exit Organisation
        </button>
      </div>
      <p className="text-gray-600 text-lg">You are now inside an organisation.</p>
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
