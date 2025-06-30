import React, { useState, useRef, useEffect } from 'react';
import getTableConfig from '../../utils/tableConfig';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Helper function to format header for display
const formatHeaderForDisplay = (header) => {
  if (header === 'id') return 'ID';
  if (header === 'actions') return 'Actions';
  
  // Split by underscore and capitalize each word
  return header
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format cell value
const formatCellValue = (value) => {
  if (value === null || value === undefined) return 'N/A';
  
  // Handle dates
  if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
    try {
      const date = new Date(value);
      if (value.includes('T')) {
        return date.toLocaleString();
      }
      return date.toLocaleDateString();
    } catch (e) {
      return value;
    }
  }

  // Handle boolean values
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.join(', ') || 'None';
  }

  // Handle numbers that might be amounts
  if (typeof value === 'number') {
    if (String(value).includes('.')) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return value.toLocaleString();
  }

  return value.toString();
};

// Helper function to determine input type
const getInputType = (value, header) => {
  if (header.includes('date')) return 'date';
  if (header.includes('amount') || header === 'required_amount') return 'number';
  if (typeof value === 'boolean') return 'checkbox';
  if (typeof value === 'number') return 'number';
  return 'text';
};

// Helper function to parse input value based on type
const parseInputValue = (value, type) => {
  if (type === 'number') return Number(value);
  if (type === 'checkbox') return value === 'true' || value === true;
  if (type === 'date') {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }
  return value;
};

// Action Button Component
const ActionButton = ({ icon: Icon, onClick, colorClass, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${colorClass}`}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </button>
);

// Editable Cell Component
const EditableCell = ({ value, header, isEditing, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);
  const inputType = getInputType(value, header);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave(parseInputValue(editValue, inputType));
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (!isEditing) {
    return (
      <div className="px-2 py-1">
        {formatCellValue(value)}
      </div>
    );
  }

  if (inputType === 'checkbox') {
    return (
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="checkbox"
          checked={editValue === true}
          onChange={(e) => setEditValue(e.target.checked)}
          onKeyDown={handleKeyDown}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => onSave(editValue)}
            className="p-1 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100"
            title="Save"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onCancel}
            className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
            title="Cancel"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Edit {formatHeaderForDisplay(header)}
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-field" className="block text-sm font-medium text-gray-700 mb-1">
              Current Value
            </label>
            <input
              id="edit-field"
              ref={inputRef}
              type={inputType}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              step={inputType === 'number' ? '0.01' : undefined}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(parseInputValue(editValue, inputType))}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data Table Component
const DataTable = ({ activeSection, data, onEdit, onDelete, onUpdate }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
        <p className="text-gray-500">There are no records to display at this time.</p>
      </div>
    );
  }

  // Get table configuration for the active section
  const tableConfig = getTableConfig(activeSection);
  const headers = tableConfig?.headers || Object.keys(data[0]).filter(key => key !== '__typename');

  // Ensure 'actions' is in the headers if not already present
  if (!headers.includes('actions')) {
    headers.push('actions');
  }

  const handleCellSave = (rowIndex, header, newValue) => {
    const updatedItem = { ...data[rowIndex], [header]: newValue };
    onUpdate(updatedItem);
    setEditingCell(null);
    setEditMode(false);
    setSelectedRow(null);
  };

  const handleEditClick = (item, rowIndex) => {
    if (editMode && selectedRow === rowIndex) {
      setEditMode(false);
      setSelectedRow(null);
      setEditingCell(null);
    } else {
      setEditMode(true);
      setSelectedRow(rowIndex);
    }
  };

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <span className="hidden sm:inline">{formatHeaderForDisplay(header)}</span>
                <span className="sm:hidden">
                  {header === 'actions' ? 'Actions' : 
                   header === 'id' ? 'ID' : 
                   header.length > 8 ? header.substring(0, 8) + '...' : header}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
            >
              {headers.map((header, colIndex) => {
                if (header === 'actions') {
                  return (
                    <td key={colIndex} className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <ActionButton
                          icon={PencilIcon}
                          onClick={() => handleEditClick(item, rowIndex)}
                          colorClass={`${editMode && selectedRow === rowIndex ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-600 hover:text-indigo-900'}`}
                          title={editMode && selectedRow === rowIndex ? "Finish Editing" : "Edit"}
                        />
                        <ActionButton
                          icon={TrashIcon}
                          onClick={() => onDelete(item)}
                          colorClass="text-red-600 hover:text-red-900"
                          title="Delete"
                        />
                      </div>
                    </td>
                  );
                }
                
                const value = tableConfig?.getRowData ? 
                  tableConfig.getRowData(item)[headers.indexOf(header)] : 
                  item[header];
                
                const isEditing = editMode && selectedRow === rowIndex && editingCell?.header === header;
                
                return (
                  <td 
                    key={colIndex} 
                    className="px-3 sm:px-6 py-4 text-sm text-gray-900"
                    onClick={() => {
                      if (editMode && selectedRow === rowIndex && 
                          header !== 'id' && header !== 'actions' && 
                          header !== 'created_at' && header !== 'updated_at') {
                        setEditingCell({ rowIndex, header });
                      }
                    }}
                  >
                    <div className="sm:whitespace-nowrap">
                      <EditableCell
                        value={value}
                        header={header}
                        isEditing={isEditing}
                        onSave={(newValue) => handleCellSave(rowIndex, header, newValue)}
                        onCancel={() => {
                          setEditingCell(null);
                        }}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;