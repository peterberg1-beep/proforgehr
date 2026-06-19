import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SelectOrganization from './pages/SelectOrganization';

// Simple Dashboard with Exit button
const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('selectedOrganization');
            window.location.reload(); // Refresh to go back to Select Organisation
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Exit Organisation
        </button>
      </div>
      <p className="text-gray-600 text-lg">You are now inside an organisation.</p>
      <p className="mt-4 text-sm text-gray-500">This is a protected area.</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'select' | 'dashboard'>('landing');

  // Simple navigation functions
  const goTo = (page: 'landing' | 'login' | 'select' | 'dashboard') => {
    setCurrentPage(page);
  };

  // Render different pages based on state
  if (currentPage === 'landing') {
    return <Landing goToLogin={() => goTo('login')} />;
  }

  if (currentPage === 'login') {
    return <Login goToSelect={() => goTo('select')} />;
  }

  if (currentPage === 'select') {
    return <SelectOrganization goToDashboard={() => goTo('dashboard')} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  return <div>404</div>;
}

export default App;
