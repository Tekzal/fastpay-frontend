import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import IndividualFilters from './IndividualFilters';
import IndividualTable from './IndividualTable';
import { getStudents, getClassDetails, getRequiredSchoolFee, getPaymentHistory, getAcademicPeriods, getClasses, getDepartments, getSchoolFees, getExamFees, getOtherBills, getAcademicPeriodDetails } from '../../services/api';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;

const IndividualReport = () => {
  const [filters, setFilters] = useState({});
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [pdfError, setPdfError] = useState(null);
  const [feeTypeOptions] = useState([
    { value: 'school', label: 'School Fees' },
    { value: 'exam', label: 'Exam Fees' },
    { value: 'other', label: 'Other Bills' }
  ]);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [periodEndDate, setPeriodEndDate] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const periodsData = await getAcademicPeriods();
        const sortedPeriods = periodsData.sort((a, b) => b.id - a.id);
        setPeriodOptions(sortedPeriods.map(p => ({ value: p.id, label: p.name })));
        setError(null);
      } catch (err) {
        setError('Failed to fetch filter options.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchPeriodDetails = async () => {
      if (!filters.periodId) {
        setPeriodStartDate(null);
        setPeriodEndDate(null);
        return;
      }
      try {
        const details = await getAcademicPeriodDetails(filters.periodId);
        setPeriodStartDate(details.start_date);
        setPeriodEndDate(details.end_date);
      } catch {
        setPeriodStartDate(null);
        setPeriodEndDate(null);
      }
    };
    fetchPeriodDetails();
  }, [filters.periodId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!filters.periodId || !filters.feeType) {
        setStudentsData([]);
        return;
      }
      setLoading(true);
      try {
        const period = filters.periodId;
        const feeTypeKind = filters.feeType;
        const students = await getStudents();
        const data = await Promise.all(students.map(async (student) => {
          let classDetails = { name: 'Unknown', department_id: undefined };
          try {
            if (student.class_id) {
              classDetails = await getClassDetails(student.class_id);
            }
          } catch {}
          const name = [student.first_name, student.middle_name, student.last_name].filter(Boolean).join(' ');
          let requiredAmount = 0;
          try {
            if (feeTypeKind === 'school') {
              const rawSchoolFeeData = await getRequiredSchoolFee(student.class_id, period);
              const schoolFeeData = Array.isArray(rawSchoolFeeData) ? rawSchoolFeeData[0] : rawSchoolFeeData;
              requiredAmount = schoolFeeData?.required_amount || 0;
            } else if (feeTypeKind === 'exam') {
              // You may need to implement getRequiredExamFee per class/period
              requiredAmount = 0;
            } else if (feeTypeKind === 'other') {
              requiredAmount = 0;
            }
          } catch {}
          let totalPayment = 0;
          try {
            let feeTypeName = '';
            if (feeTypeKind === 'school') feeTypeName = 'School Fees';
            else if (feeTypeKind === 'exam') feeTypeName = 'Exam Fees';
            else if (feeTypeKind === 'other') feeTypeName = 'Other Bills';
            const paymentHistory = await getPaymentHistory(student.id, feeTypeName, period);
            totalPayment = paymentHistory.reduce((sum, p) => sum + (p.invoice_amount || 0), 0);
          } catch {}
          const amountOwed = requiredAmount - totalPayment;
          const percentage = requiredAmount > 0 ? Math.round((totalPayment / requiredAmount) * 100) : 0;
          let status = 'Not Paid';
          if (percentage === 100) status = 'Fully Paid';
          else if (percentage >= 50) status = 'Almost Paid';
          else if (percentage >= 1) status = 'Partially Paid';
          return {
            id: student.id,
            name,
            required: requiredAmount,
            paid: totalPayment,
            owed: amountOwed,
            percentage,
            status,
            class: classDetails.name,
            class_id: student.class_id,
            department_id: student.department_id,
            created_at: student.created_at,
          };
        }));
        setStudentsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch report data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters.periodId, filters.feeType]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [classes, departments] = await Promise.all([
          getClasses(),
          getDepartments()
        ]);
        setClassOptions(classes);
        setDepartmentOptions(departments);
      } catch {}
    };
    fetchOptions();
  }, []);

  const filteredData = studentsData.filter(student => {
    if (filters.fromDate && student.created_at < filters.fromDate) return false;
    if (filters.toDate && student.created_at > filters.toDate) return false;
    if (filters.classId && String(student.class_id) !== String(filters.classId)) return false;
    if (filters.departmentId && String(student.department_id) !== String(filters.departmentId)) return false;
    if (filters.paidBelow && student.percentage >= Number(filters.paidBelow)) return false;
    if (filters.paidGte && student.percentage < Number(filters.paidGte)) return false;
    if (filters.status && student.status !== filters.status) return false;
    return true;
  });

  const handleDownloadPDF = () => {
    setPdfError(null);
    try {
      if (!filteredData.length) {
        setPdfError('No data to export.');
        return;
      }
      // Build filter summary
      const periodLabel = periodOptions.find(p => p.value === filters.periodId)?.label || 'All';
      const feeTypeLabel = feeTypeOptions.find(f => f.value === filters.feeType)?.label || 'All';
      const classLabel = classOptions.find(c => String(c.id) === String(filters.classId))?.name || 'All';
      const departmentLabel = departmentOptions.find(d => String(d.id) === String(filters.departmentId))?.name || 'All';
      const statusLabel = filters.status || 'All';
      const fromDate = filters.fromDate || 'Not set';
      const toDate = filters.toDate || 'Not set';
      const filterSummary = [
        `Period: ${periodLabel}`,
        `Fee Type: ${feeTypeLabel}`,
        `From Date: ${fromDate}`,
        `To Date: ${toDate}`,
        `Class: ${classLabel}`,
        `Department: ${departmentLabel}`,
        `Status: ${statusLabel}`
      ];
      const docDefinition = {
        content: [
          {
            columns: [
              [
                { text: 'Purley Oaks School', style: 'title' },
                { text: 'Individual Student Payments Report', style: 'header' }
              ]
            ],
            margin: [0, 0, 0, 10]
          },
          { text: `Generated: ${new Date().toLocaleString()}`, style: 'subheader', margin: [0, 0, 0, 10] },
          { text: 'Report Filters', style: 'subheader', margin: [0, 10, 0, 4] },
          { ul: filterSummary, margin: [0, 0, 0, 10], fontSize: 10 },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*', '*', '*', '*'],
              body: [
                [
                  { text: 'Student Name', style: 'tableHeader' },
                  { text: 'Student ID', style: 'tableHeader' },
                  { text: 'Required Amount', style: 'tableHeader' },
                  { text: 'Total Payment', style: 'tableHeader' },
                  { text: 'Amount Owed', style: 'tableHeader' },
                  { text: '% Paid', style: 'tableHeader' },
                  { text: 'Status', style: 'tableHeader' }
                ],
                ...filteredData.map((row, idx) => [
                  { text: row.name, fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: row.id, fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: `GHS ${row.required.toLocaleString()}.00`, alignment: 'right', fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: `GHS ${row.paid.toLocaleString()}.00`, alignment: 'right', fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: `GHS ${row.owed.toLocaleString()}.00`, alignment: 'right', fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: `${row.percentage}%`, alignment: 'center', fillColor: idx % 2 === 0 ? '#f3f4f6' : null },
                  { text: row.status, fillColor: idx % 2 === 0 ? '#f3f4f6' : null }
                ])
              ]
            },
            layout: {
              fillColor: (rowIndex) => (rowIndex === 0 ? '#312e81' : null),
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#e5e7eb',
              vLineColor: () => '#e5e7eb'
            }
          }
        ],
        styles: {
          title: { fontSize: 18, bold: true, margin: [10, 0, 0, 0], color: '#312e81' },
          header: { fontSize: 14, bold: true, margin: [0, 0, 0, 4], color: '#312e81' },
          subheader: { fontSize: 10, margin: [0, 0, 0, 10] },
          tableHeader: { bold: true, color: 'white', fillColor: '#312e81', fontSize: 11, alignment: 'center' }
        },
        footer: function(currentPage, pageCount) {
          return {
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: 'right',
            margin: [0, 0, 40, 0],
            fontSize: 9,
            color: '#888'
          };
        }
      };
      pdfMake.createPdf(docDefinition).download('student-payments-report.pdf');
    } catch (err) {
      setPdfError('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <IndividualFilters
        filters={filters}
        setFilters={setFilters}
        classOptions={classOptions}
        departmentOptions={departmentOptions}
        feeTypeOptions={feeTypeOptions}
        periodOptions={periodOptions}
        periodStartDate={periodStartDate}
        periodEndDate={periodEndDate}
      />
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
          onClick={handleDownloadPDF}
          disabled={loading || !filteredData.length}
        >
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </div>
      {pdfError && (
        <div className="text-center text-red-600 mb-4">{pdfError}</div>
      )}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report data...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <IndividualTable data={filteredData} />
      )}
    </div>
  );
};

export default IndividualReport; 