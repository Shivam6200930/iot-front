import React, { useState } from 'react';
import styles from '../css/Support.module.css';
import { Mail, Phone, MessageCircle, X, Send } from 'lucide-react';

const Support = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! 👋 Ask me anything about your smart home or IoT devices.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChatClick = () => {
    setShowChatbot(true);
  };

  const handleCloseChat = () => {
    setShowChatbot(false);
    setMessages([
      { sender: 'bot', text: 'Hello! 👋 Ask me anything about your smart home or IoT devices.' }
    ]);
    setUserInput('');
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error fetching chatbot reply:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.supportPage}>
      <div className={styles.titleSection}>
        <h1>Support Center</h1>
        <p>We’re here to help you with all your smart home needs.</p>
      </div>

      <div className={styles.contactOptions}>
        <div className={styles.card}>
          <Mail size={40} className={styles.icon} />
          <h2>Email Us</h2>
          <p>support@smarthome.com</p>
        </div>

        <div className={styles.card}>
          <Phone size={40} className={styles.icon} />
          <h2>Call Support</h2>
          <p>+91 620087XXX0</p>
        </div>

        <div className={styles.card} onClick={handleChatClick}>
          <MessageCircle size={40} className={styles.icon} />
          <h2>Live Chat</h2>
          <p>Available in-app 24/7</p>
        </div>
      </div>

      <div className={styles.faqSection}>
        <h2>FAQs</h2>
        <p>Find quick answers <a href="/faq" className={styles.link}>here</a>.</p>
      </div>

      {showChatbot && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatHeader}>
            <h3>SmartHome Chatbot</h3>
            <X size={24} onClick={handleCloseChat} className={styles.closeIcon} />
          </div>
          <div className={styles.chatBody}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.botMessage}>Typing...</div>}
          </div>
          <div className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Ask about IoT setup, devices, issues..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.chatInput}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
