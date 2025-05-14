import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';

function Cart() {
  const navigate = useNavigate();
  const { user, cartItems, updateQuantity, removeItem } = useAuth();
  const { t } = useTranslation();

  const placeOrder = () => {
    if (!user) {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
      return;
    }
    if (cartItems.length > 0) {
      navigate('/checkout', { state: { cartItems } });
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">{t('shopping_cart')}</h1>
      <div className="cart-wrapper">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>{t('your_cart_is_currently_empty')}</p>
            <Link to="/books" className="continue-shopping-btn">{t('browse_books')}</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img 
                    src={item.coverImage || 'https://via.placeholder.com/100x150'} 
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="author">{item.author}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <span className="price">{(item.price * item.quantity).toLocaleString('vi-VN')} VND</span>
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary-card">
              <div className="summary-details">
                <span>{t('total')} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="total-price">{total.toLocaleString('vi-VN')} VND</span>
              </div>
              <button 
                className="checkout-button"
                onClick={placeOrder}
              >
                {t('proceed_to_checkout')}
              </button>
              <Link to="/books" className="continue-shopping-link">{t('continue_shopping')}</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;