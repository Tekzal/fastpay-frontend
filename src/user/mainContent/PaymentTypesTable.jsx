import React from 'react';
import { Plus, History } from 'lucide-react';
import PaymentTypeRow from './PaymentTypeRow';

const PaymentTypesTable = ({ paymentTypes, onAddPayment, onViewHistory }) => {
  if (!paymentTypes) return null;

  const { schoolFees, examFees, otherBills } = paymentTypes;

  // Combine all payment types into a single array
  const allRows = [
    ...(schoolFees || []),
    ...(examFees || []),
    ...(otherBills || [])
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b">
        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Type</div>
        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Required Amount</div>
        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Payment</div>
        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount Owed</div>
        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</div>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 bg-gray-50 border-b">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Payment Summary</h3>
      </div>
      
      <div className="divide-y divide-gray-200 md:divide-y-0">
        {allRows.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No payment information available</p>
          </div>
        ) : (
          allRows.map((fee) => (
            <PaymentTypeRow
              key={fee.id}
              fee={fee}
              onAddPayment={onAddPayment}
              onViewHistory={onViewHistory}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentTypesTable;