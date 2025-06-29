import React, { useState } from 'react';
import Modal from './Modal';

const FilterModal = ({ isOpen, onClose, onApplyFilter, activeSection }) => {
  const [filters, setFilters] = useState({});

  const getFilterFields = () => {
    switch (activeSection) {
      case 'Students':
        return [
          { name: 'first_name', label: 'First Name', type: 'text' },
          { name: 'last_name', label: 'Last Name', type: 'text' },
          { name: 'department_id', label: 'Department ID', type: 'number' },
          { name: 'class_id', label: 'Class ID', type: 'number' },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'graduated', 'transferred'] },
          { name: 'new_admission', label: 'New Admission', type: 'boolean' }
        ];
      case 'Academic Years':
        return [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'from_date', label: 'From Date', type: 'date' },
          { name: 'to_date', label: 'To Date', type: 'date' }
        ];
      case 'Departments':
        return [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' }
        ];
      case 'Classes':
        return [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'department_id', label: 'Department ID', type: 'number' }
        ];
      case 'School Fees':
        return [
          { name: 'department_id', label: 'Department ID', type: 'number' },
          { name: 'class_id', label: 'Class ID', type: 'number' },
          { name: 'academic_period_id', label: 'Academic Period ID', type: 'number' },
          { name: 'required_amount', label: 'Required Amount', type: 'number' }
        ];
      case 'Exam Fees':
        return [
          { name: 'department_id', label: 'Department ID', type: 'number' },
          { name: 'class_id', label: 'Class ID', type: 'number' },
          { name: 'academic_period_id', label: 'Academic Period ID', type: 'number' },
          { name: 'required_amount', label: 'Required Amount', type: 'number' }
        ];
      case 'Other Bills':
        return [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'academic_period_id', label: 'Academic Period ID', type: 'number' },
          { name: 'required_amount', label: 'Required Amount', type: 'number' },
          { name: 'student_id', label: 'Student ID', type: 'number' },
          { name: 'class_id', label: 'Class ID', type: 'number' },
          { name: 'department_id', label: 'Department ID', type: 'number' }
        ];
      case 'Payments':
        return [
          { name: 'student_id', label: 'Student ID', type: 'number' },
          { name: 'fee_type', label: 'Fee Type', type: 'text' },
          { name: 'fee_bracket', label: 'Fee Bracket', type: 'text' },
          { name: 'payment_method', label: 'Payment Method', type: 'text' },
          { name: 'payment_made_by', label: 'Payment Made By', type: 'text' },
          { name: 'invoice_amount', label: 'Invoice Amount', type: 'number' }
        ];
      case 'Users':
        return [
          { name: 'username', label: 'Username', type: 'text' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'role', label: 'Role', type: 'select', options: ['admin', 'manager', 'cashier'] },
          { name: 'is_active', label: 'Active', type: 'boolean' }
        ];
      default:
        return [];
    }
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
  };

  const handleApplyFilter = () => {
    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
    onApplyFilter(cleanFilters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({});
    onApplyFilter({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Filter ${activeSection}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getFilterFields().map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={filters[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                  <option value="">All</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : field.type === 'boolean' ? (
                <select
                  value={filters[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value === '' ? undefined : e.target.value === 'true')}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  value={filters[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Clear Filters
          </button>
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal; 