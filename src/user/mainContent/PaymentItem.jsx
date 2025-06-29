// Payment Item Component
const PaymentItem = ({ payment }) => {
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

  const paymentType = payment.fee_type || 'General Payment';
  const amountPaid = parseFloat(payment.amount_paid) || 0;

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/80">
      <div className="flex items-center">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3"></div>
        <div>
            <p className="font-semibold text-slate-800">{paymentType}</p>
            <p className="text-sm text-slate-500">{formatTime(payment.created_at)}</p>
        </div>
      </div>
      <div className="font-bold text-slate-800">
        GHS {amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default PaymentItem;