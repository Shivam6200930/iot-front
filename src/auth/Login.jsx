import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/login', { email, password });
      console.log(data.user.email)
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('token', data.token);
      alert('Login successful');
      navigate('/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <input 
        className={styles.input} 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        className={styles.input} 
        placeholder="Password" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className={styles.button} onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
