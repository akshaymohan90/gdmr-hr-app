import React from 'react';
import Card from '../components/UI/Card';

const PlaceholderPage = ({ title }) => {
    return (
        <div>
            <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>{title}</h1>
            <Card style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <h2>Under Construction</h2>
                <p>This module is currently being implemented.</p>
            </Card>
        </div>
    );
};

export default PlaceholderPage;
