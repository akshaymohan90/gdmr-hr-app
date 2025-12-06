import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiMoreVertical } from 'react-icons/fi';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Badge from '../components/UI/Badge';
import Modal from '../components/UI/Modal';

const Employees = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', role: '', department: '', email: '' });

    // Fetch employees from backend
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
                const data = await response.json();
                // Add avatar since backend doesn't provide it yet
                const enrichedData = data.map(emp => ({
                    ...emp,
                    avatar: `https://ui-avatars.com/api/?name=${emp.name}&background=random`
                }));
                setEmployees(enrichedData);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };

        fetchEmployees();
    }, []);

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
        { header: 'Role', accessor: 'role' },
        { header: 'Department', accessor: 'department' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'error'}>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Joined', accessor: 'joinDate' },
        {
            header: '',
            accessor: 'actions',
            width: '50px',
            render: () => (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                    <FiMoreVertical />
                </button>
            )
        }
    ], []);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                setNewEmployee({ name: '', role: '', department: '', email: '' });
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h1>Employees</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Manage your team members</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <FiPlus style={{ marginRight: '8px' }} />
                    Add Employee
                </Button>
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
                    <Button variant="secondary">
                        <FiFilter style={{ marginRight: '8px' }} />
                        Filter
                    </Button>
                </div>

                <Table columns={columns} data={filteredEmployees} />
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Employee"
            >
                <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <Input
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. john@company.com"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        required
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Role"
                            placeholder="e.g. Developer"
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                            required
                        />
                        <Input
                            label="Department"
                            placeholder="e.g. Engineering"
                            value={newEmployee.department}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Employee</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Employees;
