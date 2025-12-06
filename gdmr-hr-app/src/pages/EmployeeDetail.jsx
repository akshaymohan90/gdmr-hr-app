import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiBriefcase } from 'react-icons/fi';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import AuthContext from '../context/AuthContext';

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmployee({
                        ...data,
                        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=random`
                    });
                }
            } catch (error) {
                console.error("Failed to fetch employee", error);
            } finally {
                setLoading(false);
            }
        };

        if (token && id) fetchEmployee();
    }, [token, id]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
    if (!employee) return <div style={{ padding: '2rem' }}>Employee not found</div>;

    return (
        <div>
            <Button variant="ghost" onClick={() => navigate('/employees')} style={{ marginBottom: 'var(--spacing-lg)' }}>
                <FiArrowLeft style={{ marginRight: '8px' }} />
                Back to Directory
            </Button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
                {/* Sidebar Profile Card */}
                <div style={{ maxWidth: '400px', width: '100%' }}>
                    <Card>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <img
                                src={employee.avatar}
                                alt={employee.name}
                                style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: 'var(--spacing-md)' }}
                            />
                            <h2>{employee.name}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)', textTransform: 'capitalize' }}>{employee.role}</p>
                            <Badge variant={'success'}>Active</Badge>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                                <FiBriefcase />
                                <span>{employee.department || 'No Dept'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                                <FiMail />
                                <span>{employee.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)' }}>
                                <FiBriefcase />
                                <span>Report To: {employee.manager ? employee.manager.name : 'None'}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Employee Details</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Position</h4>
                                <div>{employee.position || 'N/A'}</div>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Joined Date</h4>
                                <div>{new Date(employee.joinDate).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Recent Activity</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>No recent activity logged.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
