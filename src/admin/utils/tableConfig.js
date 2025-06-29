// Table Configuration Helper
const getTableConfig = (section) => {
  const config = {
    Students: {
      headers: [
        'id',
        'first_name',
        'middle_name',
        'last_name',
        'parent_contact',
        'date_of_birth',
        'address',
        'department_id',
        'class_id',
        'enrollment_date',
        'status',
        'new_admission',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.first_name,
        item.middle_name || 'N/A',
        item.last_name,
        item.parent_contact || 'N/A',
        item.date_of_birth,
        item.address || 'N/A',
        item.department_id,
        item.class_id,
        item.enrollment_date,
        item.status,
        item.new_admission ? 'Yes' : 'No',
        item.created_at,
        item.updated_at
      ]
    },
    Departments: {
      headers: [
        'id',
        'name',
        'description',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.name,
        item.description || 'N/A',
        item.created_at,
        item.updated_at
      ]
    },
    Classes: {
      headers: [
        'id',
        'name',
        'department_id',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.name,
        item.department_id,
        item.created_at,
        item.updated_at
      ]
    },
    'Academic Years': {
      headers: [
        'id',
        'name',
        'from_date',
        'to_date',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.name,
        item.from_date,
        item.to_date,
        item.created_at,
        item.updated_at
      ]
    },
    'Academic Periods': {
      headers: [
        'id',
        'term',
        'academic_year_id',
        'from_date',
        'to_date',
        'holidays',
        'planned_event_dates',
        'exams_from',
        'exams_to',
        'vacation_date',
        'period_status',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.term,
        item.academic_year_id,
        item.from_date,
        item.to_date,
        Array.isArray(item.holidays) ? item.holidays.join(', ') : 'None',
        Array.isArray(item.planned_event_dates) ? item.planned_event_dates.join(', ') : 'None',
        item.exams_from || 'N/A',
        item.exams_to || 'N/A',
        item.vacation_date || 'N/A',
        item.period_status || 'N/A',
        item.created_at,
        item.updated_at
      ]
    },
    'School Fees': {
      headers: [
        'id',
        'department_id',
        'class_id',
        'academic_period_id',
        'required_amount',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.department_id,
        item.class_id,
        item.academic_period_id,
        item.required_amount,
        item.created_at,
        item.updated_at
      ]
    },
    'Exam Fees': {
      headers: [
        'id',
        'department_id',
        'class_id',
        'academic_period_id',
        'required_amount',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.department_id,
        item.class_id,
        item.academic_period_id,
        item.required_amount,
        item.created_at,
        item.updated_at
      ]
    },
    'Other Bills': {
      headers: [
        'id',
        'name',
        'description',
        'academic_period_id',
        'required_amount',
        'student_id',
        'class_id',
        'department_id',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.name,
        item.description || 'N/A',
        item.academic_period_id,
        item.required_amount,
        item.student_id || 'N/A',
        item.class_id || 'N/A',
        item.department_id || 'N/A',
        item.created_at,
        item.updated_at
      ]
    },
    Payments: {
      headers: [
        'id',
        'student_id',
        'fee_type',
        'fee_bracket',
        'payment_method',
        'payment_made_by',
        'contact_of_person_paying',
        'invoice_amount',
        'notes',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.student_id,
        item.fee_type,
        item.fee_bracket || 'N/A',
        item.payment_method,
        item.payment_made_by || 'N/A',
        item.contact_of_person_paying || 'N/A',
        item.invoice_amount,
        item.notes || 'N/A',
        item.created_at,
        item.updated_at
      ]
    },
    'Users': {
      headers: [
        'id',
        'username',
        'email',
        'role',
        'is_active',
        'created_at',
        'updated_at',
        'actions'
      ],
      getRowData: (item) => [
        item.id,
        item.username,
        item.email,
        item.role,
        item.is_active ? 'Yes' : 'No',
        item.created_at,
        item.updated_at
      ]
    }
  };

  return config[section] || null;
};

export default getTableConfig;