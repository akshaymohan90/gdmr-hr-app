import React from 'react';
import { FiDownload, FiDollarSign } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
// Mock data for Payroll - to be replaced with API later
const MOCK_PAYROLL = [
    { id: 1, month: 'Nov 2023', employee: 'Sarah Johnson', basic: 5000, bonus: 500, deductions: 200, net: 5300, status: 'Paid' },
    { id: 2, month: 'Nov 2023', employee: 'Mike Chen', basic: 4500, bonus: 300, deductions: 150, net: 4650, status: 'Paid' },
    { id: 3, month: 'Nov 2023', employee: 'Emily Davis', basic: 4000, bonus: 0, deductions: 100, net: 3900, status: 'Processing' },
];

const Payroll = () => {
    const columns = [
        { header: 'Month', accessor: 'month' },
        { header: 'Employee', accessor: 'employee' },
        { header: 'Basic Salary', accessor: 'basic', render: (row) => `$${row.basic.toLocaleString()}` },
        { header: 'Bonus', accessor: 'bonus', render: (row) => `$${row.bonus.toLocaleString()}` },
        { header: 'Deductions', accessor: 'deductions', render: (row) => `-$${row.deductions.toLocaleString()}` },
        { header: 'Net Salary', accessor: 'net', render: (row) => <span style={{ fontWeight: 'bold' }}>${row.net.toLocaleString()}</span> },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Paid' ? 'success' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: () => (
                <Button size="sm" variant="ghost">
                    <FiDownload />
                </Button>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Payroll</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>View and manage salary information.</p>
                </div>
                <Button>
                    <FiDollarSign style={{ marginRight: '8px' }} />
                    Run Payroll
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Total Payroll Cost</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>$14,450</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>For November 2023</p>
                </Card>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Pending Payments</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>1</div>
                    <Badge variant="warning">Processing</Badge>
                </Card>
            </div>

            <Card>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Payslip History</h3>
                <Table columns={columns} data={MOCK_PAYROLL} />
            </Card>
        </div>
    );
};

export default Payroll;
