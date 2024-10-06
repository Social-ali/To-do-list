import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Notestate from './context/Notes/Notestate';
import About from './components/About';
import Contact from './components/Contact';
import Alert from './components/Alert';
import YourNotes from './components/YourNotes';
import AddNote from './components/AddNote';
import Login from './components/login';
import SignUp from './components/signup';
import Logout from './components/logout';
import Pencil from './components/Pencil';
import Search from './components/Search';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if user is authenticated
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and apply class to body
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // Apply dark mode class based on initial state
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <Notestate>
      <Router>
        <div className="App">
          <Navbar toggleDarkMode={toggleDarkMode} />
          <Alert />
          <Routes>
            {/* Redirect to login page if not authenticated */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/addnote" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/addnote" /> : <Login />} 
            />
            <Route 
              path="/signup" 
              element={isAuthenticated ? <Navigate to="/addnote" /> : <SignUp />} 
            />
            <Route 
              path="/addnote" 
              element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/archive" 
              element={isAuthenticated ? <YourNotes /> : <Navigate to="/login" />} 
            />
            <Route
              path="/search"
              element={isAuthenticated ? <Search /> : <Navigate to="/archive" />}
            />
            <Route 
              path="/logout" 
              element={<Logout />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pencil" element={<Pencil />} />

          </Routes>
        </div>
      </Router>
    </Notestate>
  );
};

export default App;
