import React from 'react';
import { Power, Shield, Zap, BarChart } from 'lucide-react'; 
import FanControl from '../components/FanControl';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Smart Home</h1>
          <p>Control and monitor your home devices with ease and efficiency.</p>
          <button className="cta-btn" onClick={() => window.scrollTo(0, 800)}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <Power size={48} className="feature-icon" />
          <h3>Instant Control</h3>
          <p>Switch devices on and off instantly with a single click.</p>
        </div>
        <div className="feature">
          <Shield size={48} className="feature-icon" />
          <h3>Secure & Reliable</h3>
          <p>End-to-end encryption keeps your data safe.</p>
        </div>
        <div className="feature">
          <Zap size={48} className="feature-icon" />
          <h3>Energy Efficiency</h3>
          <p>Monitor and reduce power consumption easily.</p>
        </div>
        <div className="feature">
          <BarChart size={48} className="feature-icon" />
          <h3>Analytics</h3>
          <p>View real-time reports and usage statistics.</p>
        </div>
      </section>

      {/* Fan Control Section */}
      <section className="fan-section">
        <h2>Fan Control</h2>
        <FanControl />
      </section>
    </div>
  );
};

export default Home;
