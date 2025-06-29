import React from 'react';
import { CreditCard } from 'lucide-react';

// Logo Component
const Logo = () => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
        <CreditCard className="text-white" size={20} />
      </div>
      <span className="text-xl font-bold text-gray-800">FastPay</span>
    </div>
  );

  export default Logo;