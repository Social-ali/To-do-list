import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert'; // Import Alert component
import './Notesitem.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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
      // Handle sign-up success
      setAlert({ message: 'Sign-up successful! Redirecting...', type: 'success' });
      localStorage.setItem('authToken', data.authToken); // Store token
      setTimeout(() => navigate('/addnote'), 2000); // Redirect to AddNote after 2 seconds
    } catch (error) {
      setAlert({ message: 'Error signing up: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className="up-container">
      <div className="wrapper">
        <div className="title">Sign-Up Form</div>
        {alert.message && <Alert message={alert.message} type={alert.type} />}
        <form onSubmit={handleSubmit}>
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
          <div className="field">
            <input type="submit" value="Sign Up" />
          </div>
          <div className="login-link">
            Already a member? <a href="/login">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
