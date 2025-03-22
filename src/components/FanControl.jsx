import React, { useState } from 'react';
import axios from 'axios';
import '../css/FanControl.css';  // Style it with CSS

const FanControl = () => {
  const [status, setStatus] = useState('OFF');
  const email = localStorage.getItem("email");

  const toggleLED = async (ledState) => {
    try {
      await axios.post('http://localhost:5001/api/user/led', { ledState , email});
      setStatus(ledState);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>LED Control</h1>
      <p>Current Status: {status}</p>
      <div className="buttons">
        <button onClick={() => toggleLED('ON')} className="on-btn">LED ON</button>
        <button onClick={() => toggleLED('OFF')} className="off-btn">LED OFF</button>
      </div>
    </div>
  );
};

export default FanControl;
