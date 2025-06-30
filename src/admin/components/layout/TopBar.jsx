import { Search, Plus, Menu, Upload, Download, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Top Bar Component
const TopBar = ({ activeSection, searchTerm, setSearchTerm, onAddNew, onMenuClick, onImport, onExport, importing, setSidebarOpen }) => {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const exportMenuRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
          setShowExportMenu(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleExport = (format) => {
      onExport(format);
      setShowExportMenu(false);
    };

    return (
      <div className="bg-white shadow-sm border-b px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Hamburger menu for mobile */}
              <button 
                className="block md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition" 
                onClick={() => setSidebarOpen(true)} 
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 break-words">
                {activeSection}
              </h2>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${activeSection}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full min-w-0 text-sm sm:text-base"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Import Button */}
              <button
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
                onClick={onImport}
                disabled={importing}
                type="button"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">{importing ? 'Importing...' : 'Import'}</span>
                <span className="sm:hidden">{importing ? '...' : 'Import'}</span>
              </button>

              {/* Export Button with Dropdown */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  className="flex items-center justify-center gap-2 bg-yellow-600 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg hover:bg-yellow-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  type="button"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden">Export</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('xlsx')}
                    >
                      <span className="w-6">📊</span>
                      Excel (.xlsx)
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('csv')}
                    >
                      <span className="w-6">📄</span>
                      CSV (.csv)
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('pdf')}
                    >
                      <span className="w-6">📑</span>
                      PDF (.pdf)
                    </button>
                  </div>
                )}
              </div>

              {/* Add New Button */}
              <button 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
                onClick={onAddNew}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New {(typeof activeSection === 'string' && activeSection.length > 0) ? activeSection.slice(0, -1) : 'Item'}</span>
                <span className="sm:hidden">Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopBar;