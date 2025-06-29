// Sample Data Module
const sampleData = {
    Dashboard: [],
    Students: [
      {
        id: 1,
        first_name: 'John',
        middle_name: null,
        last_name: 'Doe',
        parent_contact: '+1234567890',
        date_of_birth: '2000-01-01',
        address: '123 Main St',
        department_id: 1,
        class_id: 1,
        enrollment_date: '2023-09-01',
        status: 'active',
        new_admission: false,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 2,
        first_name: 'Jane',
        middle_name: 'Marie',
        last_name: 'Smith',
        parent_contact: '+1234567891',
        date_of_birth: '2000-02-01',
        address: '456 Oak St',
        department_id: 1,
        class_id: 2,
        enrollment_date: '2023-09-01',
        status: 'active',
        new_admission: true,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    Departments: [
      {
        id: 1,
        name: 'Mathematics',
        description: 'Mathematics Department',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Science',
        description: 'Science Department',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    Classes: [
      {
        id: 1,
        name: 'Class 10-A',
        department_id: 1,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Class 11-B',
        department_id: 2,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    'Academic Years': [
      {
        id: 1,
        name: '2024-2025',
        from_date: '2024-09-01',
        to_date: '2025-06-30',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 2,
        name: '2023-2024',
        from_date: '2023-09-01',
        to_date: '2024-06-30',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    'Academic Periods': [
      {
        id: 1,
        term: 'First Semester',
        academic_year_id: 1,
        from_date: '2024-09-01',
        to_date: '2024-12-31',
        holidays: ['2024-10-31', '2024-11-25'],
        planned_event_dates: ['2024-10-15', '2024-11-15'],
        exams_from: '2024-12-01',
        exams_to: '2024-12-15',
        vacation_date: '2024-12-16',
        period_status: 'current',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    'School Fees': [
      {
        id: 1,
        department_id: 1,
        class_id: 1,
        academic_period_id: 1,
        required_amount: 1200.00,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    'Exam Fees': [
      {
        id: 1,
        department_id: 1,
        class_id: 1,
        academic_period_id: 1,
        required_amount: 50.00,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    'Other Bills': [
      {
        id: 1,
        name: 'Library Fee',
        description: 'Annual library fee',
        academic_period_id: 1,
        required_amount: 25.00,
        student_id: 1,
        class_id: 1,
        department_id: 1,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    Payments: [
      {
        id: 1,
        student_id: 1,
        fee_type: 'school_fee',
        fee_bracket: 'regular',
        payment_method: 'credit_card',
        payment_made_by: 'Parent',
        contact_of_person_paying: '+1234567890',
        invoice_amount: 1200.00,
        notes: 'First semester payment',
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ],
    Users: [
      {
        id: 1,
        username: 'adminuser',
        email: 'admin@example.com',
        role: 'admin',
        is_active: true,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 2,
        username: 'manager1',
        email: 'manager@example.com',
        role: 'manager',
        is_active: true,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      },
      {
        id: 3,
        username: 'cashier1',
        email: 'cashier@example.com',
        role: 'cashier',
        is_active: false,
        created_at: '2023-09-01T00:00:00Z',
        updated_at: '2023-09-01T00:00:00Z'
      }
    ]
  };

export { sampleData };