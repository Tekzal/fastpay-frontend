import React from 'react';
import { Plus } from 'lucide-react';
import PeriodSelector from './PeriodSelector';

// Top Controls Component
const TopControls = ({ selectedPeriod, onPeriodChange, onPaymentRequest, periods }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} periods={periods} />
      <button
        onClick={onPaymentRequest}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl font-semibold hover:shadow-lg active:scale-95 transition-all text-sm sm:text-base"
      >
        <Plus size={18} className="sm:w-5 sm:h-5" />
        Add Other Bill
      </button>
    </div>
  );

export default TopControls;