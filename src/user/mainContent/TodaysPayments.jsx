import React from 'react';
import { PrinterIcon } from '@heroicons/react/24/solid';

const TodaysPayments = ({ payments, student }) => {
  const hasPayments = payments && payments.length > 0;
  
  const totalToday = payments.reduce((acc, payment) => {
    const amount = parseFloat(payment.invoice_amount);
    return acc + (isNaN(amount) ? 0 : amount);
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="flex justify-between items-center mb-4 no-print">
        <h3 className="text-xl font-semibold text-slate-800">Today's Payments</h3>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors no-print"
        >
          <PrinterIcon className="h-5 w-5" />
          <span>Print</span>
        </button>
      </div>

      <div className="print-container">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Purley Oaks School</h2>
          <p className="text-sm text-slate-500 mt-1">Payment Receipt</p>
          <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString()}</p>
        </div>

        {student && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-2">Student Information</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <p className="text-slate-600">Name:</p>
              <p className="font-medium text-slate-800">{student.name}</p>
              <p className="text-slate-600">Class:</p>
              <p className="font-medium text-slate-800">{student.class_name}</p>
            </div>
          </div>
        )}

        {hasPayments ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left table-fixed">
                <thead className="bg-blue-100 text-blue-800">
                    <tr>
                        <th className="p-2 font-semibold w-1/4">Time</th>
                        <th className="p-2 font-semibold w-1/4">Fee Type</th>
                        <th className="p-2 font-semibold w-1/4">Paid By</th>
                        <th className="p-2 font-semibold w-1/4">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => {
                        const paymentType = payment.fee_type || 'General Payment';
                        const amountPaid = parseFloat(payment.invoice_amount) || 0;
                        return (
                            <tr key={payment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                                <td className="p-2">{formatTime(payment.created_at)}</td>
                                <td className="p-2">{paymentType}</td>
                                <td className="p-2">{payment.payment_made_by || 'N/A'}</td>
                                <td className="p-2">GHS {amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="border-t-2 border-slate-300 font-bold">
                        <td colSpan="3" className="p-2 text-right">Total</td>
                        <td className="p-2">GHS {totalToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No payments made today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysPayments;