import { useState, useEffect, useCallback } from 'react';
import { getAcademicYears, getStudents, getDepartments, getClasses, getAcademicPeriods, getSchoolFees, getExamFees, getOtherBills, getPayments, getUsers, createUser, updateUser, deleteUser } from '../../services/api';

// Custom Hook for Dashboard Logic
const useDashboard = () => {
  const [activeSection, setActiveSection] = useState('Students');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [academicYears, setAcademicYears] = useState([]);
  const [refreshAcademicYears, setRefreshAcademicYears] = useState(0);
  const [students, setStudents] = useState([]);
  const [refreshStudents, setRefreshStudents] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [refreshDepartments, setRefreshDepartments] = useState(0);
  const [classes, setClasses] = useState([]);
  const [refreshClasses, setRefreshClasses] = useState(0);
  const [academicPeriods, setAcademicPeriods] = useState([]);
  const [refreshAcademicPeriods, setRefreshAcademicPeriods] = useState(0);
  const [schoolFees, setSchoolFees] = useState([]);
  const [refreshSchoolFees, setRefreshSchoolFees] = useState(0);
  const [examFees, setExamFees] = useState([]);
  const [refreshExamFees, setRefreshExamFees] = useState(0);
  const [otherBills, setOtherBills] = useState([]);
  const [refreshOtherBills, setRefreshOtherBills] = useState(0);
  const [payments, setPayments] = useState([]);
  const [refreshPayments, setRefreshPayments] = useState(0);
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(0);

  const toggleMenu = (itemName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const fetchAcademicYears = useCallback(async () => {
    try {
      const data = await getAcademicYears();
      setAcademicYears(data);
    } catch (err) {
      console.error('Error fetching academic years:', err);
      setAcademicYears([]);
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setStudents([]);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setDepartments([]);
    }
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setClasses([]);
    }
  }, []);

  const fetchAcademicPeriods = useCallback(async () => {
    try {
      const data = await getAcademicPeriods();
      setAcademicPeriods(data);
    } catch (err) {
      console.error('Error fetching academic periods:', err);
      setAcademicPeriods([]);
    }
  }, []);

  const fetchSchoolFees = useCallback(async () => {
    try {
      const data = await getSchoolFees();
      setSchoolFees(data);
    } catch (err) {
      console.error('Error fetching school fees:', err);
      setSchoolFees([]);
    }
  }, []);

  const fetchExamFees = useCallback(async () => {
    try {
      const data = await getExamFees();
      setExamFees(data);
    } catch (err) {
      console.error('Error fetching exam fees:', err);
      setExamFees([]);
    }
  }, []);

  const fetchOtherBills = useCallback(async () => {
    try {
      const data = await getOtherBills();
      setOtherBills(data);
    } catch (err) {
      console.error('Error fetching other bills:', err);
      setOtherBills([]);
    }
  }, []);

  const fetchPayments = useCallback(async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setPayments([]);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    if (activeSection === 'Academic Years') {
      fetchAcademicYears();
    }
    if (activeSection === 'Students') {
      fetchStudents();
    }
    if (activeSection === 'Departments') {
      fetchDepartments();
    }
    if (activeSection === 'Classes') {
      fetchClasses();
    }
    if (activeSection === 'Academic Periods') {
      fetchAcademicPeriods();
    }
    if (activeSection === 'School Fees') {
      fetchSchoolFees();
    }
    if (activeSection === 'Exam Fees') {
      fetchExamFees();
    }
    if (activeSection === 'Other Bills') {
      fetchOtherBills();
    }
    if (activeSection === 'Payments') {
      fetchPayments();
    }
    if (activeSection === 'Users') {
      fetchUsers();
    }
  }, [activeSection, fetchAcademicYears, fetchStudents, fetchDepartments, fetchClasses, refreshAcademicYears, refreshStudents, refreshDepartments, refreshClasses, refreshAcademicPeriods, refreshSchoolFees, refreshExamFees, refreshOtherBills, refreshPayments, fetchUsers, refreshUsers]);

  let currentData = [];
  if (activeSection === 'Academic Years') currentData = academicYears;
  if (activeSection === 'Students') currentData = students;
  if (activeSection === 'Departments') currentData = departments;
  if (activeSection === 'Classes') currentData = classes;
  if (activeSection === 'Academic Periods') currentData = academicPeriods;
  if (activeSection === 'School Fees') currentData = schoolFees;
  if (activeSection === 'Exam Fees') currentData = examFees;
  if (activeSection === 'Other Bills') currentData = otherBills;
  if (activeSection === 'Payments') currentData = payments;
  if (activeSection === 'Users') currentData = users;

  // Apply filters first
  const filteredByFields = currentData.filter(item => {
    return Object.entries(activeFilters).every(([field, value]) => {
      if (value === undefined || value === '') return true;
      
      const itemValue = item[field];
      if (itemValue === undefined) return false;

      // Handle different types of comparisons
      if (typeof value === 'boolean') {
        return itemValue === value;
      }
      if (typeof value === 'number') {
        return itemValue === value;
      }
      if (value instanceof Date) {
        const itemDate = new Date(itemValue);
        return itemDate.toISOString().split('T')[0] === value.toISOString().split('T')[0];
      }
      // Default string comparison
      return itemValue.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  });

  // Then apply search term
  const filteredData = filteredByFields.filter(item => 
    Object.values(item).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when section, search, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, searchTerm, activeFilters]);

  // Action handlers
  const handleEdit = (item) => {
    console.log('Edit item:', item);
    // Implement edit logic here
  };

  const handleDelete = (item) => {
    console.log('Delete item:', item);
    // Implement delete logic here
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilter = (filters) => {
    setActiveFilters(filters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const triggerRefreshAcademicYears = () => setRefreshAcademicYears(prev => prev + 1);
  const triggerRefreshStudents = () => setRefreshStudents(prev => prev + 1);
  const triggerRefreshDepartments = () => setRefreshDepartments(prev => prev + 1);
  const triggerRefreshClasses = () => setRefreshClasses(prev => prev + 1);
  const triggerRefreshAcademicPeriods = () => setRefreshAcademicPeriods(prev => prev + 1);
  const triggerRefreshSchoolFees = () => setRefreshSchoolFees(prev => prev + 1);
  const triggerRefreshExamFees = () => setRefreshExamFees(prev => prev + 1);
  const triggerRefreshOtherBills = () => setRefreshOtherBills(prev => prev + 1);
  const triggerRefreshPayments = () => setRefreshPayments(prev => prev + 1);
  const triggerRefreshUsers = () => setRefreshUsers(prev => prev + 1);

  return {
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
    triggerRefreshUsers,
  };
};

export default useDashboard;