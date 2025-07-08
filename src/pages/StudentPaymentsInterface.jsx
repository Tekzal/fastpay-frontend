import React, { useState, useEffect } from 'react';
import PageLayout from '../user/coreLayout/PageLayout';
import StudentSidebar from '../user/coreLayout/StudentSidebar';
import EmptyState from '../user/coreLayout/EmptyState';
import TopControls from '../user/mainContent/TopControls';
import StudentInfoCard from '../user/mainContent/StudentInfoCard';
import PaymentTypesTable from '../user/mainContent/PaymentTypesTable';
import TodaysPayments from '../user/mainContent/TodaysPayments';
import PaymentRequestModal from '../user/Modal/PaymentRequestModal';
import AddPaymentModal from '../user/Modal/AddPaymentModal';
import PaymentHistoryModal from '../user/Modal/PaymentHistoryModal';
import { getStudents, getStudentExamFees, getStudentOtherBills, getRequiredSchoolFee, getSchoolFeePaymentSummary, getAcademicPeriods, getAllOtherBills, getRequiredExamFee, getPaymentHistory, getAllPaymentsForStudent, getClassDetails } from '../services/api';

// Main App Component
const StudentPaymentsInterface = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [modals, setModals] = useState({
      paymentRequest: false,
      addPayment: false,
      paymentHistory: false
    });
    const [selectedPaymentType, setSelectedPaymentType] = useState(null);
    const [studentFees, setStudentFees] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [todaysPayments, setTodaysPayments] = useState([]);

    // Fetch students on component mount
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const data = await getStudents();
          const studentsWithClass = await Promise.all(data.map(async (student) => {
            if (!student.class) {
              // Handle students without a class
              return {
                ...student,
                class_name: 'Unknown',
                name: [student.first_name, student.middle_name, student.last_name].filter(Boolean).join(' '),
                studentId: student.id
              };
            }
            const classDetails = await getClassDetails(student.class);
            return {
              ...student,
              class_name: classDetails.name,
              name: [student.first_name, student.middle_name, student.last_name].filter(Boolean).join(' '),
              studentId: student.id
            };
          }));
          setStudents(studentsWithClass);
          setError(null);
        } catch (err) {
          setError('Failed to fetch students. Please try again later.');
          console.error('Error fetching students:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchStudents();
    }, []);

    // Fetch student fees when a student is selected
    useEffect(() => {
      const fetchStudentFees = async () => {
        if (!selectedStudent || !selectedPeriod) return;
        console.log('Fetching fees for student:', selectedStudent, 'and period:', selectedPeriod);

        try {
          setLoading(true);
          // Fetch required amount and payment summary for school fees and exam fees
          const [rawSchoolFeeData, schoolFeeHistory, rawExamFeeData, examFeeHistory, allOtherBills] = await Promise.all([
            getRequiredSchoolFee(selectedStudent.class, selectedPeriod),
            getPaymentHistory(selectedStudent.studentId, 'School Fees', selectedPeriod),
            getRequiredExamFee(selectedStudent.class, selectedPeriod), 
            getPaymentHistory(selectedStudent.studentId, 'Exam Fees', selectedPeriod),
            getAllOtherBills()
          ]);

          const schoolPaymentTotal = schoolFeeHistory.reduce((sum, p) => sum + (p.invoice_amount || 0), 0);
          const examPaymentTotal = examFeeHistory.reduce((sum, p) => sum + (p.invoice_amount || 0), 0);

          console.log('API Responses:', { rawSchoolFeeData, schoolFeeHistory, rawExamFeeData, examFeeHistory, allOtherBills });

          const schoolFeeData = Array.isArray(rawSchoolFeeData) ? rawSchoolFeeData[0] : rawSchoolFeeData;
          const examFeeData = Array.isArray(rawExamFeeData) ? rawExamFeeData[0] : rawExamFeeData;

          console.log('Processed fee data:', { schoolFeeData, examFeeData });

          const schoolRequiredAmount = schoolFeeData?.required_amount || 0;
          const examRequiredAmount = examFeeData?.required_amount || 0;

          const schoolFees = [{
            id: 'school-fees',
            name: 'School Fees',
            requiredAmount: schoolRequiredAmount,
            totalPayment: schoolPaymentTotal,
            amountOwed: schoolRequiredAmount - schoolPaymentTotal
          }];

          const examFees = [{
            id: 'exam-fees',
            name: 'Exam Fees',
            requiredAmount: examRequiredAmount,
            totalPayment: examPaymentTotal,
            amountOwed: examRequiredAmount - examPaymentTotal
          }];

          // Debug logging for other bills filtering
          console.log('Debug - Selected Student ID:', selectedStudent.studentId, 'Type:', typeof selectedStudent.studentId);
          console.log('Debug - Selected Period:', selectedPeriod, 'Type:', typeof selectedPeriod);
          console.log('Debug - All Other Bills:', allOtherBills);
          
          // Filter other bills for the selected student and selected period
          const filteredOtherBills = allOtherBills.filter(bill => {
            console.log('Debug - Checking bill:', bill);
            console.log('Debug - Bill student_id:', bill.student_id, 'Type:', typeof bill.student_id);
            console.log('Debug - Bill academic_period_id:', bill.academic_period_id, 'Type:', typeof bill.academic_period_id);
            
            const studentMatch = String(bill.student_id) === String(selectedStudent.studentId);
            const periodMatch = parseInt(bill.academic_period_id) === parseInt(selectedPeriod);
            
            console.log('Debug - Student match:', studentMatch, 'Period match:', periodMatch);
            
            return studentMatch && periodMatch;
          });

          console.log('Debug - Filtered Other Bills:', filteredOtherBills);

          // For each other bill, fetch payment summary
          const otherBillsWithSummary = await Promise.all(filteredOtherBills.map(async (bill) => {
            try {
              const history = await getPaymentHistory(selectedStudent.studentId, bill.name, selectedPeriod);
              const totalPayment = history.reduce((sum, p) => sum + (p.invoice_amount || 0), 0);
              return {
                id: bill.id,
                name: bill.name,
                requiredAmount: bill.required_amount,
                totalPayment: totalPayment,
                amountOwed: bill.required_amount - totalPayment
              };
            } catch (error) {
              console.error(`Error fetching payment summary for ${bill.name}:`, error);
              return {
                id: bill.id,
                name: bill.name,
                requiredAmount: bill.required_amount,
                totalPayment: 0,
                amountOwed: bill.required_amount
              };
            }
          }));

          const finalStudentFees = {
            schoolFees,
            examFees,
            otherBills: otherBillsWithSummary
          };

          console.log('Final data passed to table:', finalStudentFees);

          setStudentFees(finalStudentFees);
          setError(null);
        } catch (err) {
          setError('Failed to fetch student fees. Please try again later.');
          console.error('Error fetching student fees:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchStudentFees();
    }, [selectedStudent, selectedPeriod, refreshTrigger]);

    // Function to refresh student fees data
    const refreshStudentFees = () => {
      setRefreshTrigger(prev => prev + 1);
      // Also refresh today's payments
      fetchTodaysPayments();
    };

    // Function to fetch today's payments
    const fetchTodaysPayments = async () => {
      if (!selectedStudent) return;
      
      try {
        // Fetch all payments for the student and filter for today
        const allPayments = await getAllPaymentsForStudent(selectedStudent.studentId);
        const today = new Date().toDateString();
        const todays = allPayments.filter(payment => {
          if (!payment.created_at) return false;
          const paymentDate = new Date(payment.created_at).toDateString();
          return paymentDate === today;
        });
        setTodaysPayments(todays);
      } catch (err) {
        console.error('Error fetching today\'s payments:', err);
      }
    };

    // Fetch today's payments when student is selected
    useEffect(() => {
      fetchTodaysPayments();
    }, [selectedStudent]);

    // Fetch academic periods on mount
    useEffect(() => {
      const fetchPeriods = async () => {
        try {
          const data = await getAcademicPeriods();
          // Sort by most recent (assuming descending order by id or date)
          const sorted = data.sort((a, b) => b.id - a.id);
          const lastSix = sorted.slice(0, 6);
          setPeriods(lastSix);
          if (lastSix.length > 0) {
            setSelectedPeriod(lastSix[0].id); // Set default to most recent
          }
        } catch (err) {
          console.error('Error fetching periods:', err);
        }
      };
      fetchPeriods();
    }, []);
  
    const toggleModal = (modalName, isOpen = null) => {
      setModals(prev => ({
        ...prev,
        [modalName]: isOpen !== null ? isOpen : !prev[modalName]
      }));
    };
  
    const handleAddPayment = (paymentType) => {
      setSelectedPaymentType(paymentType);
      toggleModal('addPayment', true);
    };
  
    const handleViewHistory = (paymentType) => {
      setSelectedPaymentType(paymentType);
      toggleModal('paymentHistory', true);
    };

    if (loading && !students.length) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading initial data...</p>
          </div>
        </div>
      );
    }

    const sidebarContent = (
      <StudentSidebar
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onClose={() => setSidebarOpen(false)}
      />
    );

    return (
      <PageLayout
        sidebar={sidebarContent}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pageTitle="Student Payments"
      >
        <div className="space-y-6">
          <TopControls
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            onOpenPaymentRequest={() => toggleModal('paymentRequest', true)}
            selectedStudent={selectedStudent}
          />
          
          {selectedStudent ? (
            <>
              <StudentInfoCard student={selectedStudent} />
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading student fees...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
                  <p>{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PaymentTypesTable
                      fees={studentFees}
                      onAddPayment={handleAddPayment}
                      onViewHistory={handleViewHistory}
                    />
                  </div>
                  <div>
                    <TodaysPayments
                      payments={todaysPayments}
                      studentName={selectedStudent.name}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              message="No student selected"
              description="Please select a student from the sidebar to view their payment information."
            />
          )}
        </div>

        {/* Modals */}
        <PaymentRequestModal
          isOpen={modals.paymentRequest}
          onClose={() => toggleModal('paymentRequest', false)}
          student={selectedStudent}
        />
        <AddPaymentModal
          isOpen={modals.addPayment}
          onClose={() => toggleModal('addPayment', false)}
          paymentType={selectedPaymentType}
          student={selectedStudent}
          academicPeriod={selectedPeriod}
          onSuccess={refreshStudentFees}
        />
        <PaymentHistoryModal
          isOpen={modals.paymentHistory}
          onClose={() => toggleModal('paymentHistory', false)}
          paymentType={selectedPaymentType}
          student={selectedStudent}
          academicPeriod={selectedPeriod}
        />
      </PageLayout>
    );
  };
  
  export default StudentPaymentsInterface;