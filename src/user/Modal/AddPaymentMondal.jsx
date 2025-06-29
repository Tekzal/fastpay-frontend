import React, { useState } from 'react';
import Modal from '../Modal';

const AddPaymentModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    // Initialize form data state
  });

  const handleChange = (e) => {
    // Handle form input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button 
            onClick={handleSubmit}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPaymentModal; 