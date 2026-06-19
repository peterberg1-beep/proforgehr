import React, { useState } from 'react';
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
            window.location.reload();
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
  const [page, setPage] = useState<'landing' | 'login' | 'select' | 'dashboard'>('landing');

  // Simple navigation functions
  const goToLogin = () => setPage('login');
  const goToSelect = () => setPage('select');
  const goToDashboard = () => setPage('dashboard');
  const goToLanding = () => setPage('landing');

  if (page === 'landing') {
    return <Landing goToLogin={goToLogin} />;
  }

  if (page === 'login') {
    return <Login onLoginSuccess={goToSelect} />;
  }

  if (page === 'select') {
    return <SelectOrganization onSelect={goToDashboard} onBack={goToLanding} />;
  }

  if (page === 'dashboard') {
    return <Dashboard />;
  }

  return <div>404</div>;
}

export default App;
