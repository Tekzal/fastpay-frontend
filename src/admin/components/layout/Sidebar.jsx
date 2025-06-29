import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { navigationItems } from '../../data/navigationConfig';

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection, expandedMenus, toggleMenu, isOpen, onClose }) => {
    return (
      <div className={`fixed z-40 h-full bg-white shadow-lg w-60 overflow-y-auto transition-transform duration-200 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}>
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          {/* Close button for mobile */}
          <button className="md:hidden" onClick={onClose} aria-label="Close sidebar">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  setActiveSection(item.name);
                  if (item.hasSubmenu) toggleMenu(item.name);
                  if (onClose) onClose(); // Close sidebar on mobile after click
                }}
                className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeSection === item.name ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="font-medium">{item.name}</span>
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