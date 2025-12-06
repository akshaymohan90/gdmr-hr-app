import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import AuthContext from '../context/AuthContext';
import { FiClock, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [todayAttendance, setTodayAttendance] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/attendance/my-attendance`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Find today's record (server returns sorted by date desc)
                    const todayStr = new Date().toISOString().split('T')[0];
                    // Note: Server uses IST date string, so this client side check might be loosely accurate 
                    // or we check the first item if dates match. 
                    // Better approach: filter by date. 
                    // For now, let's take the first item if checkIn is today.
                    if (data.length > 0) {
                        const latest = data[0];
                        const latestDate = new Date(latest.createdAt).toDateString();
                        const todayDate = new Date().toDateString();
                        if (latestDate === todayDate) {
                            setTodayAttendance(latest);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching attendance", error);
            }
        };

        if (token) fetchAttendance();
    }, [token]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div>
                <h1>Welcome back, {user?.name.split(' ')[0]}</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Here's what's happening at GDMR today.</p>
            </div>

            {/* Attendance Widget */}
            <Card style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, white 100%)', border: '1px solid var(--color-primary-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--color-primary)', fontSize: '1.5rem'
                        }}>
                            <FiClock />
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>Today's Attendance</h3>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {todayAttendance ? (
                                    <>
                                        <span style={{ marginRight: '1rem' }}>Include: <strong>{todayAttendance.checkIn ? new Date(todayAttendance.checkIn).toLocaleTimeString() : '-'}</strong></span>
                                        <span>Out: <strong>{todayAttendance.checkOut ? new Date(todayAttendance.checkOut).toLocaleTimeString() : '-'}</strong></span>
                                    </>
                                ) : (
                                    "You haven't checked in today."
                                )}
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/attendance')}>Manage Attendance</Button>
                </div>
            </Card>

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
