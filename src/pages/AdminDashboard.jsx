import React, { useState } from 'react'
import useDashboard from '../admin/hooks/useDashboard';
import Sidebar from '../admin/components/layout/Sidebar';
import MainContent from '../admin/components/layout/MainContent';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';

// Main Dashboard Component
const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const {
      activeSection,
      setActiveSection,
      searchTerm,
      setSearchTerm,
      currentPage,
      totalPages,
      expandedMenus,
      toggleMenu,
      paginatedData,
      handleEdit,
      handleDelete,
      handleFilter,
      handleApplyFilter,
      handlePageChange,
      showFilterModal,
      setShowFilterModal,
      activeFilters,
      triggerRefreshAcademicYears,
      triggerRefreshStudents,
      triggerRefreshDepartments,
      triggerRefreshClasses,
      triggerRefreshAcademicPeriods,
      triggerRefreshSchoolFees,
      triggerRefreshExamFees,
      triggerRefreshOtherBills,
      triggerRefreshPayments,
    } = useDashboard();
    const navigate = useNavigate();
  
    // TODO: Replace with real user info from /users/me
    const user = { name: 'Quoda', role: 'User' };

    const handleLogout = () => {
      localStorage.removeItem('jwt_token');
      navigate('/login');
    };

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-3 sm:px-4 py-2">
              <UserIcon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              <div className="flex flex-col text-white">
                <span className="font-semibold leading-tight text-sm sm:text-base">{user.name}</span>
                <span className="text-xs opacity-80">{user.role}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-100 transition-colors group"
              title="Logout"
            >
              <LogOut className="text-red-500 group-hover:text-red-700 w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 bg-gray-50">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          {/* Main Content */}
          <MainContent
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            paginatedData={paginatedData}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFilter={handleFilter}
            handleApplyFilter={handleApplyFilter}
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            activeFilters={activeFilters}
            triggerRefreshAcademicYears={triggerRefreshAcademicYears}
            triggerRefreshStudents={triggerRefreshStudents}
            triggerRefreshDepartments={triggerRefreshDepartments}
            triggerRefreshClasses={triggerRefreshClasses}
            triggerRefreshAcademicPeriods={triggerRefreshAcademicPeriods}
            triggerRefreshSchoolFees={triggerRefreshSchoolFees}
            triggerRefreshExamFees={triggerRefreshExamFees}
            triggerRefreshOtherBills={triggerRefreshOtherBills}
            triggerRefreshPayments={triggerRefreshPayments}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>
    );
}

export default AdminDashboard