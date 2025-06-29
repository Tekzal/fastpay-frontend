import React from 'react';

const getProgressBarColor = (percentage) => {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 70) return 'bg-yellow-500';
  if (percentage >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

const AggregatedTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Collected</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((method, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{method.method}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {method.amount.toLocaleString()}.00</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{method.transactions}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressBarColor(method.percentage)}`}
                    style={{ width: `${method.percentage}%` }}
                  ></div>
                </div>
                {method.percentage}%
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AggregatedTable; 