import React from 'react';

const Card = ({ children, className = '', glass = false, style = {} }) => {
    return (
        <div
            className={`
        ${glass ? 'glass-panel' : ''} 
        ${className}
      `}
            style={{
                backgroundColor: glass ? undefined : 'var(--color-bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                boxShadow: glass ? undefined : '0 1px 3px rgba(0,0,0,0.1)',
                border: glass ? undefined : '1px solid var(--color-border)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Card;
