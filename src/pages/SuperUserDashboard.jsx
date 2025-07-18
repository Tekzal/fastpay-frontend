import React, { useState } from 'react';
import Sidebar from '../superuser/components/Sidebar';
import DashboardContent from '../superuser/sections/DashboardContent';
import ConfigurationContent from '../superuser/sections/ConfigurationContent';

const SuperUserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'configuration' && <ConfigurationContent />}
      </main>
    </div>
  );
};

export default SuperUserDashboard;
