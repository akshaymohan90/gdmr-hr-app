import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-app)'
        }}>
            <div className="glass-panel" style={{
                padding: 'var(--spacing-xl)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to GDMR HR</p>
                </div>

                {error && (
                    <div style={{
                        padding: '10px',
                        background: '#ffebee',
                        color: '#c62828',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@gdmr.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="password123"
                    />

                    <Button type="submit" disabled={loading} style={{ marginTop: 'var(--spacing-sm)' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    Demo Credentials:<br />
                    admin@gdmr.com / password123
                </div>
            </div>
        </div>
    );
};

export default Login;
