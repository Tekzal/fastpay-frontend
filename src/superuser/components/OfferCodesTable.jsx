import React from 'react';
import { mockOfferCodesData } from '../data/mockData';

const OfferCodesTable = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Offer Codes Management</h3>
          <p className="text-gray-600">Create and manage promotional discount codes</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Generate New Code
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-700">ID</th>
            <th className="text-left p-4 font-semibold text-gray-700">Code</th>
            <th className="text-left p-4 font-semibold text-gray-700">Start Term</th>
            <th className="text-left p-4 font-semibold text-gray-700">End Term</th>
            <th className="text-left p-4 font-semibold text-gray-700">Created At</th>
            <th className="text-left p-4 font-semibold text-gray-700">Status</th>
            <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockOfferCodesData.map((code, index) => {
            const createdDate = new Date(code.created_at);
            const isActive = code.end_term >= 2; // Assuming current term is 2
            return (
              <tr key={code.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 text-gray-800">{code.id}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg font-mono font-semibold">
                    {code.code}
                  </span>
                </td>
                <td className="p-4 text-gray-800">Term {code.start_term}</td>
                <td className="p-4 text-gray-800">Term {code.end_term}</td>
                <td className="p-4 text-gray-600">{createdDate.toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isActive ? 'Active' : 'Expired'}
                  </span>
                </td>
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

export default OfferCodesTable;
