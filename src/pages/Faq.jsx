import React, { useState } from 'react';
import styles from '../css/Faq.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'How do I connect my smart devices to the app?',
    answer: 'You can connect your devices through the "Add Device" option in the app settings. Make sure your device is powered on and nearby.',
  },
  {
    question: 'What should I do if my device is not responding?',
    answer: 'First, check your internet connection. If the problem persists, try resetting the device and reconnecting it to the app.',
  },
  {
    question: 'Is my smart home data secure?',
    answer: 'Absolutely! We use advanced encryption protocols to ensure your data remains private and secure.',
  },
  {
    question: 'Can I control devices when I am not at home?',
    answer: 'Yes, with our cloud-connected technology, you can control your devices from anywhere through the app.',
  },
  {
    question: 'How can I get support if needed?',
    answer: 'You can reach out to our support team via Email, Phone, or Live Chat from our Support Center page.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about your smart home setup.</p>
      </div>

      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
              <h2>{faq.question}</h2>
              {openIndex === index ? (
                <ChevronUp size={24} className={styles.icon} />
              ) : (
                <ChevronDown size={24} className={styles.icon} />
              )}
            </div>
            {openIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
