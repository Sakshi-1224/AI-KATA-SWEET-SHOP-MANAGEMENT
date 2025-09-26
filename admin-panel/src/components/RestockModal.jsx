// admin-panel/src/components/RestockModal.jsx
import React, { useState } from 'react';
import './RestockModal.css';

const RestockModal = ({ sweet, onRestock, onClose }) => {
  const [quantity, setQuantity] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRestock(sweet._id, parseInt(quantity));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Restock {sweet.name}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="modal-body">
          <p>Current stock: <strong>{sweet.quantity}</strong></p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Quantity to add:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Restock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestockModal;