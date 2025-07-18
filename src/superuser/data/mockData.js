export const DASHBOARD_DATA = {
  stats: {
    freemiumUsers: 2847,
    paidUsers: 1523,
    enrolledStudents: 15234,
    effectiveStudents: 12847,
    totalEarnings: 2450000,
    monthlyGrowth: 12.5,
    yearlyGrowth: 28.7
  },
  earningsByTerm: [
    { term: 'Term 1', earnings: 850000, students: 4200 },
    { term: 'Term 2', earnings: 920000, students: 4500 },
    { term: 'Term 3', earnings: 680000, students: 3800 }
  ],
  earningsByYear: [
    { year: '2020', earnings: 1200000 },
    { year: '2021', earnings: 1650000 },
    { year: '2022', earnings: 2100000 },
    { year: '2023', earnings: 2450000 },
    { year: '2024', earnings: 2850000 }
  ],
  earningsByMonth: [
    { month: 'Jan', earnings: 180000 },
    { month: 'Feb', earnings: 195000 },
    { month: 'Mar', earnings: 220000 },
    { month: 'Apr', earnings: 205000 },
    { month: 'May', earnings: 240000 },
    { month: 'Jun', earnings: 265000 },
    { month: 'Jul', earnings: 285000 },
    { month: 'Aug', earnings: 275000 },
    { month: 'Sep', earnings: 290000 },
    { month: 'Oct', earnings: 310000 },
    { month: 'Nov', earnings: 295000 },
    { month: 'Dec', earnings: 315000 }
  ],
  userDistribution: [
    { name: 'Freemium', value: 2847, color: '#3b82f6' },
    { name: 'Paid', value: 1523, color: '#10b981' }
  ]
};

export const mockPlansData = [
  {
    id: 1,
    plan_name: 'Basic',
    description: 'Perfect for small schools',
    student_limit: 100,
    price_per_student: 15.00,
    student_buffer: 10,
    expiry_buffer: 7,
    maximum_users: 5,
    billing_cycle: 'termly'
  },
  {
    id: 2,
    plan_name: 'Professional',
    description: 'Ideal for medium schools',
    student_limit: 500,
    price_per_student: 12.00,
    student_buffer: 25,
    expiry_buffer: 14,
    maximum_users: 15,
    billing_cycle: 'termly'
  },
  {
    id: 3,
    plan_name: 'Enterprise',
    description: 'For large institutions',
    student_limit: 2000,
    price_per_student: 8.00,
    student_buffer: 100,
    expiry_buffer: 30,
    maximum_users: 50,
    billing_cycle: 'yearly'
  }
];

export const mockCalendarData = [
  {
    id: 1,
    year: 2024,
    term: 1,
    start_date: '2024-01-15',
    end_date: '2024-04-15'
  },
  {
    id: 2,
    year: 2024,
    term: 2,
    start_date: '2024-05-01',
    end_date: '2024-08-15'
  },
  {
    id: 3,
    year: 2024,
    term: 3,
    start_date: '2024-09-01',
    end_date: '2024-12-15'
  }
];

export const mockOfferCodesData = [
  {
    id: 1,
    code: 'NEW2024',
    start_term: 1,
    end_term: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    code: 'SAVE20',
    start_term: 2,
    end_term: 2,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z'
  }
];
