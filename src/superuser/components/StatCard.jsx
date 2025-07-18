import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, prefix = '', suffix = '' }) => {
  const isPositive = change > 0;
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
