import React, { useState } from 'react';
import { Download } from 'lucide-react';
import AggregatedFilters from './AggregatedFilters';
import AggregatedTable from './AggregatedTable';

const sampleAggregatedData = {
  paymentMethod: [
    { method: 'Cash', amount: 15000, transactions: 120, percentage: 45 },
    { method: 'Bank Transfer', amount: 10000, transactions: 45, percentage: 30 },
    { method: 'Mobile Money', amount: 8000, transactions: 80, percentage: 25 }
  ],
  byClass: [
    { class: 'Primary 1', required: 5000, collected: 4500, owed: 500, percentage: 90 },
    { class: 'Primary 2', required: 7000, collected: 5000, owed: 2000, percentage: 71 }
  ]
};

const AggregatedReport = () => {
  const [filters, setFilters] = useState({});
  // Filtering logic can be added here
  const filteredData = sampleAggregatedData;

  return (
    <div className="p-6">
      <AggregatedFilters filters={filters} setFilters={setFilters} />
      <div className="flex space-x-4 mb-6">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Generate Report
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </div>
      <AggregatedTable data={filteredData.paymentMethod} />
    </div>
  );
};

export default AggregatedReport; 