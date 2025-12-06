import React from 'react';

const getBadgeStyles = (variant) => {
    const styles = {
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
    };

    switch (variant) {
        case 'success':
            return { ...styles, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' };
        case 'warning':
            return { ...styles, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' };
        case 'error':
            return { ...styles, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)' };
        case 'info':
        default:
            return { ...styles, backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)' };
    }
};

const Badge = ({ children, variant = 'info', style = {} }) => {
    return (
        <span style={{ ...getBadgeStyles(variant), ...style }}>
            {children}
        </span>
    );
};

export default Badge;
