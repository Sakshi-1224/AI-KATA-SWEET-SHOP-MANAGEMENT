// admin-panel/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🍬 Sweet Shop Admin
        </Link>
        
        <div className="navbar-nav">
          {user ? (
            <div className="navbar-user">
              <span>Welcome, Admin {user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{marginRight: '10px', color: '#4CAF50'}}>
                Login
              </Link>
              <Link to="/register" style={{color: '#4CAF50'}}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;