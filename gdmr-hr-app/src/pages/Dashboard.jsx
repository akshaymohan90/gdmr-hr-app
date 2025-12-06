import React from 'react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div>
                <h1>Welcome back, Admin</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Here's what's happening at GDMR today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-lg)' }}>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Total Employees</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>124</div>
                    <Badge variant="success">+12% from last month</Badge>
                </Card>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Leave Requests</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>8</div>
                    <Badge variant="warning">Requires Action</Badge>
                </Card>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Upcoming Reviews</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>5</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Due this week</p>
                </Card>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Total Payroll</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>$1.2M</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Pending processing</p>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
