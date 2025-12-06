import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Settings = () => {
    const [role, setRole] = useState('Admin');
    const [theme, setTheme] = useState('Light');

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h1>Settings</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Manage application configuration.</p>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                <Card>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>General Settings</h3>
                    <div style={{ maxWidth: '400px' }}>
                        <Input label="Company Name" defaultValue="GDMR" />
                        <Input label="Support Email" defaultValue="support@gdmr.co" />
                    </div>
                </Card>

                <Card>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Access Control (Mock)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', maxWidth: '400px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontSize: '0.875rem', fontWeight: '500' }}>Current Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: 'var(--spacing-sm)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-surface)',
                                    color: 'var(--color-text-main)'
                                }}
                            >
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>Employee</option>
                            </select>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                Switching this will mock permissions (not implemented in this demo).
                            </p>
                        </div>
                        <Button>
                            <FiSave style={{ marginRight: '8px' }} />
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
