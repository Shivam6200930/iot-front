import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Menu, Home, BarChart, Box, Power } from 'lucide-react'; 
import styles from '../css/Header.module.css';
import { Sun, Moon } from 'lucide-react'; 
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const loggedIn = localStorage.getItem("loggedIn");

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo} onClick={() => navigate('/')}>
        <Power size={32} className={styles.icon} />
        <h1>Smart Home</h1>
      </div>

      {loggedIn ? (
        <>
          {/* Navigation */}
          <nav className={`${styles.nav} ${menuOpen ? styles.show : ''}`}>
            <div onClick={() => navigate('/home')} className={styles.navItem}>
              <Home size={20} /> Home
            </div>
            <div onClick={() => navigate('/device')} className={styles.navItem}>
              <Box size={20} /> Devices
            </div>
            <div onClick={() => navigate('/controls')} className={styles.navItem}>
              <Settings size={20} /> Controls Device
            </div>
            <div onClick={() => navigate('/analytics')} className={styles.navItem}>
              <BarChart size={20} /> Analytics
            </div>
            <div onClick={() => navigate('/support')} className={styles.navItem}>
              <User size={20} /> Support
            </div>
          </nav>

          {/* User Section */}
          <div className={styles.userSection}>
            <div 
              className={styles.profile} 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <User size={28} />
            </div>

            {profileOpen && (
              <div className={styles.dropdownMenu}>
                <div onClick={() => navigate('/profile')}>
                  <User size={18} /> Profile
                </div>
                <div onClick={() => navigate('/settings')}>
                  <Settings size={18} /> Settings
                </div>
                <div onClick={handleLogout}>
                  <LogOut size={18} /> Logout
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div 
            className={`${styles.menuIcon} ${menuOpen ? styles.active : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </div>
        </>
      ) : (
        // Only show logo and login button when logged out
        <div className={styles.loginContainer}>
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      )}

      
      <div className={styles.toggleContainer} onClick={toggleTheme}>
        {theme === 'light' ? (
          <Moon size={24} color="#555" />
        ) : (
          <Sun size={24} color="#f39c12" />
        )}
      </div>
    </header>
  );
};

export default Header;
