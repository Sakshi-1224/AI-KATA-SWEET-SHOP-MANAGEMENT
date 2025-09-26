import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import sweetService from '../services/sweetService';
import SweetCard from '../components/SweetCard';
import './Dashboard.css';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      setError('');
      const filters = {};
      if (searchTerm) filters.search = searchTerm;
      if (categoryFilter) filters.category = categoryFilter;
      
      const data = await sweetService.getAllSweets(filters);
      setSweets(data);
    } catch (error) {
      console.error('Error loading sweets:', error);
      setError('Failed to load sweets. Please try again.');
      setSweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (sweetId) => {
    try {
      await sweetService.purchaseSweet(sweetId);
      loadSweets();
      alert('🎉 Purchase successful! Thank you for your order.');
    } catch (error) {
      alert('❌ Purchase failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadSweets();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    loadSweets();
  };

  const categories = ['chocolate', 'candy', 'biscuit', 'cake', 'other'];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Sweet Shop, {user?.name}! 👋</h1>
        <p>Discover our delicious collection of handcrafted sweets and desserts</p>
      </div>

      <div className="controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="🔍 Search sweets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #ecf0f1',
              borderRadius: '25px',
              fontSize: '1rem',
              outline: 'none'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button type="submit">Search</button>
          <button type="button" onClick={clearFilters}>Clear</button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading delicious sweets...</div>
      ) : (
        <>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#7f8c8d',
            fontSize: '1.1rem'
          }}>
            Found {sweets.length} sweet{sweets.length !== 1 ? 's' : ''}
          </div>
          
          <div className="sweets-grid">
            {sweets.map(sweet => (
              <SweetCard 
                key={sweet._id} 
                sweet={sweet} 
                onPurchase={handlePurchase}
                showPurchase={user?.role === 'user'}
              />
            ))}
          </div>
        </>
      )}

      {!loading && sweets.length === 0 && !error && (
        <div className="no-results">
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍬</div>
          <h3>No sweets found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;