import React from 'react';
import { Plus, History } from 'lucide-react';

// Payment Type Row Component
const PaymentTypeRow = ({ fee, onAddPayment, onViewHistory }) => {
  const amountOwedColor = fee.amountOwed > 0 ? 'text-red-600' : 'text-green-600';

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-4 p-4 md:p-6 items-center border-b last:border-b-0 md:border-none">
      
      {/* Payment Type */}
      <div className="flex justify-between items-center md:block">
        <span className="text-sm font-medium text-gray-500 md:hidden">Payment Type</span>
        <span className="font-semibold text-gray-800 text-right md:text-left">{fee.name}</span>
      </div>

      {/* Required Amount */}
      <div className="flex justify-between items-center md:block">
        <span className="text-sm font-medium text-gray-500 md:hidden">Required</span>
        <span className="text-gray-800 text-right md:text-left">GHS {fee.requiredAmount?.toFixed(2)}</span>
      </div>

      {/* Total Payment */}
      <div className="flex justify-between items-center md:block">
        <span className="text-sm font-medium text-gray-500 md:hidden">Paid</span>
        <span className="text-gray-800 text-right md:text-left">GHS {fee.totalPayment?.toFixed(2)}</span>
      </div>

      {/* Amount Owed */}
      <div className="flex justify-between items-center md:block">
        <span className="text-sm font-medium text-gray-500 md:hidden">Owed</span>
        <span className={`font-bold ${amountOwedColor} text-right md:text-left`}>
          GHS {fee.amountOwed?.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center md:justify-start mt-2 md:mt-0 col-span-1 md:col-span-1">
        <div className="flex gap-2">
          <button
            onClick={() => onAddPayment({ type: fee.name, fee })}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
          >
            <Plus size={14} />
            Add
          </button>
          <button
            onClick={() => onViewHistory({ type: fee.name, fee })}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-sm"
          >
            <History size={14} />
            View
          </button>
        </div>
      </div>

    </div>
  );
};

export default PaymentTypeRow;