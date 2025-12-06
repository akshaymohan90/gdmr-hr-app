export const MOCK_EMPLOYEES = [
    {
        id: 'EMP001',
        name: 'Sarah Jenkins',
        role: 'Senior Developer',
        department: 'Engineering',
        email: 'sarah.j@gdmr.co',
        joinDate: '2023-01-15',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random'
    },
    {
        id: 'EMP002',
        name: 'Michael Chen',
        role: 'Product Manager',
        department: 'Product',
        email: 'michael.c@gdmr.co',
        joinDate: '2022-11-01',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random'
    },
    {
        id: 'EMP003',
        name: 'Jessica Wu',
        role: 'UX Designer',
        department: 'Design',
        email: 'jessica.w@gdmr.co',
        joinDate: '2023-03-10',
        status: 'On Leave',
        avatar: 'https://ui-avatars.com/api/?name=Jessica+Wu&background=random'
    },
    {
        id: 'EMP004',
        name: 'David Miller',
        role: 'DevOps Engineer',
        department: 'Engineering',
        email: 'david.m@gdmr.co',
        joinDate: '2021-06-20',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=random'
    },
    {
        id: 'EMP005',
        name: 'Emily Davis',
        role: 'HR Specialist',
        department: 'Human Resources',
        email: 'emily.d@gdmr.co',
        joinDate: '2023-08-05',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random'
    },
];

export const MOCK_LEAVES = [
    {
        id: 'LR001',
        employeeId: 'EMP001',
        employeeName: 'Sarah Jenkins',
        type: 'Annual Leave',
        startDate: '2023-11-20',
        endDate: '2023-11-25',
        days: 5,
        status: 'Approved',
        reason: 'Family vacation'
    },
    {
        id: 'LR002',
        employeeId: 'EMP003',
        employeeName: 'Jessica Wu',
        type: 'Sick Leave',
        startDate: '2023-12-01',
        endDate: '2023-12-02',
        days: 2,
        status: 'Pending',
        reason: 'Flu'
    },
    {
        id: 'LR003',
        employeeId: 'EMP002',
        employeeName: 'Michael Chen',
        type: 'Remote Work',
        startDate: '2023-11-15',
        endDate: '2023-11-15',
        days: 1,
        status: 'Rejected',
        reason: 'Key meeting require presence'
    }
];

export const MOCK_PAYROLL = [
    { id: 'PAY001', month: 'October 2023', employee: 'Sarah Jenkins', basic: 5000, bonus: 500, deductions: 200, net: 5300, status: 'Paid' },
    { id: 'PAY002', month: 'October 2023', employee: 'Michael Chen', basic: 4500, bonus: 0, deductions: 150, net: 4350, status: 'Paid' },
    { id: 'PAY003', month: 'November 2023', employee: 'Sarah Jenkins', basic: 5000, bonus: 0, deductions: 200, net: 4800, status: 'Processing' },
];

export const MOCK_REVIEWS = [
    { id: 'REV001', employee: 'Sarah Jenkins', period: 'Q3 2023', reviewer: 'John Doe', rating: 'Exceeds Expectations', status: 'Completed' },
    { id: 'REV002', employee: 'Michael Chen', period: 'Q3 2023', reviewer: 'John Doe', rating: 'Meets Expectations', status: 'Signed' },
    { id: 'REV003', employee: 'Jessica Wu', period: 'Q4 2023', reviewer: 'Sarah Jenkins', rating: '-', status: 'Draft' },
];
