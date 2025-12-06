import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiBriefcase } from 'react-icons/fi';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { MOCK_EMPLOYEES } from '../data/mockData';

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const employee = MOCK_EMPLOYEES.find(e => e.id === id) || MOCK_EMPLOYEES[0];

    if (!employee) return <div>Employee not found</div>;

    return (
        <div>
            <Button variant="ghost" onClick={() => navigate('/employees')} style={{ marginBottom: 'var(--spacing-lg)' }}>
                <FiArrowLeft style={{ marginRight: '8px' }} />
                Back to Directory
            </Button>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Sidebar Profile Card */}
                <Card>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <img
                            src={employee.avatar}
                            alt={employee.name}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: 'var(--spacing-md)' }}
                        />
                        <h2>{employee.name}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>{employee.role}</p>
                        <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>{employee.status}</Badge>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                            <FiBriefcase />
                            <span>{employee.department}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                            <FiMail />
                            <span>{employee.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                            <FiPhone />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                            <FiMapPin />
                            <span>New York, NY</span>
                        </div>
                    </div>
                </Card>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Current Projects</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>No active projects assigned.</p>
                    </Card>

                    <Card>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Recent Activity</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                                <strong>Logged in</strong> <span style={{ color: 'var(--color-text-secondary)' }}>2 hours ago</span>
                            </li>
                            <li style={{ padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                                <strong>Completed review</strong> <span style={{ color: 'var(--color-text-secondary)' }}>Yesterday</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
