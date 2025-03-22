import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/singup.module.css' // Import CSS module

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5001/api/signup', { email, password });
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
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
      <button className={styles.button} onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
