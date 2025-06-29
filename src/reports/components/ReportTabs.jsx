import React from 'react';

const tabs = [
  { id: 'individual', label: 'Individual Student Payments' },
  { id: 'aggregated', label: 'Aggregated Payments' }
];

const ReportTabs = ({ activeTab, setActiveTab }) => (
  <nav className="bg-transparent py-4" aria-label="Report Tabs">
    <div className="flex justify-center space-x-2" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          id={`tab-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={`px-6 py-2 rounded-full font-semibold text-sm focus:outline-none transition-all duration-200
            shadow-sm
            ${activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'}
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </nav>
);

export default ReportTabs; 