import React from 'react';
import { mockPlansData } from '../data/mockData';

const PlansTable = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Plans Management</h3>
          <p className="text-gray-600">Manage subscription plans and pricing models</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Plan
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-700">ID</th>
            <th className="text-left p-4 font-semibold text-gray-700">Plan Name</th>
            <th className="text-left p-4 font-semibold text-gray-700">Description</th>
            <th className="text-left p-4 font-semibold text-gray-700">Student Limit</th>
            <th className="text-left p-4 font-semibold text-gray-700">Price/Student</th>
            <th className="text-left p-4 font-semibold text-gray-700">Max Users</th>
            <th className="text-left p-4 font-semibold text-gray-700">Billing Cycle</th>
            <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockPlansData.map((plan, index) => (
            <tr key={plan.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="p-4 text-gray-800">{plan.id}</td>
              <td className="p-4 font-semibold text-gray-900">{plan.plan_name}</td>
              <td className="p-4 text-gray-600">{plan.description}</td>
              <td className="p-4 text-gray-800">{plan.student_limit.toLocaleString()}</td>
              <td className="p-4 text-gray-800">GHS {plan.price_per_student.toFixed(2)}</td>
              <td className="p-4 text-gray-800">{plan.maximum_users}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.billing_cycle === 'yearly' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {plan.billing_cycle}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PlansTable;
