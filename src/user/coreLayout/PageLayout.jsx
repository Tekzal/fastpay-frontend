import React from 'react';
import { Menu } from 'lucide-react';

const PageLayout = ({
  sidebar,
  children,
  isSidebarOpen,
  setSidebarOpen,
  pageTitle,
}) => {
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="hidden md:flex">{sidebar}</div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-800"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          {pageTitle && (
            <h1 className="text-xl font-bold text-gray-800">
              {pageTitle}
            </h1>
          )}
          <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout; 