import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/ControlsDevices.module.css'; 
import { Power, Loader, AlertCircle } from 'lucide-react';

const ControlsDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('id'); // Get the user ID from localStorage

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/devices/${userId}/devices`);
        setDevices(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load devices');
        setLoading(false);
      }
    };
    fetchDevices();
  }, [userId]);

  const toggleDevice = async (deviceId, currentState) => {
    const newState = currentState === 'ON' ? 'OFF' : 'ON';
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/devices/${userId}/devices/${deviceId}`, {
        state: newState
      });

      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === deviceId ? { ...device, state: newState } : device
        )
      );
    } catch (err) {
      console.error('Error toggling device:', err);
    }
  };

  if (loading) return <div className={styles.loading}><Loader size={30} /> Loading...</div>;
  if (error) return <div className={styles.error}><AlertCircle size={24} /> {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Control Devices</h1>
      <div className={styles.devicesGrid}>
        {devices.map((device) => (
          <div key={device._id} className={styles.deviceCard}>
            <h3>{device.name}</h3>
            <p>Type: {device.type}</p>
            <button
              className={device.state === 'ON' ? styles.on : styles.off}
              onClick={() => toggleDevice(device._id, device.state)}
            >
              <Power size={18} /> {device.state}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlsDevices;
