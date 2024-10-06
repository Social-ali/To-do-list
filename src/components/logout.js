import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert'; // Import Alert component
import './Notesitem.css'; // Import CSS for styling

const Logout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem('authToken');

    // Optionally, you can add a message or alert here about logout
    setAlert({ message: 'You have been logged out. Please log in again.', type: 'info' });
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle login success
      setAlert({ message: 'Login successful! Redirecting...', type: 'success' });
      localStorage.setItem('authToken', data.authToken); // Store token
      setTimeout(() => navigate('/archive'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setAlert({ message: 'Error logging in: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className="up-container">
      <div className="wrapper">
        <div className="title">Login Form</div>
        {alert.message && <Alert message={alert.message} type={alert.type} />}
        <form onSubmit={handleLoginSubmit}>
          <div className="field">
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <a href="/signup">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logout;
