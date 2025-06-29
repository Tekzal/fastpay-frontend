import React from 'react';
import { Plus } from 'lucide-react';
import PeriodSelector from './PeriodSelector';

// Top Controls Component
const TopControls = ({ selectedPeriod, onPeriodChange, onPaymentRequest, periods }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} periods={periods} />
      <button
        onClick={onPaymentRequest}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-sm md:text-base"
      >
        <Plus size={20} />
        Add Other Bill
      </button>
    </div>
  );

export default TopControls;