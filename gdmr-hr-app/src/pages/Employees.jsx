import AuthContext from '../context/AuthContext';
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiMoreVertical } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Badge from '../components/UI/Badge';
import Modal from '../components/UI/Modal';

const Employees = () => {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const initialFormState = {
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: '',
        position: '',
        manager: ''
    };
    const [newEmployee, setNewEmployee] = useState(initialFormState);

    // Fetch employees and managers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 401) return;

                const data = await response.json();

                const enrichedData = data.map(emp => ({
                    ...emp,
                    avatar: `https://ui-avatars.com/api/?name=${emp.name}&background=random`
                }));
                setEmployees(enrichedData);

                // Filter potential managers (admins and managers)
                const managerList = data.filter(e => e.role === 'admin' || e.role === 'manager');
                setManagers(managerList);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        if (token) fetchData();
    }, [token]);

    const columns = useMemo(() => [
        {
            header: 'Employee',
            accessor: 'name',
            render: (row) => (
                <div
                    onClick={() => navigate(`/employees/${row.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                >
                    <img
                        src={row.avatar}
                        alt={row.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    />
                    <div>
                        <div style={{ fontWeight: '500' }}>{row.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{row.email}</div>
                    </div>
                </div>
            )
        },
        { header: 'Role', accessor: 'role', render: (row) => <span style={{ textTransform: 'capitalize' }}>{row.role}</span> },
        { header: 'Department', accessor: 'department' },
        { header: 'Reporting To', accessor: 'manager', render: (row) => row.manager?.name || '-' },
        {
            header: 'Joined',
            accessor: 'joinDate',
            render: (row) => new Date(row.joinDate).toLocaleDateString()
        }
    ], []);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newEmployee),
            });

            if (response.ok) {
                const addedEmployee = await response.json();
                // Add avatar locally
                const employeeWithAvatar = {
                    ...addedEmployee,
                    avatar: `https://ui-avatars.com/api/?name=${addedEmployee.name}&background=random`
                };
                setEmployees([...employees, employeeWithAvatar]);
                setIsAddModalOpen(false);
                setNewEmployee(initialFormState);
            } else {
                const err = await response.json();
                alert(`Failed: ${err.message}`);
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    // Only Admin can add employees
    const canAdd = user?.role === 'admin';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Employees</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Manage your team structure</p>
                </div>
                {canAdd && (
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <FiPlus style={{ marginRight: '8px' }} />
                        Add New User
                    </Button>
                )}
            </div>

            <div className="glass-panel" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 36px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                outline: 'none',
                                background: 'var(--color-bg-app)'
                            }}
                        />
                    </div>
                </div>

                <Table columns={columns} data={filteredEmployees} />
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Create New User"
            >
                <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Full Name"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Password"
                        type="password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        required
                        placeholder="Initial password"
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Role</label>
                            <select
                                value={newEmployee.role}
                                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-surface)',
                                    color: 'var(--color-text-main)'
                                }}
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reporting Manager</label>
                            <select
                                value={newEmployee.manager}
                                onChange={(e) => setNewEmployee({ ...newEmployee, manager: e.target.value })}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-surface)',
                                    color: 'var(--color-text-main)'
                                }}
                            >
                                <option value="">None</option>
                                {managers.map(m => (
                                    <option key={m._id} value={m._id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Department"
                            value={newEmployee.department}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                            required
                        />
                        <Input
                            label="Position"
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Employees;
