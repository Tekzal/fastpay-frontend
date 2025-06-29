import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getClassDetails, createOtherBill } from '../../services/api';

const PaymentRequestModal = ({ isOpen, onClose, selectedStudent, periods, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    required_amount: '',
    academic_period_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        description: '',
        required_amount: '',
        academic_period_id: periods && periods.length > 0 ? periods[0].id : ''
      });
      setError('');
    }
  }, [isOpen, periods]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      setError('No student selected');
      return;
    }

    if (!formData.name || !formData.description || !formData.required_amount || !formData.academic_period_id) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Get class details to obtain department_id
      const classDetails = await getClassDetails(selectedStudent.class);
      
      // Prepare the bill data
      const billData = {
        name: formData.name,
        description: formData.description,
        academic_period_id: parseInt(formData.academic_period_id),
        required_amount: parseFloat(formData.required_amount),
        student_id: parseInt(selectedStudent.studentId),
        class_id: selectedStudent.class,
        department_id: classDetails.department_id
      };

      // Create the other bill
      await createOtherBill(billData);
      
      // Close modal and reset form
      onClose();
      setFormData({
        name: '',
        description: '',
        required_amount: '',
        academic_period_id: ''
      });
      
      // Call the success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (err) {
      setError('Failed to create other bill. Please try again.');
      console.error('Error creating other bill:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Other Bill">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" 
            placeholder="Enter item name" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors h-24 resize-none" 
            placeholder="Enter description"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Required Amount (GHS)</label>
          <input 
            type="number" 
            name="required_amount"
            value={formData.required_amount}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" 
            placeholder="0.00" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Period</label>
          <select 
            name="academic_period_id"
            value={formData.academic_period_id}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
          >
            <option value="">Select a period</option>
            {periods && periods.map(period => (
              <option key={period.id} value={period.id}>
                {period.name || `Period ${period.id}`}
              </option>
            ))}
          </select>
        </div>
      </form>
      
      <div className="flex gap-3 mt-8">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Bill'}
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

export default PaymentRequestModal;