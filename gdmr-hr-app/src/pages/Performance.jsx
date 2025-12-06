import React from 'react';
import { FiAward } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
import { MOCK_REVIEWS } from '../data/mockData';

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
