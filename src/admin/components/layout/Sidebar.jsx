import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { navigationItems } from '../../data/navigationConfig';

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection, expandedMenus, toggleMenu, isOpen, onClose }) => {
    return (
      <div className={`fixed z-40 h-full bg-white shadow-lg w-64 sm:w-72 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 sm:p-6 border-b flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Admin Panel</h1>
          {/* Close button for mobile */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition" 
            onClick={onClose} 
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-4 sm:mt-6">
          {navigationItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  setActiveSection(item.name);
                  if (item.hasSubmenu) toggleMenu(item.name);
                  if (onClose) onClose(); // Close sidebar on mobile after click
                }}
                className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-100 transition-colors ${
                  activeSection === item.name ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="font-medium text-sm sm:text-base">{item.name}</span>
                {item.hasSubmenu && (
                  <div className="ml-2">
                    {expandedMenus[item.name] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>
            </div>
          ))}
        </nav>
      </div>
    );
  };
  
  export default Sidebar;