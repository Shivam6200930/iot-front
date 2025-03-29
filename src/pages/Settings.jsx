import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, Save, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';  // ✅ Import Theme Context
import styles from '../css/Settings.module.css';
import {Toaster, toast } from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();  // ✅ Global theme context
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);  // 🌗 Local state
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ Sync the local state with the global theme
  useEffect(() => {
    setLocalDarkMode(darkMode);
  }, [darkMode]);

  // ✅ Function to toggle dark mode
  const handleDarkModeToggle = () => {
    toggleTheme();                      // 🌗 Toggle global theme
    setLocalDarkMode((prev) => !prev);  // 🔁 Sync local state
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Settings</h1>

      {/* 🌗 Dark Mode Toggle */}
      <div className={styles.settingsGroup}>
        <label>Dark Mode</label>
        <div 
          className={styles.toggle} 
          onClick={handleDarkModeToggle}    // ✅ Use toggle function
        >
          {localDarkMode ? (
            <ToggleLeft size={32} color="#f44336" /> 
          ) : (
            
            <ToggleRight size={32} color="#4caf50" />   
          )}
        </div>
      </div>

      {/* 🔔 Notifications Toggle */}
      <div className={styles.settingsGroup}>
        <label>Notifications</label>
        <div 
          className={styles.toggle} 
          onClick={() => setNotifications(!notifications)}
        >
          {notifications ? (
            <ToggleRight size={32} color="#4caf50" />
          ) : (
            <ToggleLeft size={32} color="#f44336" />
          )}
        </div>
      </div>

      {/* 💾 Save Button */}
      <div className={styles.saveBtn} onClick={handleSave}>
        {loading ? <Loader size={20} className={styles.spinner} /> : <Save size={20} />}
        Save Changes
      </div>
    </div>
  );
};

export default Settings;
