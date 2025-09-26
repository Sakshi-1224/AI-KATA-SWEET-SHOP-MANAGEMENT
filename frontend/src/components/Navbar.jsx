// frontend/src/components/Navbar.jsx
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
          🍬 Sweet Shop
        </Link>
        
        <div className="navbar-nav">
          {user ? (
            <div className="navbar-user">
              <span>Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <a href="http://localhost:3001" style={{color: '#ff6b6b', marginRight: '10px'}}>
                  Admin Panel
                </a>
              )}
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{marginRight: '10px', color: '#ff6b6b'}}>
                Login
              </Link>
              <Link to="/register" style={{color: '#ff6b6b'}}>
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