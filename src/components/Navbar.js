import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Notesitem.css';

const Navbar = ({ toggleDarkMode }) => {
  const location = useLocation();

  return (
    <div>
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        <button onClick={toggleDarkMode} className="btn btn-outline-primary mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-highlights" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-8 5v1H4.5a.5.5 0 0 0-.093.009A7 7 0 0 1 3.1 13zm0-1H2.255a7 7 0 0 1-.581-1H8zm-6.71-2a7 7 0 0 1-.22-1H8v1zM1 8q0-.51.07-1H8v1zm.29-2q.155-.519.384-1H8v1zm.965-2q.377-.54.846-1H8v1zm2.137-2A6.97 6.97 0 0 1 8 1v1z"/>
          </svg>
          Dark
        </button>
        <Link to="/login" className="btn btn-outline-primary mx-2">Login</Link>
        <Link to="/signup" className="btn btn-outline-primary mx-2">Sign Up</Link>
        <Link to="/logout" className="btn btn-outline-primary mx-2">Log out</Link>
      </div>
      <ul className="menu">
        <li title="home">
          <Link to="/" className={`menu-button home ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        </li>
        <li title="search">
          <Link to="/search" className={`search ${location.pathname === '/search' ? 'active' : ''}`}>Search</Link>
        </li>
        <li title="pencil">
          <Link to="/pencil" className={`pencil ${location.pathname === '/pencil' ? 'active' : ''}`}>Pencil</Link>
        </li>
        <li title="about">
          <Link to="/about" className={`about ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
        </li>
        <li title="archive">
          <Link to="/archive" className={`archive ${location.pathname === '/archive' ? 'active' : ''}`}>Notes</Link>
        </li>
        <li title="contact">
          <Link to="/contact" className={`contact ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </li>
        <li title="add-note">
          <Link to="/your-notes" className={`add-note ${location.pathname === '/your-notes' ? 'active' : ''}`}>Add Note</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
