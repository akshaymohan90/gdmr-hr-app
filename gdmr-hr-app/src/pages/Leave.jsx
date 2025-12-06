import React, { useState, useMemo } from 'react';
import { FiPlus, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import { MOCK_LEAVES } from '../data/mockData';

const Leave = () => {
    const [leaves, setLeaves] = useState(MOCK_LEAVES);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    const columns = useMemo(() => [
        { header: 'Employee', accessor: 'employeeName' },
        { header: 'Type', accessor: 'type' },
        { header: 'Dates', accessor: 'id', render: (row) => `${row.startDate} to ${row.endDate}` },
        { header: 'Days', accessor: 'days' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Approved' ? 'success' : row.status === 'Pending' ? 'warning' : 'error'}>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Reason', accessor: 'reason' },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => row.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" style={{ padding: '4px 8px' }} onClick={() => handleStatusChange(row.id, 'Approved')}>
                        <FiCheck />
                    </Button>
                    <Button size="sm" variant="ghost" style={{ padding: '4px 8px', color: 'var(--color-error)' }} onClick={() => handleStatusChange(row.id, 'Rejected')}>
                        <FiX />
                    </Button>
                </div>
            )
        }
    ], []);

    const handleStatusChange = (id, newStatus) => {
        setLeaves(leaves.map(leave =>
            leave.id === id ? { ...leave, status: newStatus } : leave
        ));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Leave Management</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track and approve employee leave requests.</p>
                </div>
                <Button onClick={() => setIsRequestModalOpen(true)}>
                    <FiPlus style={{ marginRight: '8px' }} />
                    New Request
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <FiCalendar style={{ color: 'var(--color-primary)' }} />
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Pending Requests</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{leaves.filter(l => l.status === 'Pending').length}</div>
                </Card>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>On Leave Today</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>2</div>
                </Card>
            </div>

            <Card>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Recent Requests</h3>
                <Table columns={columns} data={leaves} />
            </Card>

            <Modal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                title="Request Leave"
            >
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                    This is a mock form. In a real app, this would submit a request for the logged-in user.
                </p>
                <Input label="Leave Type" placeholder="Annual, Sick, etc." />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <Input label="Start Date" type="date" />
                    <Input label="End Date" type="date" />
                </div>
                <Input label="Reason" placeholder="Reason for leave" />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                    <Button variant="ghost" onClick={() => setIsRequestModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsRequestModalOpen(false)}>Submit Request</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Leave;
