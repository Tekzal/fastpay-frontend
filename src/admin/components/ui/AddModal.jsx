import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const getInitialFormState = (section) => {
  switch (section) {
    case 'Students':
      return {
        first_name: '',
        middle_name: '',
        last_name: '',
        parent_contact: '',
        date_of_birth: '',
        address: '',
        department_id: '',
        class_id: '',
        enrollment_date: '',
        status: 'active',
        new_admission: false
      };
    case 'Departments':
      return {
        name: '',
        description: ''
      };
    case 'Classes':
      return {
        name: '',
        department_id: ''
      };
    case 'Academic Years':
      return {
        name: '',
        from_date: '',
        to_date: ''
      };
    case 'Academic Periods':
      return {
        term: '',
        academic_year_id: '',
        from_date: '',
        to_date: '',
        holidays: [],
        planned_event_dates: [],
        exams_from: '',
        exams_to: '',
        vacation_date: '',
        period_status: 'upcoming'
      };
    case 'School Fees':
      return {
        department_id: '',
        class_id: '',
        academic_period_id: '',
        required_amount: ''
      };
    case 'Exam Fees':
      return {
        department_id: '',
        class_id: '',
        academic_period_id: '',
        required_amount: ''
      };
    case 'Other Bills':
      return {
        name: '',
        description: '',
        academic_period_id: '',
        required_amount: '',
        student_id: '',
        class_id: '',
        department_id: ''
      };
    case 'Payments':
      return {
        student_id: '',
        fee_type: '',
        fee_bracket: 'regular',
        payment_method: '',
        payment_made_by: '',
        contact_of_person_paying: '',
        invoice_amount: '',
        notes: ''
      };
    case 'Users':
      return {
        username: '',
        email: '',
        password: '',
        role: 'cashier',
        is_active: true
      };
    default:
      return {};
  }
};

const AddModal = ({ isOpen, onClose, onSubmit, section }) => {
  const [formData, setFormData] = useState(getInitialFormState(section));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when section changes
  useEffect(() => {
    setFormData(getInitialFormState(section));
  }, [section]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData(getInitialFormState(section));
    } catch (err) {
      setError(err.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    const fields = Object.keys(formData);
    return fields.map(field => {
      const label = field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (field === 'new_admission' || field === 'status') {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </label>
          </div>
        );
      }

      if (field.includes('date')) {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="date"
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 sm:py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        );
      }

      if (field.includes('amount')) {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2.5 sm:py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
        );
      }

      if (field === 'description' || field === 'notes') {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <textarea
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 sm:py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        );
      }

      if (section === 'Users' && field === 'role') {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 sm:py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>
        );
      }

      if (section === 'Users' && field === 'is_active') {
        return (
          <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        );
      }

      return (
        <div key={field} className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label htmlFor={field} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type="text"
            name={field}
            id={field}
            value={formData[field]}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 sm:py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      );
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
          Add New {section.slice(0, -1)}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFormFields()}
          </div>
          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2.5 sm:py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2.5 sm:py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 w-full sm:w-auto"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddModal; 