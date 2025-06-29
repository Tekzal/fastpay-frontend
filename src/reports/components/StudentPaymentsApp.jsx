import React, { useState } from 'react';
import ReportTabs from './ReportTabs';
import IndividualReport from './IndividualReport';
import AggregatedReport from './AggregatedReport';
import Header from './ReportHeader';

const StudentPaymentsApp = () => {
  const [activeTab, setActiveTab] = useState('individual');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {activeTab === 'individual' ? <IndividualReport /> : <AggregatedReport />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPaymentsApp; 