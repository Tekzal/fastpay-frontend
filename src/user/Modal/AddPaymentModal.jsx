import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getAcademicPeriodDetails, getAcademicYearDetails, createPayment } from '../../services/api';

const AddPaymentModal = ({ isOpen, onClose, selectedPaymentType, selectedStudent, selectedPeriod, onSuccess }) => {
  const [formData, setFormData] = useState({
    invoice_amount: '',
    payment_method: 'Cash',
    notes: '',
    payment_made_by: '',
    contact_of_person_paying: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        invoice_amount: '',
        payment_method: 'Cash',
        notes: '',
        payment_made_by: '',
        contact_of_person_paying: ''
      });
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateFeeBracket = async () => {
    try {
      // Get academic period details
      const periodDetails = await getAcademicPeriodDetails(selectedPeriod);
      
      // Get academic year details
      const yearDetails = await getAcademicYearDetails(periodDetails.academic_year_id);
      
      // Concatenate term and academic year name
      const feeBracket = `${periodDetails.term} ${yearDetails.name}`;
      
      return feeBracket;
    } catch (error) {
      console.error('Error generating fee bracket:', error);
      throw new Error('Failed to generate fee bracket');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('handleSubmit called with selectedPaymentType:', selectedPaymentType);
    
    if (!selectedStudent || !selectedPaymentType) {
      setError('Missing student or payment type information');
      return;
    }

    if (!formData.invoice_amount || !formData.payment_method) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Generate fee bracket
      const feeBracket = await generateFeeBracket();
      
      // Prepare the payment data
      const paymentData = {
        student_id: parseInt(selectedStudent.studentId),
        fee_type: selectedPaymentType.type,
        fee_bracket: feeBracket,
        payment_method: formData.payment_method,
        invoice_amount: parseFloat(formData.invoice_amount),
        notes: formData.notes || '',
        payment_made_by: formData.payment_made_by || '',
        contact_of_person_paying: formData.contact_of_person_paying || ''
      };

      // Validate data types
      console.log('Validated payment data:', {
        student_id: paymentData.student_id,
        student_id_type: typeof paymentData.student_id,
        fee_type: paymentData.fee_type,
        fee_type_type: typeof paymentData.fee_type,
        fee_bracket: paymentData.fee_bracket,
        fee_bracket_type: typeof paymentData.fee_bracket,
        payment_method: paymentData.payment_method,
        payment_method_type: typeof paymentData.payment_method,
        invoice_amount: paymentData.invoice_amount,
        invoice_amount_type: typeof paymentData.invoice_amount,
        notes: paymentData.notes,
        notes_type: typeof paymentData.notes,
        payment_made_by: paymentData.payment_made_by,
        payment_made_by_type: typeof paymentData.payment_made_by,
        contact_of_person_paying: paymentData.contact_of_person_paying,
        contact_of_person_paying_type: typeof paymentData.contact_of_person_paying
      });

      console.log('Payment data being sent:', paymentData);
      console.log('Selected student:', selectedStudent);
      console.log('Selected payment type:', selectedPaymentType);
      console.log('Generated fee bracket:', feeBracket);

      // Create the payment
      await createPayment(paymentData);
      
      // Close modal and reset form
      onClose();
      setFormData({
        invoice_amount: '',
        payment_method: 'Cash',
        notes: '',
        payment_made_by: '',
        contact_of_person_paying: ''
      });
      
      // Call the success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('Failed to create payment. Please try again.');
      console.error('Error creating payment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Payment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Payment Type</p>
          <p className="font-semibold text-gray-800">{selectedPaymentType?.type}</p>
          <p className="text-sm text-gray-600 mt-1">Student: {selectedStudent?.name}</p>
          <p className="text-sm text-gray-600">Required Amount: GHS {selectedPaymentType?.fee?.requiredAmount}</p>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Amount Paid (GHS)</label>
          <input 
            type="number" 
            name="invoice_amount"
            value={formData.invoice_amount}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            max={selectedPaymentType?.fee?.requiredAmount}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" 
            placeholder="0.00" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Made By</label>
          <input
            type="text"
            name="payment_made_by"
            value={formData.payment_made_by}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
            placeholder="Enter name of person paying"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contact of Person Paying</label>
          <input
            type="text"
            name="contact_of_person_paying"
            value={formData.contact_of_person_paying}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
            placeholder="Enter contact of person paying"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
          <select 
            name="payment_method"
            value={formData.payment_method}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Reference/Notes</label>
          <input 
            type="text" 
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" 
            placeholder="Optional reference or notes" 
          />
        </div>
      </form>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Add Payment'}
        </button>
        <button 
          onClick={onClose} 
          disabled={loading}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddPaymentModal;