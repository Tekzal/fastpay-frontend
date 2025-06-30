import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg sm:rounded-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto shadow-2xl max-h-[95vh] overflow-hidden">
          {title && (
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
          <div className="overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  };

  export default Modal; 