// src/components/Alert.js
import React, { useState, useEffect } from 'react';
import './Notesitem.css'; // Assuming you have some CSS for styling the alert

function Alert({ message, type = 'success', duration = 5000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); // Call the onClose callback if provided
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      <center>{message}</center>
    </div>
  );
}

export default Alert;
