import React from 'react';
import styles from '../css/Header.module.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate();
  return (
    <header className={styles.header}>
      <h1>IoT Fan Controller</h1>
      <div onClick={()=>navigate('/login')}>Login</div>
      <div onClick={()=>navigate('/signup')}>Singup</div>
    </header>
  );
};

export default Header;
