import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from '../css/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <div className={styles.contactItem}>
            <Mail size={18} /> <span>mandalshivam962@gmail.com</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} /> <span>+91 6200874XXX</span>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={18} /> <span>Kolkata,India</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/device">Devices</a></li>
            <li><a href="/automation">Automation</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>© 2025 Smart Home Controller. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
