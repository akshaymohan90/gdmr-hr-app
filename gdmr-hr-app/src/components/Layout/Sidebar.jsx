import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiDollarSign, FiActivity, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import AuthContext from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/attendance', label: 'Attendance', icon: FiClock },
    { path: '/employees', label: 'Employees', icon: FiUsers },
    { path: '/leave', label: 'Leave', icon: FiCalendar },
    { path: '/payroll', label: 'Payroll', icon: FiDollarSign },
    { path: '/performance', label: 'Performance', icon: FiActivity },
    { path: '/settings', label: 'Settings', icon: FiSettings },
];

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, user } = useContext(AuthContext);

    const filteredItems = NAV_ITEMS.filter(item => {
        if (user?.role === 'admin') return true;
        if (user?.role === 'manager') {
            // Managers see mostly everything, but maybe not 'Settings' in full depth (simplified for now: all)
            return true;
        }
        // Employees: Hide 'Employees' (directory management), 'Payroll' (admin view)
        // They should only see Dashboard, Leave, Performance (My view)
        // For simplicity in this iteration:
        if (user?.role === 'employee') {
            return ['/', '/leave', '/performance'].includes(item.path);
        }
        return false;
    });

    return (
        <>
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>HR</div>
                    <h2>GDMR</h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">
                        <FiX />
                    </button>
                </div>

                <nav className={styles.nav}>
                    {filteredItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.active : ''}`
                            }
                            onClick={() => window.innerWidth < 1024 && onClose()}
                        >
                            <item.icon className={styles.icon} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.footer}>
                    {user && (
                        <div style={{ marginBottom: '1rem', padding: '0 0.5rem', fontSize: '0.8rem' }}>
                            <div style={{ fontWeight: 600 }}>{user.name}</div>
                            <div style={{ opacity: 0.7, textTransform: 'capitalize' }}>{user.role}</div>
                        </div>
                    )}
                    <button className={styles.logoutBtn} onClick={logout}>
                        <FiLogOut className={styles.icon} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className={styles.overlay} onClick={onClose} />}
        </>
    );
};

export default Sidebar;
