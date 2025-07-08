import React, { useState } from 'react'
import useDashboard from '../admin/hooks/useDashboard';
import Sidebar from '../admin/components/layout/Sidebar';
import MainContent from '../admin/components/layout/MainContent';
import PageLayout from '../user/coreLayout/PageLayout';

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
  
    const sidebarContent = (
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        expandedMenus={expandedMenus}
        toggleMenu={toggleMenu}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    );
  
    return (
      <PageLayout
        sidebar={sidebarContent}
        isSidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pageTitle={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      >
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
      </PageLayout>
    );
}

export default AdminDashboard