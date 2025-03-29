import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import styles from '../css/singup.module.css';  // Import CSS module

const Signup = () => {
  const navigate = useNavigate();

  // ✅ Grouped states for better management
  const [activeTab, setActiveTab] = useState('email');
  
  // Email Signup State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Phone Signup State
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // ✅ Tab Switch Function
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
  };

  // ✅ Email Signup with Toast Promise
  const handleEmailSignup = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const signupPromise = axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, { email, password });

    toast.promise(signupPromise, {
      loading: 'Signing up...',
      success: 'Signup successful 🎉',
      error: 'Signup failed ❌'
    });

    try {
      await signupPromise;
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }

    const otpPromise = axios.post(`${import.meta.env.VITE_API_URL}/user/send-otp`, { phone });

    toast.promise(otpPromise, {
      loading: 'Sending OTP...',
      success: `OTP sent to ${phone} 🚀`,
      error: 'Failed to send OTP ❌'
    });

    try {
      await otpPromise;
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      toast.error('Enter the OTP');
      return;
    }

    const verifyPromise = axios.post(`${import.meta.env.VITE_API_URL}/user/verify-otp`, { phone, otp });

    toast.promise(verifyPromise, {
      loading: 'Verifying OTP...',
      success: 'OTP verified successfully ✅',
      error: 'Invalid OTP ❌'
    });

    try {
      const { data } = await verifyPromise;
      if (data.success) {
        setOtpVerified(true);  // ✅ Enable phone signup button
        toast.success('Phone number verified');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Phone Signup
  const handlePhoneSignup = async () => {
    if (!phone || !otpVerified) {
      toast.error('Please verify your phone number first');
      return;
    }

    const signupPromise = axios.post(`${import.meta.env.VITE_API_URL}/user/signup-phone`, { phone });

    toast.promise(signupPromise, {
      loading: 'Signing up...',
      success: 'Signup successful 🎉',
      error: 'Signup failed ❌'
    });

    try {
      await signupPromise;
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* ✅ Tab Header */}
      <div className={styles.header}>
        <div
          className={`${styles.tab} ${activeTab === 'email' ? styles.active : ''}`}
          onClick={() => handleTabClick('email')}
        >
          Email Signup
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'mobile' ? styles.active : ''}`}
          onClick={() => handleTabClick('mobile')}
        >
          Mobile Signup
        </div>
      </div>

      {/* ✅ Render Email or Mobile Section */}
      {activeTab === 'email' ? (
        <div className={styles.card}>
          <h2>Email Signup</h2>
          
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
          <button className={styles.button} onClick={handleEmailSignup}>
            Signup with Email
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <h2>Mobile Signup</h2>
          
          {/* ✅ Phone Field with Verify Button */}
          <div className={styles.phoneGroup}>
            <input
              className={styles.input}
              placeholder="Phone Number"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              className={styles.verifyButton} 
              onClick={sendOtp}
              disabled={otpSent}
            >
              {otpSent ? 'OTP Sent' : 'Verify'}
            </button>
          </div>

          {/* ✅ OTP Section */}
          {otpSent && (
            <>
              <input
                className={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button 
                className={styles.button} 
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            </>
          )}

          {/* ✅ Phone Signup Button */}
          <button
            className={styles.button}
            onClick={handlePhoneSignup}
            disabled={!otpVerified}  // ✅ Disable until OTP is verified
          >
            Signup with Phone
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
