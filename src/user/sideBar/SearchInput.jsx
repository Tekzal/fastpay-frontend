import React from 'react';
import { Search } from 'lucide-react';

// Search Input Component
const SearchInput = ({ searchTerm, onSearchChange }) => (
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search Student Name/ID..."
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
  
  export default SearchInput;