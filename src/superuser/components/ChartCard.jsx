import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const ChartCard = ({ title, children, height = 300 }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal size={20} />
      </button>
    </div>
    <div style={{ height }}>
      {children}
    </div>
  </div>
);

export default ChartCard;
