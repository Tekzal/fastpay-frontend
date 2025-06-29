import React from 'react';
import { FileText } from 'lucide-react';

const ReportHeader = () => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">FastPay</h1>
          </div>
          <h2 className="text-2xl font-bold text-indigo-600">Reports</h2>
        </div>
      </div>
    </div>
  </div>
);

export default ReportHeader; 