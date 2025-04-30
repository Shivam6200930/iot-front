import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Toaster, toast } from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';  // ✅ Theme Icons
import { useTheme } from '../context/ThemeContext';
import styles from '../css/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    toast.promise(
      axios.post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password }),
      {
        loading: 'Logging in...',
        success: (res) => {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('id', res.data.user._id);
          localStorage.setItem('email', res.data.user.email);
          localStorage.setItem('token', res.data.token);

          navigate('/home');
          return 'Login successful!';
        },
        error: (error) => {
          console.error('Login error:', error);
          return error.response?.data?.message || 'Login failed!';
        }
      }
    );
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);

      toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/user/google-login`, {
          token: response.credential
        }),
        {
          loading: 'Logging in with Google...',
          success: (res) => {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('id', res.data.user._id);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('token', res.data.token);

            navigate('/home');
            return 'Google Login successful!';
          },
          error: () => 'Google login failed!'
        }
      );
    } catch {
      toast.error('Google login failed');
    }
  };

  const handleGoogleLoginError = () => {
    toast.error('Google login failed');
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <Toaster position="top-center" reverseOrder={false} />

      

      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>

        <p>
          <Link to='/forgot-password' className={styles.link}>Forgot Password?</Link>
        </p>

        <div className={styles.divider}>OR</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />

      </div>
    </div>
  );
};

export default Login;
