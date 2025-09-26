// admin-panel/src/components/SweetForm.jsx
import React, { useState, useEffect } from 'react';
import './SweetForm.css';

const SweetForm = ({ sweet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'chocolate',
    price: '',
    quantity: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || 'chocolate',
        price: sweet.price || '',
        quantity: sweet.quantity || '',
        description: sweet.description || '',
        image: sweet.image || ''
      });
    }
  }, [sweet]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    });
  };

  return (
    <div className="sweet-form-overlay">
      <div className="sweet-form">
        <h3>{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="chocolate">Chocolate</option>
              <option value="candy">Candy</option>
              <option value="biscuit">Biscuit</option>
              <option value="cake">Cake</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {sweet ? 'Update' : 'Create'} Sweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetForm;