import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash, Edit, Save, XCircle } from 'lucide-react';
import styles from '../css/Devices.module.css';
import { Toaster, toast } from 'react-hot-toast';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [newDevice, setNewDevice] = useState({ name: '', type: '', state: 'OFF' });

  const userId = localStorage.getItem('id');
  const API_URL = `${import.meta.env.VITE_API_URL}/devices`;

  // ✅ Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      toast.promise(
        axios.get(`${import.meta.env.VITE_API_URL}/user/getUser/${userId}`),
        {
          loading: 'Loading devices...',
          success: (res) => {
            setDevices(res.data.devices);
            setLoading(false);
            return 'Devices loaded successfully!';
          },
          error: 'Failed to load devices'
        }
      );
    };

    fetchDevices();
  }, [userId, API_URL]);

  // ✅ Add a new device
  const handleAddDevice = async () => {
    if (!newDevice.name || !newDevice.type) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.promise(
      axios.post(`${API_URL}/add/${userId}`, newDevice),
      {
        loading: 'Adding device...',
        success: (res) => {
          setDevices(res.data.devices);
          setNewDevice({ name: '', type: '', state: 'OFF' });
          return 'Device added successfully!';
        },
        error: 'Failed to add device'
      }
    );
  };

  // ✅ Delete a device
  const handleDelete = async (deviceId) => {
    toast.promise(
      axios.delete(`${API_URL}/delete/${userId}/${deviceId}`),
      {
        loading: 'Deleting device...',
        success: (res) => {
          setDevices(res.data.devices);
          return 'Device deleted successfully!';
        },
        error: 'Failed to delete device'
      }
    );
  };

  // ✅ Update a device
  const handleUpdate = async (deviceId, updatedDevice) => {
    toast.promise(
      axios.put(`${API_URL}/update/${userId}/${deviceId}`, updatedDevice),
      {
        loading: 'Updating device...',
        success: (res) => {
          setDevices(res.data.devices);
          setEditMode(null);
          return 'Device updated successfully!';
        },
        error: 'Failed to update device'
      }
    );
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Device Management</h1>

      {/* ✅ Add New Device Form */}
      <div className={styles.addForm}>
        <input 
          type="text" 
          placeholder="Device Name" 
          value={newDevice.name} 
          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Device Type" 
          value={newDevice.type} 
          onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })} 
        />
        <select 
          value={newDevice.state} 
          onChange={(e) => setNewDevice({ ...newDevice, state: e.target.value })}
        >
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>
        <button onClick={handleAddDevice} disabled={loading}>
          {loading ? 'Adding...' : <><Plus size={20} /> Add Device</>}
        </button>
      </div>

      {/* ✅ Device List */}
      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <div className={styles.deviceList}>
          {devices.map((device) => (
            <div key={device._id} className={styles.deviceCard}>
              {editMode === device._id ? (
                <div className={styles.editForm}>
                  <input 
                    type="text" 
                    value={device.name} 
                    onChange={(e) => 
                      setDevices(devices.map(d => d._id === device._id ? { ...d, name: e.target.value } : d))
                    } 
                  />
                  <input 
                    type="text" 
                    value={device.type} 
                    onChange={(e) => 
                      setDevices(devices.map(d => d._id === device._id ? { ...d, type: e.target.value } : d))
                    } 
                  />
                  <select
                    value={device.state}
                    onChange={(e) => 
                      setDevices(devices.map(d => d._id === device._id ? { ...d, state: e.target.value } : d))
                    }
                  >
                    <option value="ON">ON</option>
                    <option value="OFF">OFF</option>
                  </select>
                  <div className={styles.actionButtons}>
                    <Save 
                      size={20} 
                      onClick={() => handleUpdate(device._id, device)} 
                      disabled={loading}
                    />
                    <XCircle size={20} onClick={() => setEditMode(null)} />
                  </div>
                </div>
              ) : (
                <>
                  <h3>{device.name}</h3>
                  <p>Type: {device.type}</p>
                  <p>State: {device.state}</p>
                  <div className={styles.actionButtons}>
                    <Edit size={20} onClick={() => setEditMode(device._id)} />
                    <Trash size={20} onClick={() => handleDelete(device._id)} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
