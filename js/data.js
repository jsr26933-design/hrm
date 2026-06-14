/* ===== WorkPilot HR — Mock Data Store ===== */

const WP = {
  currentUser: {
    id: 'EMP001',
    name: 'Arjun Kumar',
    initials: 'AK',
    email: 'arjun.kumar@techcorp.in',
    role: 'HR Administrator',
    department: 'Human Resources',
    company: 'TechCorp India',
    joinDate: '2021-03-15',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    avatar_color: 'linear-gradient(135deg, #2563EB, #7C3AED)'
  },

  companies: [
    { id: 'TC', name: 'TechCorp India', plan: 'Enterprise', employees: 248, active: true },
    { id: 'RM', name: 'RetailMart', plan: 'Professional', employees: 142, active: false },
    { id: 'LF', name: 'LogiFreight', plan: 'Professional', employees: 89, active: false }
  ],

  employees: [
    { id: 'EMP001', name: 'Arjun Kumar', initials: 'AK', dept: 'Human Resources', role: 'HR Manager', status: 'active', joinDate: '2021-03-15', salary: 85000, phone: '+91 98765 43210', email: 'arjun.kumar@techcorp.in', location: 'Mumbai', manager: 'Vikram Singh', type: 'Full-time', color: '#2563EB' },
    { id: 'EMP002', name: 'Priya Sharma', initials: 'PS', dept: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: '2020-06-01', salary: 120000, phone: '+91 87654 32109', email: 'priya.sharma@techcorp.in', location: 'Pune', manager: 'Arjun Kumar', type: 'Full-time', color: '#7C3AED' },
    { id: 'EMP003', name: 'Rahul Mehta', initials: 'RM', dept: 'Sales', role: 'Sales Executive', status: 'active', joinDate: '2022-01-10', salary: 55000, phone: '+91 76543 21098', email: 'rahul.mehta@techcorp.in', location: 'Delhi', manager: 'Sunita Rao', type: 'Full-time', color: '#059669' },
    { id: 'EMP004', name: 'Sneha Patel', initials: 'SP', dept: 'Marketing', role: 'Marketing Lead', status: 'active', joinDate: '2021-09-20', salary: 75000, phone: '+91 65432 10987', email: 'sneha.patel@techcorp.in', location: 'Bengaluru', manager: 'Arjun Kumar', type: 'Full-time', color: '#F97316' },
    { id: 'EMP005', name: 'Vikram Singh', initials: 'VS', dept: 'Management', role: 'CTO', status: 'active', joinDate: '2019-04-01', salary: 250000, phone: '+91 54321 09876', email: 'vikram.singh@techcorp.in', location: 'Mumbai', manager: 'CEO', type: 'Full-time', color: '#0F172A' },
    { id: 'EMP006', name: 'Anita Desai', initials: 'AD', dept: 'Finance', role: 'Finance Manager', status: 'active', joinDate: '2020-11-15', salary: 95000, phone: '+91 43210 98765', email: 'anita.desai@techcorp.in', location: 'Mumbai', manager: 'CFO', type: 'Full-time', color: '#DC2626' },
    { id: 'EMP007', name: 'Kiran Reddy', initials: 'KR', dept: 'Engineering', role: 'DevOps Engineer', status: 'active', joinDate: '2022-07-01', salary: 110000, phone: '+91 32109 87654', email: 'kiran.reddy@techcorp.in', location: 'Hyderabad', manager: 'Vikram Singh', type: 'Full-time', color: '#0891B2' },
    { id: 'EMP008', name: 'Sunita Rao', initials: 'SR', dept: 'Sales', role: 'Sales Manager', status: 'active', joinDate: '2020-02-20', salary: 90000, phone: '+91 21098 76543', email: 'sunita.rao@techcorp.in', location: 'Chennai', manager: 'Arjun Kumar', type: 'Full-time', color: '#9333EA' },
    { id: 'EMP009', name: 'Amit Joshi', initials: 'AJ', dept: 'Operations', role: 'Operations Head', status: 'inactive', joinDate: '2019-08-12', salary: 130000, phone: '+91 10987 65432', email: 'amit.joshi@techcorp.in', location: 'Mumbai', manager: 'CEO', type: 'Full-time', color: '#6B7280' },
    { id: 'EMP010', name: 'Neha Gupta', initials: 'NG', dept: 'Design', role: 'UI/UX Designer', status: 'active', joinDate: '2023-01-05', salary: 70000, phone: '+91 09876 54321', email: 'neha.gupta@techcorp.in', location: 'Bengaluru', manager: 'Priya Sharma', type: 'Contract', color: '#EA580C' },
    { id: 'EMP011', name: 'Deepak Kumar', initials: 'DK', dept: 'Engineering', role: 'Backend Developer', status: 'active', joinDate: '2022-03-15', salary: 95000, phone: '+91 98761 23456', email: 'deepak.kumar@techcorp.in', location: 'Pune', manager: 'Priya Sharma', type: 'Full-time', color: '#2563EB' },
    { id: 'EMP012', name: 'Pooja Iyer', initials: 'PI', dept: 'HR', role: 'HR Executive', status: 'active', joinDate: '2023-06-01', salary: 48000, phone: '+91 87652 34567', email: 'pooja.iyer@techcorp.in', location: 'Chennai', manager: 'Arjun Kumar', type: 'Full-time', color: '#7C3AED' }
  ],

  departments: [
    { name: 'Engineering', count: 68, color: '#2563EB', percent: 27 },
    { name: 'Sales', count: 45, color: '#F97316', percent: 18 },
    { name: 'Operations', count: 38, color: '#059669', percent: 15 },
    { name: 'Marketing', count: 30, color: '#9333EA', percent: 12 },
    { name: 'Finance', count: 25, color: '#DC2626', percent: 10 },
    { name: 'HR', count: 18, color: '#0891B2', percent: 7 },
    { name: 'Design', count: 14, color: '#EA580C', percent: 6 },
    { name: 'Management', count: 10, color: '#0F172A', percent: 4 }
  ],

  attendance: {
    today: { present: 214, absent: 18, late: 12, onLeave: 4, total: 248 },
    thisMonth: {
      workingDays: 22,
      avgAttendance: 93.2
    },
    records: [
      { empId: 'EMP001', empName: 'Arjun Kumar', date: 'Today', checkIn: '09:02 AM', checkOut: '06:45 PM', hours: '9h 43m', status: 'present', location: 'Office' },
      { empId: 'EMP002', empName: 'Priya Sharma', date: 'Today', checkIn: '09:28 AM', checkOut: '07:00 PM', hours: '9h 32m', status: 'late', location: 'Remote' },
      { empId: 'EMP003', empName: 'Rahul Mehta', date: 'Today', checkIn: '08:55 AM', checkOut: '06:00 PM', hours: '9h 05m', status: 'present', location: 'Field' },
      { empId: 'EMP004', empName: 'Sneha Patel', date: 'Today', checkIn: '—', checkOut: '—', hours: '—', status: 'absent', location: '—' },
      { empId: 'EMP005', empName: 'Vikram Singh', date: 'Today', checkIn: '10:15 AM', checkOut: '—', hours: '6h+', status: 'present', location: 'Office' },
      { empId: 'EMP006', empName: 'Anita Desai', date: 'Today', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m', status: 'present', location: 'Office' },
      { empId: 'EMP007', empName: 'Kiran Reddy', date: 'Today', checkIn: '—', checkOut: '—', hours: '—', status: 'on-leave', location: '—' },
      { empId: 'EMP008', empName: 'Sunita Rao', date: 'Today', checkIn: '09:10 AM', checkOut: '06:30 PM', hours: '9h 20m', status: 'present', location: 'Office' }
    ],
    monthCalendar: {
      EMP001: { 1:'P',2:'P',3:'P',4:'P',5:'W',6:'W',7:'P',8:'P',9:'P',10:'P',11:'P',12:'W',13:'W',14:'H',15:'P',16:'P',17:'P',18:'P',19:'P',20:'W',21:'W',22:'P',23:'P',24:'P',25:'P',26:'P',27:'W',28:'W',29:'P',30:'P' }
    }
  },

  leaves: {
    balances: [
      { type: 'Casual Leave', available: 5, total: 10, used: 5, color: '#2563EB' },
      { type: 'Sick Leave', available: 8, total: 12, used: 4, color: '#059669' },
      { type: 'Earned Leave', available: 15, total: 24, used: 9, color: '#F97316' },
      { type: 'Maternity Leave', available: 90, total: 90, used: 0, color: '#9333EA' }
    ],
    pending: [
      { id: 'LV001', empId: 'EMP002', empName: 'Priya Sharma', initials: 'PS', type: 'Casual Leave', from: '2025-06-15', to: '2025-06-17', days: 3, reason: 'Family function', status: 'pending', applied: '2025-06-13' },
      { id: 'LV002', empId: 'EMP003', empName: 'Rahul Mehta', initials: 'RM', type: 'Sick Leave', from: '2025-06-14', to: '2025-06-14', days: 1, reason: 'Medical appointment', status: 'pending', applied: '2025-06-13' },
      { id: 'LV003', empId: 'EMP010', empName: 'Neha Gupta', initials: 'NG', type: 'Earned Leave', from: '2025-06-20', to: '2025-06-27', days: 6, reason: 'Annual vacation', status: 'pending', applied: '2025-06-12' },
      { id: 'LV004', empId: 'EMP011', empName: 'Deepak Kumar', initials: 'DK', type: 'Casual Leave', from: '2025-06-16', to: '2025-06-16', days: 1, reason: 'Personal work', status: 'pending', applied: '2025-06-13' },
      { id: 'LV005', empId: 'EMP012', empName: 'Pooja Iyer', initials: 'PI', type: 'Sick Leave', from: '2025-06-13', to: '2025-06-13', days: 1, reason: 'Fever', status: 'approved', applied: '2025-06-12' }
    ]
  },

  payroll: {
    summary: {
      totalPayroll: 2845000,
      lastMonth: 2790000,
      pendingApprovals: 3,
      processed: 245,
      disbursed: 242
    },
    employees: [
      { id: 'EMP001', name: 'Arjun Kumar', initials: 'AK', dept: 'HR', designation: 'HR Manager', basic: 60000, hra: 15000, allowances: 10000, deductions: 9200, netSalary: 75800, status: 'processed', payDate: '30 Jun 2025' },
      { id: 'EMP002', name: 'Priya Sharma', initials: 'PS', dept: 'Engineering', designation: 'Sr. Developer', basic: 85000, hra: 21250, allowances: 13750, deductions: 14400, netSalary: 105600, status: 'processed', payDate: '30 Jun 2025' },
      { id: 'EMP003', name: 'Rahul Mehta', initials: 'RM', dept: 'Sales', designation: 'Sales Executive', basic: 38000, hra: 9500, allowances: 7500, deductions: 6200, netSalary: 48800, status: 'pending', payDate: 'Pending' },
      { id: 'EMP004', name: 'Sneha Patel', initials: 'SP', dept: 'Marketing', designation: 'Marketing Lead', basic: 52000, hra: 13000, allowances: 10000, deductions: 8900, netSalary: 66100, status: 'processed', payDate: '30 Jun 2025' },
      { id: 'EMP005', name: 'Vikram Singh', initials: 'VS', dept: 'Management', designation: 'CTO', basic: 175000, hra: 43750, allowances: 31250, deductions: 42500, netSalary: 207500, status: 'on-hold', payDate: 'On Hold' },
      { id: 'EMP006', name: 'Anita Desai', initials: 'AD', dept: 'Finance', designation: 'Finance Manager', basic: 67000, hra: 16750, allowances: 11250, deductions: 11800, netSalary: 83200, status: 'processed', payDate: '30 Jun 2025' }
    ],
    history: [
      { month: 'May 2025', total: 2790000, employees: 246, status: 'disbursed' },
      { month: 'Apr 2025', total: 2751000, employees: 244, status: 'disbursed' },
      { month: 'Mar 2025', total: 2720000, employees: 243, status: 'disbursed' },
      { month: 'Feb 2025', total: 2695000, employees: 240, status: 'disbursed' },
      { month: 'Jan 2025', total: 2680000, employees: 238, status: 'disbursed' }
    ]
  },

  tasks: [
    { id: 'T001', title: 'Complete Q3 Performance Appraisals', assignee: 'Arjun Kumar', assigneeInitials: 'AK', priority: 'high', status: 'todo', due: '2025-06-20', tags: ['HR', 'Appraisal'], desc: 'Setup performance appraisal forms for all departments', progress: 0 },
    { id: 'T002', title: 'Update Employee Handbook', assignee: 'Pooja Iyer', assigneeInitials: 'PI', priority: 'medium', status: 'inprogress', due: '2025-06-25', tags: ['HR', 'Policy'], desc: 'Revise handbook with new leave and WFH policies', progress: 45 },
    { id: 'T003', title: 'Process June Payroll', assignee: 'Anita Desai', assigneeInitials: 'AD', priority: 'high', status: 'inprogress', due: '2025-06-28', tags: ['Payroll', 'Finance'], desc: 'Run payroll computation for all 248 employees', progress: 65 },
    { id: 'T004', title: 'Onboard 5 New Joiners', assignee: 'Arjun Kumar', assigneeInitials: 'AK', priority: 'high', status: 'inprogress', due: '2025-06-16', tags: ['Onboarding'], desc: 'Complete paperwork and system access for new joiners', progress: 80 },
    { id: 'T005', title: 'Review Attendance Policy', assignee: 'Arjun Kumar', assigneeInitials: 'AK', priority: 'low', status: 'review', due: '2025-06-30', tags: ['Policy', 'HR'], desc: 'Review and update biometric attendance policy', progress: 90 },
    { id: 'T006', title: 'Compliance Training Setup', assignee: 'Sneha Patel', assigneeInitials: 'SP', priority: 'medium', status: 'todo', due: '2025-07-05', tags: ['Training', 'Compliance'], desc: 'Setup mandatory compliance training modules', progress: 0 },
    { id: 'T007', title: 'Generate June Payslips', assignee: 'Anita Desai', assigneeInitials: 'AD', priority: 'high', status: 'done', due: '2025-06-10', tags: ['Payroll'], desc: 'Generate and distribute payslips for all employees', progress: 100 },
    { id: 'T008', title: 'Update Org Chart', assignee: 'Pooja Iyer', assigneeInitials: 'PI', priority: 'low', status: 'done', due: '2025-06-08', tags: ['HR'], desc: 'Update org chart with recent team changes', progress: 100 }
  ],

  gpsEmployees: [
    { id: 'EMP002', name: 'Priya Sharma', initials: 'PS', role: 'Sr. Developer', location: 'Andheri, Mumbai', lat: 36, lng: 48, status: 'checked-in', time: '09:28 AM', color: '#7C3AED' },
    { id: 'EMP003', name: 'Rahul Mehta', initials: 'RM', role: 'Sales Executive', location: 'Connaught Place, Delhi', lat: 55, lng: 35, status: 'field', time: '09:10 AM', color: '#059669' },
    { id: 'EMP008', name: 'Sunita Rao', initials: 'SR', role: 'Sales Manager', location: 'Anna Nagar, Chennai', lat: 70, lng: 62, status: 'checked-in', time: '09:05 AM', color: '#9333EA' },
    { id: 'EMP004', name: 'Sneha Patel', initials: 'SP', role: 'Marketing Lead', location: 'Koramangala, Bengaluru', lat: 45, lng: 70, status: 'field', time: '10:20 AM', color: '#F97316' },
    { id: 'EMP006', name: 'Anita Desai', initials: 'AD', role: 'Finance Manager', location: 'Lower Parel, Mumbai', lat: 25, lng: 58, status: 'checked-in', time: '09:00 AM', color: '#DC2626' }
  ],

  reports: [
    { id: 'R001', title: 'Attendance Summary Report', desc: 'Monthly attendance, late arrivals, and absenteeism', icon: '📊', color: '#EFF6FF', category: 'Attendance' },
    { id: 'R002', title: 'Payroll Register', desc: 'Complete payroll details with earnings and deductions', icon: '💰', color: '#ECFDF5', category: 'Payroll' },
    { id: 'R003', title: 'Employee Master Report', desc: 'Full employee data export with all fields', icon: '👥', color: '#F3E8FF', category: 'Employees' },
    { id: 'R004', title: 'Leave Balance Report', desc: 'Leave availed, balance, and encashment data', icon: '📅', color: '#FFF7ED', category: 'Leave' },
    { id: 'R005', title: 'Department-wise Headcount', desc: 'Headcount breakdown by department and grade', icon: '🏢', color: '#ECFEFF', category: 'Employees' },
    { id: 'R006', title: 'Overtime Report', desc: 'Daily and monthly overtime hours and cost', icon: '⏱️', color: '#FFFBEB', category: 'Attendance' },
    { id: 'R007', title: 'Statutory Compliance', desc: 'PF, ESI, PT, and TDS reports for compliance', icon: '📋', color: '#FEF2F2', category: 'Compliance' },
    { id: 'R008', title: 'Task Completion Report', desc: 'Task status, completion rates, and productivity', icon: '✅', color: '#F0FDF4', category: 'Tasks' }
  ],

  roles: [
    { id: 'R001', name: 'Super Admin', members: 2, color: '#DC2626', bgColor: '#FEF2F2', desc: 'Full system access and configuration', permissions: ['All Modules', 'User Management', 'Company Settings', 'Reports', 'Payroll', 'Delete Records'] },
    { id: 'R002', name: 'HR Manager', members: 5, color: '#2563EB', bgColor: '#EFF6FF', desc: 'HR operations and employee management', permissions: ['Employee Management', 'Attendance', 'Leave Management', 'Payroll View', 'Reports', 'Onboarding'] },
    { id: 'R003', name: 'Department Head', members: 12, color: '#9333EA', bgColor: '#F3E8FF', desc: 'Department-level management access', permissions: ['Team Attendance', 'Leave Approval', 'Task Management', 'Team Reports'] },
    { id: 'R004', name: 'Employee', members: 229, color: '#059669', bgColor: '#ECFDF5', desc: 'Self-service portal access', permissions: ['View Payslips', 'Apply Leave', 'Mark Attendance', 'View Tasks', 'Profile Management'] },
    { id: 'R005', name: 'Payroll Manager', members: 3, color: '#F97316', bgColor: '#FFF7ED', desc: 'Full payroll processing access', permissions: ['Payroll Processing', 'Salary Configuration', 'Tax Reports', 'Bank Transfers'] },
    { id: 'R006', name: 'Recruiter', members: 4, color: '#0891B2', bgColor: '#ECFEFF', desc: 'Recruitment and onboarding access', permissions: ['Job Postings', 'Candidate Management', 'Onboarding', 'Employee Profiles'] }
  ],

  activityFeed: [
    { type: 'checkin', empName: 'Priya Sharma', initials: 'PS', msg: 'Checked in at 09:28 AM (Remote)', time: '09:28 AM', color: '#7C3AED' },
    { type: 'leave', empName: 'Rahul Mehta', initials: 'RM', msg: 'Applied for 1 day sick leave', time: '09:15 AM', color: '#059669' },
    { type: 'payroll', empName: 'Anita Desai', initials: 'AD', msg: 'Initiated June 2025 payroll run', time: '08:45 AM', color: '#DC2626' },
    { type: 'task', empName: 'Arjun Kumar', initials: 'AK', msg: 'Completed task: Update Org Chart', time: '08:30 AM', color: '#2563EB' },
    { type: 'new_emp', empName: 'Deepak Kumar', initials: 'DK', msg: 'New employee joined Engineering', time: 'Yesterday', color: '#2563EB' },
    { type: 'checkin', empName: 'Sunita Rao', initials: 'SR', msg: 'Checked in at 09:05 AM (Office)', time: 'Yesterday', color: '#9333EA' }
  ]
};
