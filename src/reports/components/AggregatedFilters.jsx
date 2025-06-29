import React from 'react';

const AggregatedFilters = ({ filters, setFilters }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        <option>Payment Method</option>
        <option>Class</option>
        <option>Department</option>
        <option>Fee Type</option>
        <option>Fee Bracket</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
  </div>
);

export default AggregatedFilters; 