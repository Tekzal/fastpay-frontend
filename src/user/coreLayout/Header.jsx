import React from 'react';

// Header Component
const Header = ({ onMenuClick }) => (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-8 py-4 flex items-center">
        <button 
          className="md:hidden mr-4 text-gray-600 hover:text-gray-800"
          onClick={onMenuClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Student Payments & Finance
        </h1>
      </div>
    </div>
  );

export default Header;