import React from 'react';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = ({ onMenuClick }) => {
    return (
        <header className={`${styles.header} glass-panel`}>
            <button className={styles.menuBtn} onClick={onMenuClick}>
                <FiMenu />
            </button>

            <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input type="text" placeholder="Search..." className={styles.searchInput} />
            </div>

            <div className={styles.actions}>
                <button className={styles.iconBtn}>
                    <FiBell />
                    <span className={styles.badge} />
                </button>
                <div className={styles.profile}>
                    <img
                        src="https://ui-avatars.com/api/?name=Admin+User&background=4F46E5&color=fff"
                        alt="User"
                        className={styles.avatar}
                    />
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Admin User</span>
                        <span className={styles.userRole}>HR Manager</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
