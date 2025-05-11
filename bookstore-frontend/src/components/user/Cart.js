// src/components/user/Cart.js
import React from 'react';

function Cart({ cartItems, removeFromCart, placeOrder }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      {cartItems.length > 0 && (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.author}</p>
                </div>
                <div className="item-price">
                  <span>${item.price.toFixed(2)}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button 
              className="checkout-btn"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;