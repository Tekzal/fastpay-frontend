import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, Save, XCircle } from 'lucide-react';
import { getPaymentHistory, updatePayment, deletePayment } from '../../services/api';

const PaymentHistoryModal = ({ isOpen, onClose, selectedPaymentType, selectedStudent, selectedPeriod }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Fetch payment history when modal opens
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!isOpen || !selectedStudent || !selectedPaymentType) return;
      try {
        setLoading(true);
        setError('');
        const data = await getPaymentHistory(selectedStudent.studentId, selectedPaymentType.type, selectedPeriod);
        setPaymentHistory(data);
      } catch (err) {
        setError('Failed to fetch payment history. Please try again.');
        console.error('Error fetching payment history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentHistory();
  }, [isOpen, selectedStudent, selectedPaymentType, selectedPeriod]);

  const handleEditClick = (payment) => {
    setEditingPaymentId(payment.id);
    setEditFormData({
      invoice_amount: payment.invoice_amount || payment.amount || '',
      payment_method: payment.payment_method || payment.method || 'Cash',
      notes: payment.notes || payment.reference || '',
      payment_made_by: payment.payment_made_by || '',
      contact_of_person_paying: payment.contact_of_person_paying || ''
    });
    setEditError('');
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditCancel = () => {
    setEditingPaymentId(null);
    setEditFormData({});
    setEditError('');
  };

  const handleEditSave = async (payment) => {
    if (!editFormData.invoice_amount || !editFormData.payment_method) {
      setEditError('Please fill in all required fields');
      return;
    }
    try {
      setEditLoading(true);
      setEditError('');
      const paymentData = {
        student_id: parseInt(selectedStudent.studentId),
        academic_period_id: parseInt(selectedPeriod),
        fee_type: selectedPaymentType.type,
        fee_bracket: payment.fee_bracket,
        payment_method: editFormData.payment_method,
        invoice_amount: parseFloat(editFormData.invoice_amount),
        notes: editFormData.notes || '',
        payment_made_by: editFormData.payment_made_by || '',
        contact_of_person_paying: editFormData.contact_of_person_paying || ''
      };
      await updatePayment(payment.id, paymentData);
      // Refresh payment history
      const data = await getPaymentHistory(selectedStudent.studentId, selectedPaymentType.type, selectedPeriod);
      setPaymentHistory(data);
      setEditingPaymentId(null);
      setEditFormData({});
    } catch (err) {
      setEditError('Failed to update payment. Please try again.');
      console.error('Error updating payment:', err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = async (payment) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this payment?\n\n` +
      `Amount: GHS ${(payment.invoice_amount || payment.amount || 0).toFixed(2)}\n` +
      `Method: ${payment.payment_method || payment.method}\n` +
      `Date: ${new Date(payment.created_at || payment.date).toLocaleDateString()}\n\n` +
      `This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);
      setDeleteError('');
      await deletePayment(payment.id);
      // Refresh payment history
      const data = await getPaymentHistory(selectedStudent.studentId, selectedPaymentType.type, selectedPeriod);
      setPaymentHistory(data);
    } catch (err) {
      setDeleteError('Failed to delete payment. Please try again.');
      console.error('Error deleting payment:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const totalPaid = paymentHistory.reduce((sum, payment) => sum + (payment.invoice_amount || 0), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-6xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment History: {selectedPaymentType?.type}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-600">Student: <span className="font-semibold">{selectedStudent?.name}</span></p>
          <p className="text-sm text-gray-600">Payment Type: <span className="font-semibold">{selectedPaymentType?.type}</span></p>
          <p className="text-sm text-gray-600">Required Amount: <span className="font-semibold">GHS {selectedPaymentType?.fee?.requiredAmount}</span></p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {deleteError}
          </div>
        )}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment history...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="hidden md:grid md:grid-cols-8 gap-4 px-4 py-3 bg-gray-50 rounded-xl mb-4">
                <div className="font-semibold text-gray-700">Date</div>
                <div className="font-semibold text-gray-700">Amount</div>
                <div className="font-semibold text-gray-700">Method</div>
                <div className="font-semibold text-gray-700">Paid By</div>
                <div className="font-semibold text-gray-700">Contact</div>
                <div className="font-semibold text-gray-700">Fee Bracket</div>
                <div className="font-semibold text-gray-700">Reference/Notes</div>
                <div className="font-semibold text-gray-700">Actions</div>
              </div>
              <div className="space-y-4 md:space-y-0">
                {paymentHistory.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No payment history found for this payment type.
                  </div>
                ) : (
                  paymentHistory.map((payment, index) => (
                    <tr key={payment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 text-gray-800">{formatDate(payment.created_at || payment.date)}</td>
                      {/* Inline editing for this row */}
                      {editingPaymentId === payment.id ? (
                        <>
                          <td className="p-4">
                            <input
                              type="number"
                              name="invoice_amount"
                              value={editFormData.invoice_amount}
                              onChange={handleEditInputChange}
                              step="0.01"
                              min="0"
                              max={selectedPaymentType?.fee?.requiredAmount}
                              className="w-24 p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                            />
                          </td>
                          <td className="p-4">
                            <select
                              name="payment_method"
                              value={editFormData.payment_method}
                              onChange={handleEditInputChange}
                              className="w-32 p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                            >
                              <option value="Cash">Cash</option>
                              <option value="Bank Transfer">Bank Transfer</option>
                              <option value="Mobile Money">Mobile Money</option>
                              <option value="Cheque">Cheque</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <input
                              type="text"
                              name="payment_made_by"
                              value={editFormData.payment_made_by}
                              onChange={handleEditInputChange}
                              className="w-32 p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                              placeholder="Name of payer"
                            />
                          </td>
                          <td className="p-4">
                            <input
                              type="text"
                              name="contact_of_person_paying"
                              value={editFormData.contact_of_person_paying}
                              onChange={handleEditInputChange}
                              className="w-32 p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                              placeholder="Contact of payer"
                            />
                          </td>
                          <td className="p-4 text-gray-800">{payment.fee_bracket || 'N/A'}</td>
                          <td className="p-4">
                            <input
                              type="text"
                              name="notes"
                              value={editFormData.notes}
                              onChange={handleEditInputChange}
                              className="w-32 p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                              placeholder="Optional reference or notes"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSave(payment)}
                                disabled={editLoading}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                                title="Save"
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={handleEditCancel}
                                disabled={editLoading}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                title="Cancel"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                            {editError && (
                              <div className="text-xs text-red-600 mt-1">{editError}</div>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-4 text-gray-800 font-semibold">GHS {(payment.invoice_amount || payment.amount || 0).toFixed(2)}</td>
                          <td className="p-4 text-gray-800">{payment.payment_method || payment.method}</td>
                          <td className="p-4 text-gray-800">{payment.payment_made_by || 'N/A'}</td>
                          <td className="p-4 text-gray-800">{payment.contact_of_person_paying || 'N/A'}</td>
                          <td className="p-4 text-gray-800">{payment.fee_bracket || 'N/A'}</td>
                          <td className="p-4 text-gray-800">{payment.notes || payment.reference || 'N/A'}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditClick(payment)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit Payment"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(payment)}
                                disabled={deleteLoading}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete Payment"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </div>
              {paymentHistory.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <p className="text-lg font-semibold text-green-800">
                    Total Paid: GHS {totalPaid.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Remaining: GHS {((selectedPaymentType?.fee?.requiredAmount || 0) - totalPaid).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryModal;