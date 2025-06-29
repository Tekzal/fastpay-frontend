import React from 'react';
import { Users } from 'lucide-react';

// Empty State Component
const EmptyState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Users className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Student Selected</h3>
        <p className="text-gray-500">Please select a student from the left panel to view their payment information.</p>
      </div>
    </div>
  );

  export default EmptyState;