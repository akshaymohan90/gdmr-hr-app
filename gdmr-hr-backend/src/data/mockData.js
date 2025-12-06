export const employees = [
    {
        id: 1,
        name: "John Doe",
        role: "Software Engineer",
        department: "Engineering",
        email: "john.doe@example.com",
        status: "Active",
        joinDate: "2023-01-15",
        salary: 85000
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "HR Manager",
        department: "Human Resources",
        email: "jane.smith@example.com",
        status: "Active",
        joinDate: "2022-11-01",
        salary: 75000
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Product Designer",
        department: "Design",
        email: "michael.brown@example.com",
        status: "On Leave",
        joinDate: "2023-03-20",
        salary: 72000
    }
];

export const payrolls = [
    {
        id: 101,
        employeeId: 1,
        month: "November 2024",
        baseSalary: 85000,
        bonus: 2000,
        deductions: 1500,
        netPay: 85500,
        status: "Paid",
        paymentDate: "2024-11-30"
    },
    {
        id: 102,
        employeeId: 2,
        month: "November 2024",
        baseSalary: 75000,
        bonus: 0,
        deductions: 1200,
        netPay: 73800,
        status: "Processing",
        paymentDate: "2024-11-30"
    }
];

export const performanceReviews = [
    {
        id: 201,
        employeeId: 1,
        reviewPeriod: "Q3 2024",
        rating: 4.5,
        feedback: "Excellent performance, delivered key features on time.",
        reviewer: "Tech Lead",
        date: "2024-10-15"
    },
    {
        id: 202,
        employeeId: 3,
        reviewPeriod: "Q3 2024",
        rating: 3.8,
        feedback: "Good work on UI, but needs to improve on meeting deadlines.",
        reviewer: "Product Manager",
        date: "2024-10-18"
    }
];
