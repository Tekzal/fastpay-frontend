import React from 'react'
import useDashboard from '../admin/hooks/useDashboard';
import Sidebar from '../admin/components/layout/Sidebar';
import MainContent from '../admin/components/layout/MainContent';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

// Main Dashboard Component
const AdminDashboard = () => {
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
  
    return (
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-2">
              <UserIcon className="text-white" size={24} />
              <div className="flex flex-col text-white">
                <span className="font-semibold leading-tight">{user.name}</span>
                <span className="text-xs opacity-80">{user.role}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-100 transition-colors group"
              title="Logout"
            >
              <LogOut className="text-red-500 group-hover:text-red-700" size={28} />
            </button>
          </div>
        </header>
        <div className="flex h-screen bg-gray-50">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
          />
          
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
          />
        </div>
      </div>
    );
}

export default AdminDashboard