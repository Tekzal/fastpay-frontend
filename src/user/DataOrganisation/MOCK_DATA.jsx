// Mock Data
const MOCK_DATA = {
    students: [
      { id: 1, name: 'Kwame Asante', class: 'JHS 2A', studentId: 'STU001', newAdmission: false },
      { id: 2, name: 'Ama Osei', class: 'JHS 1B', studentId: 'STU002', newAdmission: true },
      { id: 3, name: 'Kofi Mensah', class: 'JHS 3A', studentId: 'STU003', newAdmission: false },
      { id: 4, name: 'Akosua Gyasi', class: 'JHS 2B', studentId: 'STU004', newAdmission: false },
      { id: 5, name: 'Yaw Boateng', class: 'JHS 1A', studentId: 'STU005', newAdmission: true },
    ],
    paymentTypes: [
      { type: 'School Fees', required: 1200.00, paid: 800.00, owed: 400.00 },
      { type: 'Exam Fees', required: 300.00, paid: 300.00, owed: 0.00 },
      { type: 'Other Bills', required: 150.00, paid: 50.00, owed: 100.00 },
      { type: 'Uniform Fees', required: 200.00, paid: 0.00, owed: 200.00 },
      { type: 'Sports Equipment', required: 80.00, paid: 80.00, owed: 0.00 },
    ],
    todaysPayments: [
      { 
        id: 1,
        fee_type: 'School Fees', 
        invoice_amount: 500.00, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 2,
        fee_type: 'Other Bills', 
        invoice_amount: 20.00, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 3,
        fee_type: 'Exam Fees', 
        invoice_amount: 250.00, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ],
    paymentHistory: [
      { 
        id: 1,
        fee_type: 'School Fees',
        invoice_amount: 500.00, 
        payment_method: 'Mobile Money', 
        notes: 'MTN-12345',
        created_at: '2024-06-08T10:30:00.000Z',
        updated_at: '2024-06-08T10:30:00.000Z'
      },
      { 
        id: 2,
        fee_type: 'Exam Fees',
        invoice_amount: 300.00, 
        payment_method: 'Cash', 
        notes: 'Cash Payment',
        created_at: '2024-06-05T14:15:00.000Z',
        updated_at: '2024-06-05T14:15:00.000Z'
      },
      { 
        id: 3,
        fee_type: 'Other Bills',
        invoice_amount: 200.00, 
        payment_method: 'Bank Transfer', 
        notes: 'TXN-67890',
        created_at: '2024-06-01T09:45:00.000Z',
        updated_at: '2024-06-01T09:45:00.000Z'
      },
    ]
  };

  export default MOCK_DATA;