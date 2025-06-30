import { Filter } from 'lucide-react';
import Pagination from '../table/Pagination';

// Bottom Controls Component
const BottomControls = ({ currentPage, totalPages, onPageChange, onFilter }) => {
  return (
    <div className="px-3 sm:px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <button 
          onClick={onFilter}
          className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BottomControls;