import React from 'react';

const getStatusColor = (status) => {
  switch (status) {
    case 'PAID': return 'bg-green-100 text-green-800';
    case 'PARTIALLY PAID': return 'bg-yellow-100 text-yellow-800';
    case 'UNPAID': return 'bg-red-100 text-red-800';
    case 'ALMOST PAID': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getProgressBarColor = (percentage) => {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 70) return 'bg-yellow-500';
  if (percentage >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

const IndividualTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payment</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Owed</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Paid</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((student, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {student.required.toLocaleString()}.00</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {student.paid.toLocaleString()}.00</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {student.owed.toLocaleString()}.00</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressBarColor(student.percentage)}`}
                    style={{ width: `${student.percentage}%` }}
                  ></div>
                </div>
                {student.percentage}%
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                {student.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default IndividualTable; 