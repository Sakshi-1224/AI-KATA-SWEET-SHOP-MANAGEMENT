// admin-panel/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import sweetService from '../services/sweetService';
import adminSweetService from '../services/adminSweetService';
import SweetForm from '../components/SweetForm';
import SweetList from '../components/SweetList';
import RestockModal from '../components/RestockModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [restockingSweet, setRestockingSweet] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAllSweets();
      setSweets(data);
    } catch (error) {
      console.error('Error loading sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSweet = async (sweetData) => {
    try {
      await adminSweetService.createSweet(sweetData);
      setShowForm(false);
      loadSweets();
      alert('Sweet created successfully!');
    } catch (error) {
      alert('Error creating sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateSweet = async (sweetData) => {
    try {
      await adminSweetService.updateSweet(editingSweet._id, sweetData);
      setEditingSweet(null);
      loadSweets();
      alert('Sweet updated successfully!');
    } catch (error) {
      alert('Error updating sweet: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await adminSweetService.deleteSweet(sweetId);
        loadSweets();
        alert('Sweet deleted successfully!');
      } catch (error) {
        alert('Error deleting sweet: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    try {
      await adminSweetService.restockSweet(sweetId, quantity);
      setRestockingSweet(null);
      loadSweets();
      alert('Restock successful!');
    } catch (error) {
      alert('Error restocking: ' + (error.response?.data?.message || error.message));
    }
  };

  if (user?.role !== 'admin') {
    return <div className="access-denied">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Sweet
        </button>
      </div>

      {(showForm || editingSweet) && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={editingSweet ? handleUpdateSweet : handleCreateSweet}
          onCancel={() => {
            setShowForm(false);
            setEditingSweet(null);
          }}
        />
      )}

      {restockingSweet && (
        <RestockModal
          sweet={restockingSweet}
          onRestock={handleRestock}
          onClose={() => setRestockingSweet(null)}
        />
      )}

      {loading ? (
        <div className="loading">Loading sweets...</div>
      ) : (
        <SweetList
          sweets={sweets}
          onEdit={setEditingSweet}
          onDelete={handleDeleteSweet}
          onRestock={setRestockingSweet}
        />
      )}
    </div>
  );
};

export default AdminDashboard;