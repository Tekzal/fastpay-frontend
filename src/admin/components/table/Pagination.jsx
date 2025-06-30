import { ChevronLeft, ChevronRight } from 'lucide-react';

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2 sm:px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        
        {/* Show fewer page numbers on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNum = startPage + index;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-2 text-sm rounded ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Mobile pagination - show current page and total */}
        <div className="flex items-center gap-2 sm:hidden">
          <span className="text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>
        </div>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-2 sm:px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  export default Pagination;