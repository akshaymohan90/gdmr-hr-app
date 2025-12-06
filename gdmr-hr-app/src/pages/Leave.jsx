import React, { useState, useMemo, useEffect, useContext } from 'react';
import { FiPlus, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import AuthContext from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';

const Leave = () => {
    const { token, user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });

    const fetchLeaves = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/leaves`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setLeaves(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) fetchLeaves();
    }, [token]);

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/leaves`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newItem)
            });
            if (response.ok) {
                setIsRequestModalOpen(false);
                setNewItem({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
                fetchLeaves();
            } else {
                alert('Failed to submit request');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleApproval = async (id, action) => {
        // Determine endpoint based on role and status
        // A Manager approves 'Pending Manager' -> /leaves/:id/manager
        // An Admin approves 'Pending Admin' -> /leaves/:id/admin

        let endpointSuffix = '';
        const leaveItem = leaves.find(l => l._id === id);
        if (!leaveItem) return;

        if (user.role === 'manager' && leaveItem.status === 'Pending Manager') {
            endpointSuffix = 'manager';
        } else if (user.role === 'admin' && leaveItem.status === 'Pending Admin') {
            endpointSuffix = 'admin';
        } else {
            // Admin can likely override manager approval too? For now, stick to flow.
            if (user.role === 'admin' && leaveItem.status === 'Pending Manager') {
                // Allow admin to act as manager if needed? Or strictly next step?
                // Let's assume Admin only acts on Pending Admin for this strict flow, 
                // OR Admin can force approve. The backend routes separate them.
                // If Admin wants to approve step 1, they need to be the manager.
                return alert('This request is waiting for Manager approval.');
            }
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/leaves/${id}/${endpointSuffix}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action }) // 'Approve' or 'Reject'
            });
            if (response.ok) {
                fetchLeaves();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const columns = useMemo(() => [
        { header: 'Employee', accessor: 'user', render: (row) => row.user?.name || 'Unknown' },
        { header: 'Type', accessor: 'type' },
        {
            header: 'Dates',
            accessor: '_id',
            render: (row) => `${new Date(row.startDate).toLocaleDateString()} - ${new Date(row.endDate).toLocaleDateString()}`
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={
                    row.status === 'Approved' ? 'success' :
                        row.status === 'Rejected' ? 'error' : 'warning'
                }>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Reason', accessor: 'reason' },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => {
                // Show actions if:
                // 1. Pending Manager AND I am Manager
                // 2. Pending Admin AND I am Admin
                const showManagerAction = user.role === 'manager' && row.status === 'Pending Manager';
                const showAdminAction = user.role === 'admin' && row.status === 'Pending Admin';

                if (showManagerAction || showAdminAction) {
                    return (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button size="sm" style={{ padding: '4px 8px' }} onClick={() => handleApproval(row._id, 'Approve')}>
                                <FiCheck />
                            </Button>
                            <Button size="sm" variant="ghost" style={{ padding: '4px 8px', color: 'var(--color-error)' }} onClick={() => handleApproval(row._id, 'Reject')}>
                                <FiX />
                            </Button>
                        </div>
                    );
                }
                return null;
            }
        }
    ], [leaves, user]);

    // Employee view: hide Employee column?
    const displayColumns = user.role === 'employee' ? columns.filter(c => c.header !== 'Employee' && c.header !== 'Actions') : columns;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Leave Management</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track and approve leave requests.</p>
                </div>
                <Button onClick={() => setIsRequestModalOpen(true)}>
                    <FiPlus style={{ marginRight: '8px' }} />
                    Request Leave
                </Button>
            </div>

            <Card>
                <Table columns={displayColumns} data={leaves} />
            </Card>

            <Modal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                title="Request Leave"
            >
                <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Leave Type</label>
                        <select
                            value={newItem.type}
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg-surface)',
                                color: 'var(--color-text-main)'
                            }}
                        >
                            <option>Annual Leave</option>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Unpaid Leave</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Start Date"
                            type="date"
                            value={newItem.startDate}
                            onChange={(e) => setNewItem({ ...newItem, startDate: e.target.value })}
                            required
                        />
                        <Input
                            label="End Date"
                            type="date"
                            value={newItem.endDate}
                            onChange={(e) => setNewItem({ ...newItem, endDate: e.target.value })}
                            required
                        />
                    </div>
                    <Input
                        label="Reason"
                        placeholder="Reason for leave"
                        value={newItem.reason}
                        onChange={(e) => setNewItem({ ...newItem, reason: e.target.value })}
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                        <Button variant="ghost" type="button" onClick={() => setIsRequestModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Leave;
