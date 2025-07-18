import React from 'react';
import { mockCalendarData } from '../data/mockData';

const CalendarTable = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sitewide Calendar Management</h3>
          <p className="text-gray-600">Configure academic terms and calendar periods</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Term
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-700">ID</th>
            <th className="text-left p-4 font-semibold text-gray-700">Year</th>
            <th className="text-left p-4 font-semibold text-gray-700">Term</th>
            <th className="text-left p-4 font-semibold text-gray-700">Start Date</th>
            <th className="text-left p-4 font-semibold text-gray-700">End Date</th>
            <th className="text-left p-4 font-semibold text-gray-700">Duration</th>
            <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockCalendarData.map((calendar, index) => {
            const startDate = new Date(calendar.start_date);
            const endDate = new Date(calendar.end_date);
            const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            return (
              <tr key={calendar.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 text-gray-800">{calendar.id}</td>
                <td className="p-4 font-semibold text-gray-900">{calendar.year}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Term {calendar.term}
                  </span>
                </td>
                <td className="p-4 text-gray-800">{startDate.toLocaleDateString()}</td>
                <td className="p-4 text-gray-800">{endDate.toLocaleDateString()}</td>
                <td className="p-4 text-gray-600">{duration} days</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default CalendarTable;
