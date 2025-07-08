import React, { useState } from 'react';
import ReportTabs from './ReportTabs';
import IndividualReport from './IndividualReport';
import AggregatedReport from './AggregatedReport';

const StudentPaymentsApp = () => {
  const [activeTab, setActiveTab] = useState('individual');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and export individual or aggregated payment reports.
          </p>
        </div>
        <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        {activeTab === 'individual' ? <IndividualReport /> : <AggregatedReport />}
      </div>
    </div>
  );
};

export default StudentPaymentsApp; 