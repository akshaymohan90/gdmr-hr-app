import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';
import { FiClock, FiCheckCircle } from 'react-icons/fi';

const Attendance = () => {
    const { token, user } = useContext(AuthContext);
    const [attendanceData, setAttendanceData] = useState([]);
    const [statusKey, setStatusKey] = useState(0); // Force refresh

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const endpoint = user.role === 'admin' ? '/attendance' : '/attendance/my-attendance';
                const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setAttendanceData(data);
                }
            } catch (error) {
                console.error("Fetch attendance failed", error);
            }
        };

        if (token) fetchAttendance();
    }, [token, user.role, statusKey]);

    const handleCheckIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/attendance/checkin`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                alert('Checked In Successfully!');
                setStatusKey(prev => prev + 1);
            } else {
                alert(`Check-in Failed: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/attendance/checkout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                alert('Checked Out Successfully!');
                setStatusKey(prev => prev + 1);
            } else {
                alert(`Check-out Failed: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            header: 'Date',
            accessor: 'date'
        },
        {
            header: 'User',
            accessor: 'user',
            render: (row) => row.user?.name || 'Me'
        },
        {
            header: 'Check In',
            accessor: 'checkIn',
            render: (row) => row.checkIn ? new Date(row.checkIn).toLocaleTimeString() : '-'
        },
        {
            header: 'Check Out',
            accessor: 'checkOut',
            render: (row) => row.checkOut ? new Date(row.checkOut).toLocaleTimeString() : '-'
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Present' ? 'success' : row.status === 'Short' ? 'warning' : 'info'}>
                    {row.status}
                </Badge>
            )
        }
    ];

    if (user.role !== 'admin') {
        columns.splice(1, 1); // Remove User column for non-admins
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Attendance</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track your work hours</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <Card>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiClock /> Today's Action
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button onClick={handleCheckIn} variant="primary">Check In</Button>
                        <Button onClick={handleCheckOut} variant="secondary">Check Out</Button>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        <p>Morning: Before 10:15 AM</p>
                        <p>Leave: 6:00 PM - 7:30 PM (IST)</p>
                    </div>
                </Card>
            </div>

            <Card>
                <h3>History</h3>
                <Table columns={columns} data={attendanceData} />
            </Card>
        </div>
    );
};

export default Attendance;
