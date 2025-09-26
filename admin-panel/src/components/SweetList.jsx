// admin-panel/src/components/SweetList.jsx
import React from 'react';
import './SweetList.css';

const SweetList = ({ sweets, onEdit, onDelete, onRestock }) => {
  return (
    <div className="sweet-list">
      <h2>Manage Sweets ({sweets.length} items)</h2>
      <div className="sweets-table-container">
        <table className="sweets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map(sweet => (
              <tr key={sweet._id}>
                <td>
                  <div className="sweet-info">
                    {sweet.image && (
                      <img src={sweet.image} alt={sweet.name} className="sweet-thumbnail" />
                    )}
                    <div>
                      <div className="sweet-name">{sweet.name}</div>
                      {sweet.description && (
                        <div className="sweet-description">{sweet.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="category">{sweet.category}</td>
                <td className="price">${sweet.price.toFixed(2)}</td>
                <td className={`quantity ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
                  {sweet.quantity}
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(sweet)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => onRestock(sweet)} className="btn-restock">
                    Restock
                  </button>
                  <button onClick={() => onDelete(sweet._id)} className="btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SweetList;