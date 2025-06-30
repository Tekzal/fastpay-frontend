import React from 'react';

// Header Component
const Header = ({ onMenuClick }) => (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Payments & Finance
          </h1>
        </div>
        
        {/* Mobile menu indicator */}
        <div className="md:hidden">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );

export default Header;