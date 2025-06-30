import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Attach JWT token if present
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const getStudents = async (params = {}) => {
  try {
    const response = await api.get('/students/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudent = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/students/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await api.put(`/students/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const response = await api.delete(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const getStudentSchoolFees = async (studentId, academicPeriodId) => {
  try {
    const response = await api.get(`/summary/${studentId}/${academicPeriodId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student fees:', error);
    throw error;
  }
};

export const getStudentExamFees = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}/exam-fees/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student exam fees:', error);
    throw error;
  }
};

export const getStudentOtherBills = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}/other-bills/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student other bills:', error);
    throw error;
  }
};

export const getRequiredSchoolFee = async (classId, academicPeriodId) => {
  try {
    const response = await api.get('/fees/schoolfees/', {
      params: { class_id: classId, academic_period_id: academicPeriodId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching required school fee:', error);
    throw error;
  }
};

export const getRequiredExamFee = async (classId, academicPeriodId) => {
  try {
    const response = await api.get('/fees/examfees/', {
      params: { class_id: classId, academic_period_id: academicPeriodId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching required exam fee:', error);
    throw error;
  }
};

export const getSchoolFeePaymentSummary = async (studentId, academicPeriodId, feeType = 'schoolFees') => {
  try {
    const response = await api.get(`/payments/summary/${studentId}/${academicPeriodId}`, {
      params: { fee_type: feeType }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching school fee payment summary:', error);
    throw error;
  }
};

export const getAcademicPeriods = async (params = {}) => {
  try {
    const response = await api.get('/academic/periods/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching academic periods:', error);
    throw error;
  }
};

export const getAcademicPeriod = async (periodId) => {
  try {
    const response = await api.get(`/academic/periods/${periodId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching academic period:', error);
    throw error;
  }
};

export const createAcademicPeriod = async (periodData) => {
  try {
    const response = await api.post('/academic/periods/', periodData);
    return response.data;
  } catch (error) {
    console.error('Error creating academic period:', error);
    throw error;
  }
};

export const updateAcademicPeriod = async (periodId, periodData) => {
  try {
    const response = await api.put(`/academic/periods/${periodId}`, periodData);
    return response.data;
  } catch (error) {
    console.error('Error updating academic period:', error);
    throw error;
  }
};

export const deleteAcademicPeriod = async (periodId) => {
  try {
    const response = await api.delete(`/academic/periods/${periodId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting academic period:', error);
    throw error;
  }
};

export const getAllOtherBills = async () => {
  try {
    const response = await api.get('/fees/otherbills/');
    return response.data;
  } catch (error) {
    console.error('Error fetching other bills:', error);
    throw error;
  }
};

export const getClassDetails = async (classId) => {
  try {
    const response = await api.get(`/classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class details:', error);
    throw error;
  }
};

export const createOtherBill = async (billData) => {
  try {
    const response = await api.post('/fees/otherbills/', billData);
    return response.data;
  } catch (error) {
    console.error('Error creating other bill:', error);
    throw error;
  }
};

export const getAcademicPeriodDetails = async (periodId) => {
  try {
    const response = await api.get(`/academic/periods/${periodId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching academic period details:', error);
    throw error;
  }
};

export const getAcademicYearDetails = async (yearId) => {
  try {
    const response = await api.get(`/academic/years/${yearId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching academic year details:', error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    console.log('Sending payment data to API:', paymentData);
    const response = await api.post('/payments/', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    if (error.response) {
      console.error('Server response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Validation errors:', error.response.data.detail);
      if (error.response.data.detail && Array.isArray(error.response.data.detail)) {
        error.response.data.detail.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err);
        });
      }
    }
    throw error;
  }
};

export const getPaymentHistory = async (studentId, feeType, academicPeriodId) => {
  try {
    const response = await api.get('/payments/', {
      params: { 
        student_id: studentId,
        fee_type: feeType,
        academic_period_id: academicPeriodId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};

export const getAllPaymentsForStudent = async (studentId) => {
  try {
    const response = await api.get('/payments/', {
      params: { 
        student_id: studentId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all payments for student:', error);
    throw error;
  }
};

export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await api.put(`/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error updating payment:', error);
    if (error.response) {
      console.error('Server response:', error.response.data);
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};

export const deletePayment = async (paymentId) => {
  try {
    const response = await api.delete(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting payment:', error);
    if (error.response) {
      console.error('Server response:', error.response.data);
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};

export const createAcademicYear = async (yearData) => {
  try {
    const response = await api.post('/academic/years', yearData);
    return response.data;
  } catch (error) {
    console.error('Error creating academic year:', error);
    throw error;
  }
};

export const getAcademicYears = async (params = {}) => {
  try {
    const response = await api.get('/academic/years/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching academic years:', error);
    throw error;
  }
};

export const updateAcademicYear = async (id, yearData) => {
  try {
    const response = await api.put(`/academic/years/${id}`, yearData);
    return response.data;
  } catch (error) {
    console.error('Error updating academic year:', error);
    throw error;
  }
};

export const deleteAcademicYear = async (id) => {
  try {
    const response = await api.delete(`/academic/years/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting academic year:', error);
    throw error;
  }
};

// DEPARTMENT CRUD
export const getDepartments = async (params = {}) => {
  try {
    const response = await api.get('/departments/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const getDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching department:', error);
    throw error;
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post('/departments/', departmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await api.put(`/departments/${departmentId}`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const response = await api.delete(`/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};

// CLASS CRUD
export const getClasses = async (params = {}) => {
  try {
    const response = await api.get('/classes/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

export const getClass = async (classId) => {
  try {
    const response = await api.get(`/classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class:', error);
    throw error;
  }
};

export const createClass = async (classData) => {
  try {
    const response = await api.post('/classes/', classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await api.put(`/classes/${classId}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    const response = await api.delete(`/classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

// SCHOOL FEE CRUD
export const getSchoolFees = async (params = {}) => {
  try {
    const response = await api.get('/fees/schoolfees/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching school fees:', error);
    throw error;
  }
};

export const getSchoolFee = async (feeId) => {
  try {
    const response = await api.get(`/fees/schoolfees/${feeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school fee:', error);
    throw error;
  }
};

export const createSchoolFee = async (feeData) => {
  try {
    const response = await api.post('/fees/schoolfees/', feeData);
    return response.data;
  } catch (error) {
    console.error('Error creating school fee:', error);
    throw error;
  }
};

export const updateSchoolFee = async (feeId, feeData) => {
  try {
    const response = await api.put(`/fees/schoolfees/${feeId}`, feeData);
    return response.data;
  } catch (error) {
    console.error('Error updating school fee:', error);
    throw error;
  }
};

export const deleteSchoolFee = async (feeId) => {
  try {
    const response = await api.delete(`/fees/schoolfees/${feeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting school fee:', error);
    throw error;
  }
};

// EXAM FEE CRUD
export const getExamFees = async (params = {}) => {
  try {
    const response = await api.get('/fees/examfees/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching exam fees:', error);
    throw error;
  }
};

export const getExamFee = async (feeId) => {
  try {
    const response = await api.get(`/fees/examfees/${feeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam fee:', error);
    throw error;
  }
};

export const createExamFee = async (feeData) => {
  try {
    const response = await api.post('/fees/examfees/', feeData);
    return response.data;
  } catch (error) {
    console.error('Error creating exam fee:', error);
    throw error;
  }
};

export const updateExamFee = async (feeId, feeData) => {
  try {
    const response = await api.put(`/fees/examfees/${feeId}`, feeData);
    return response.data;
  } catch (error) {
    console.error('Error updating exam fee:', error);
    throw error;
  }
};

export const deleteExamFee = async (feeId) => {
  try {
    const response = await api.delete(`/fees/examfees/${feeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting exam fee:', error);
    throw error;
  }
};

// OTHER BILL CRUD
export const getOtherBills = async (params = {}) => {
  try {
    const response = await api.get('/fees/otherbills/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching other bills:', error);
    throw error;
  }
};

export const getOtherBill = async (billId) => {
  try {
    const response = await api.get(`/fees/otherbills/${billId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching other bill:', error);
    throw error;
  }
};

export const updateOtherBill = async (billId, billData) => {
  try {
    const response = await api.put(`/fees/otherbills/${billId}`, billData);
    return response.data;
  } catch (error) {
    console.error('Error updating other bill:', error);
    throw error;
  }
};

export const deleteOtherBill = async (billId) => {
  try {
    const response = await api.delete(`/fees/otherbills/${billId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting other bill:', error);
    throw error;
  }
};

// PAYMENT CRUD
export const getPayments = async (params = {}) => {
  try {
    const response = await api.get('/payments/', { params });
    return Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const getPayment = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
};

// USER CRUD
export const getUsers = async () => {
  try {
    const response = await api.get('/auth/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/auth/users/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/auth/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// AUTHENTICATION
export const login = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = () => {
  // Clear JWT token
  localStorage.removeItem('jwt_token');
  
  // Clear session storage
  sessionStorage.clear();
  
  // Clear any cached data
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Clear any stored user data
  localStorage.removeItem('user');
  localStorage.removeItem('user_role');
  
  // Force page reload to clear any in-memory state
  // This ensures no cached data remains
  window.location.href = '/login';
};

export default api; 