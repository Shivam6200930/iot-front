import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import styles from '../css/Analytics.module.css';

const Analytics = () => {
  const data = [
    { name: 'Mon', Power: 30, Temperature: 25 },
    { name: 'Tue', Power: 40, Temperature: 28 },
    { name: 'Wed', Power: 35, Temperature: 26 },
    { name: 'Thu', Power: 50, Temperature: 30 },
    { name: 'Fri', Power: 45, Temperature: 27 },
    { name: 'Sat', Power: 55, Temperature: 32 },
    { name: 'Sun', Power: 60, Temperature: 29 }
  ];

  return (
    <div className={styles.container}>
      <h1>Analytics Overview</h1>

      <div className={styles.chartContainer}>
        <div className={styles.chartCard}>
          <h2>Power Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Power" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h2>Temperature Monitoring</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Temperature" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
