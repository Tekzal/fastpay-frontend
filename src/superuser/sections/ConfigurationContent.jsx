import React, { useState } from 'react';
import PlansTable from '../components/PlansTable';
import CalendarTable from '../components/CalendarTable';
import OfferCodesTable from '../components/OfferCodesTable';

const databaseModels = [
  { id: 'plans', name: 'Plans', icon: '💳', description: 'Subscription plans and pricing' },
  { id: 'sitewide_calendars', name: 'Sitewide Calendars', icon: '📅', description: 'Academic calendar management' },
  { id: 'offer_codes', name: 'Offer Codes', icon: '🎫', description: 'Promotional codes and discounts' }
];

const ConfigurationContent = () => {
  const [selectedModel, setSelectedModel] = useState('plans');

  const renderContent = () => {
    switch (selectedModel) {
      case 'plans':
        return <PlansTable />;
      case 'sitewide_calendars':
        return <CalendarTable />;
      case 'offer_codes':
        return <OfferCodesTable />;
      default:
        return <PlansTable />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Configuration Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Database Models</h2>
        <nav className="space-y-2">
          {databaseModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                selectedModel === model.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{model.icon}</span>
              <div>
                <div className="font-medium">{model.name}</div>
                <div className="text-sm text-gray-500">{model.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Configuration Content */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration Management</h1>
          <p className="text-gray-600">Manage database models and system configurations</p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ConfigurationContent;
