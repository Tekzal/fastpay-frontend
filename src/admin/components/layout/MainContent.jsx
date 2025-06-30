import React, { useState } from 'react';
import TopBar from './TopBar';
import DataTable from '../table/DataTable';
import BottomControls from '../ui/BottomControls';
import Modal from '../../../user/Modal/Modal';
import ImportModal from '../ui/ImportModal';
import FilterModal from '../ui/FilterModal';
import AddModal from '../ui/AddModal';
import { createAcademicYear, updateAcademicYear, deleteAcademicYear, updateStudent, deleteStudent, createStudent, updateDepartment, deleteDepartment, createDepartment, updateClass, deleteClass, createClass, updateAcademicPeriod, deleteAcademicPeriod, createAcademicPeriod, updateSchoolFee, deleteSchoolFee, createSchoolFee, updateExamFee, deleteExamFee, createExamFee, updateOtherBill, deleteOtherBill, createOtherBill, createPayment, updatePayment, deletePayment, createUser, updateUser, deleteUser } from '../../../services/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Main Content Component
const MainContent = ({ 
  activeSection, 
  setActiveSection,
  searchTerm, 
  setSearchTerm, 
  paginatedData, 
  currentPage, 
  totalPages, 
  onPageChange,
  onEdit,
  onDelete,
  onFilter,
  handleApplyFilter,
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
  triggerRefreshUsers,
  expandedMenus,
  toggleMenu,
  setSidebarOpen
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState({ success: 0, failed: 0, errors: [] });
  const fileInputRef = React.useRef(null);

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  // Edit handlers for each section
  const handleEditAcademicYear = async (updatedItem) => {
    try {
      await updateAcademicYear(updatedItem.id, updatedItem);
      if (triggerRefreshAcademicYears) triggerRefreshAcademicYears();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update academic year');
    }
  };

  const handleEditStudent = async (updatedItem) => {
    try {
      await updateStudent(updatedItem.id, updatedItem);
      if (triggerRefreshStudents) triggerRefreshStudents();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update student');
    }
  };

  const handleEditDepartment = async (updatedItem) => {
    try {
      await updateDepartment(updatedItem.id, updatedItem);
      if (triggerRefreshDepartments) triggerRefreshDepartments();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update department');
    }
  };

  const handleEditClass = async (updatedItem) => {
    try {
      await updateClass(updatedItem.id, updatedItem);
      if (triggerRefreshClasses) triggerRefreshClasses();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update class');
    }
  };

  const handleEditAcademicPeriod = async (updatedItem) => {
    try {
      await updateAcademicPeriod(updatedItem.id, updatedItem);
      if (triggerRefreshAcademicPeriods) triggerRefreshAcademicPeriods();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update academic period');
    }
  };

  const handleEditSchoolFee = async (updatedItem) => {
    try {
      await updateSchoolFee(updatedItem.id, updatedItem);
      if (triggerRefreshSchoolFees) triggerRefreshSchoolFees();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update school fee');
    }
  };

  const handleEditExamFee = async (updatedItem) => {
    try {
      await updateExamFee(updatedItem.id, updatedItem);
      if (triggerRefreshExamFees) triggerRefreshExamFees();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update exam fee');
    }
  };

  const handleEditOtherBill = async (updatedItem) => {
    try {
      await updateOtherBill(updatedItem.id, updatedItem);
      if (triggerRefreshOtherBills) triggerRefreshOtherBills();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update other bill');
    }
  };

  const handleEditPayment = async (updatedItem) => {
    try {
      await updatePayment(updatedItem.id, updatedItem);
      if (triggerRefreshPayments) triggerRefreshPayments();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update payment');
    }
  };

  const handleEditUser = async (updatedItem) => {
    try {
      await updateUser(updatedItem.id, updatedItem);
      if (triggerRefreshUsers) triggerRefreshUsers();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (item) => {
    try {
      await deleteUser(item.id);
      if (triggerRefreshUsers) triggerRefreshUsers();
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to delete user');
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      switch (activeSection) {
        case 'Academic Years':
          await createAcademicYear(formData);
          if (triggerRefreshAcademicYears) triggerRefreshAcademicYears();
          break;
        case 'Students':
          await createStudent(formData);
          if (triggerRefreshStudents) triggerRefreshStudents();
          break;
        case 'Departments':
          await createDepartment(formData);
          if (triggerRefreshDepartments) triggerRefreshDepartments();
          break;
        case 'Classes':
          await createClass(formData);
          if (triggerRefreshClasses) triggerRefreshClasses();
          break;
        case 'Academic Periods':
          await createAcademicPeriod(formData);
          if (triggerRefreshAcademicPeriods) triggerRefreshAcademicPeriods();
          break;
        case 'School Fees':
          await createSchoolFee(formData);
          if (triggerRefreshSchoolFees) triggerRefreshSchoolFees();
          break;
        case 'Exam Fees':
          await createExamFee(formData);
          if (triggerRefreshExamFees) triggerRefreshExamFees();
          break;
        case 'Other Bills':
          await createOtherBill(formData);
          if (triggerRefreshOtherBills) triggerRefreshOtherBills();
          break;
        case 'Payments':
          await createPayment(formData);
          if (triggerRefreshPayments) triggerRefreshPayments();
          break;
        case 'Users':
          await createUser(formData);
          if (triggerRefreshUsers) triggerRefreshUsers();
          break;
        default:
          throw new Error('Invalid section');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to add item');
    }
  };

  const handleImport = async (file) => {
    setImporting(true);
    setImportResult({ success: 0, failed: 0, errors: [] });
    
    try {
      // Implementation of import logic
      // This is just a placeholder - implement actual import logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setImportResult({ success: 5, failed: 0, errors: [] });
    } catch (error) {
      setImportResult({ success: 0, failed: 1, errors: [error.message] });
    } finally {
      setImporting(false);
    }
  };

  const handleExport = (isTemplate = false) => {
    // Implementation of export logic
    // This is just a placeholder - implement actual export logic
    const data = isTemplate ? [] : paginatedData;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeSection);
    const fileName = `${activeSection}${isTemplate ? '_template' : ''}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="flex-1 flex flex-col md:ml-0">
      <TopBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        setSidebarOpen={setSidebarOpen}
        onAddNew={handleAddNew}
        activeSection={activeSection}
      />
      <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow">
          <DataTable 
            activeSection={activeSection} 
            data={paginatedData} 
            onEdit={(item) => {
              switch (activeSection) {
                case 'Academic Years':
                  handleEditAcademicYear(item);
                  break;
                case 'Students':
                  handleEditStudent(item);
                  break;
                case 'Departments':
                  handleEditDepartment(item);
                  break;
                case 'Classes':
                  handleEditClass(item);
                  break;
                case 'Academic Periods':
                  handleEditAcademicPeriod(item);
                  break;
                case 'School Fees':
                  handleEditSchoolFee(item);
                  break;
                case 'Exam Fees':
                  handleEditExamFee(item);
                  break;
                case 'Other Bills':
                  handleEditOtherBill(item);
                  break;
                case 'Payments':
                  handleEditPayment(item);
                  break;
                case 'Users':
                  handleEditUser(item);
                  break;
                default:
                  onEdit(item);
              }
            }} 
            onDelete={(item) => {
              switch (activeSection) {
                case 'Academic Years':
                  handleEditAcademicYear(item);
                  break;
                case 'Students':
                  handleEditStudent(item);
                  break;
                case 'Departments':
                  handleEditDepartment(item);
                  break;
                case 'Classes':
                  handleEditClass(item);
                  break;
                case 'Academic Periods':
                  handleEditAcademicPeriod(item);
                  break;
                case 'School Fees':
                  handleEditSchoolFee(item);
                  break;
                case 'Exam Fees':
                  handleEditExamFee(item);
                  break;
                case 'Other Bills':
                  handleEditOtherBill(item);
                  break;
                case 'Payments':
                  handleEditPayment(item);
                  break;
                case 'Users':
                  handleDeleteUser(item);
                  break;
                default:
                  onDelete(item);
              }
            }}
            onUpdate={(updatedItem) => {
              switch (activeSection) {
                case 'Academic Years':
                  handleEditAcademicYear(updatedItem);
                  break;
                case 'Students':
                  handleEditStudent(updatedItem);
                  break;
                case 'Departments':
                  handleEditDepartment(updatedItem);
                  break;
                case 'Classes':
                  handleEditClass(updatedItem);
                  break;
                case 'Academic Periods':
                  handleEditAcademicPeriod(updatedItem);
                  break;
                case 'School Fees':
                  handleEditSchoolFee(updatedItem);
                  break;
                case 'Exam Fees':
                  handleEditExamFee(updatedItem);
                  break;
                case 'Other Bills':
                  handleEditOtherBill(updatedItem);
                  break;
                case 'Payments':
                  handleEditPayment(updatedItem);
                  break;
                case 'Users':
                  handleEditUser(updatedItem);
                  break;
                default:
                  console.warn('No update handler for section:', activeSection);
              }
            }}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white">
        <BottomControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onFilter={onFilter}
        />
      </div>

      {/* Modals */}
      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        section={activeSection}
      />

      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onDownloadTemplate={() => handleExport(true)}
        onImport={handleImport}
        importing={importing}
        importResult={importResult}
        activeSection={activeSection}
        acceptedFileTypes={['.xlsx', '.csv']}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilter={handleApplyFilter}
        activeSection={activeSection}
      />
    </div>
  );
};

export default MainContent;