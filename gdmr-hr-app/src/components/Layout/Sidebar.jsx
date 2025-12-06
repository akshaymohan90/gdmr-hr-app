import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiDollarSign, FiActivity, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import AuthContext from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/employees', label: 'Employees', icon: FiUsers },
    { path: '/leave', label: 'Leave', icon: FiCalendar },
    { path: '/payroll', label: 'Payroll', icon: FiDollarSign },
    { path: '/performance', label: 'Performance', icon: FiActivity },
    { path: '/settings', label: 'Settings', icon: FiSettings },
];

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);

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
                    {NAV_ITEMS.map((item) => (
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
