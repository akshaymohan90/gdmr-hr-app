import React from 'react';
import { FiAward } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
// Mock data for Performance - to be replaced with API later
const MOCK_REVIEWS = [
    { id: 1, employee: 'Sarah Johnson', period: 'Q3 2023', reviewer: 'John Doe', rating: 4.5, status: 'Completed' },
    { id: 2, employee: 'Mike Chen', period: 'Q3 2023', reviewer: 'John Doe', rating: 4.0, status: 'Signed' },
    { id: 3, employee: 'Emily Davis', period: 'Q3 2023', reviewer: 'Sarah Johnson', rating: 0, status: 'Draft' },
];

const Performance = () => {
    const columns = [
        { header: 'Employee', accessor: 'employee' },
        { header: 'Period', accessor: 'period' },
        { header: 'Reviewer', accessor: 'reviewer' },
        { header: 'Rating', accessor: 'rating' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Completed' ? 'success' : row.status === 'Signed' ? 'info' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: () => (
                <Button size="sm" variant="ghost">View</Button>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Performance</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track employee reviews and goals.</p>
                </div>
                <Button>
                    <FiAward style={{ marginRight: '8px' }} />
                    New Review Cycle
                </Button>
            </div>

            <Card>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Performance Reviews</h3>
                <Table columns={columns} data={MOCK_REVIEWS} />
            </Card>
        </div>
    );
};

export default Performance;
