import React from 'react';
import './SweetCard.css';

const SweetCard = ({ sweet, onPurchase, showPurchase }) => {
  const handlePurchase = () => {
    if (sweet.quantity > 0) {
      onPurchase(sweet._id);
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      chocolate: '🍫',
      candy: '🍭',
      biscuit: '🍪',
      cake: '🎂',
      other: '🍬'
    };
    return icons[category] || '🍬';
  };

  // Get placeholder image based on category
  const getPlaceholderImage = (category) => {
    const images = {
      chocolate: `https://source.unsplash.com/300x200/?chocolate,sweet`,
      candy: `https://source.unsplash.com/300x200/?candy,sweet`,
      biscuit: `https://source.unsplash.com/300x200/?biscuit,cookie`,
      cake: `https://source.unsplash.com/300x200/?cake,dessert`,
      other: `https://source.unsplash.com/300x200/?sweet,dessert`
    };
    return images[category] || 'https://source.unsplash.com/300x200/?dessert,sweet';
  };

  return (
    <div 
      className={`sweet-card ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}
      data-category={sweet.category}
    >
      <div className="sweet-image">
        {sweet.image ? (
          <img src={sweet.image} alt={sweet.name} />
        ) : (
          <img src={getPlaceholderImage(sweet.category)} alt={sweet.name} />
        )}
        <div className="category-badge">
          {getCategoryIcon(sweet.category)} {sweet.category}
        </div>
      </div>
      
      <div className="sweet-info">
        <h3 className="sweet-name">{sweet.name}</h3>
        <p className="sweet-description">
          {sweet.description || 'A delicious sweet treat that will satisfy your cravings!'}
        </p>
        
        <div className="sweet-details">
          <span className="sweet-price">${sweet.price?.toFixed(2) || '0.00'}</span>
          <span className={`sweet-quantity ${sweet.quantity === 0 ? 'out-of-stock' : 'in-stock'}`}>
            {sweet.quantity === 0 ? 'Out of Stock' : `${sweet.quantity} left`}
          </span>
        </div>

        {showPurchase && (
          <button 
            className="purchase-btn"
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
          >
            {sweet.quantity === 0 ? 'Out of Stock' : `Add to Cart - $${sweet.price?.toFixed(2)}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default SweetCard;