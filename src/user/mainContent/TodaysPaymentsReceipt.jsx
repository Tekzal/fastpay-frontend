import React from 'react';

const TodaysPaymentsReceipt = React.forwardRef(({ payments, studentName, totalToday }, ref) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div ref={ref} className="p-8 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">Payment Receipt</h1>
          <p className="text-sm">FastPay School System</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600"><strong>Student:</strong> {studentName}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Date:</strong> {currentDate}</p>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-2 mb-4">Today's Payments</h2>
          
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-700">Payment For</th>
                <th className="text-right py-2 text-gray-700">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{payment.fee_type}</td>
                  <td className="text-right py-3 text-gray-800 font-medium">
                    {parseFloat(payment.amount_paid).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-gray-600 font-semibold">Total Paid Today:</p>
              <p className="text-2xl font-bold text-blue-600">
                KES {totalToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-xs">
            <p>Thank you for your payment!</p>
            <p>&copy; {new Date().getFullYear()} FastPay School. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TodaysPaymentsReceipt; 