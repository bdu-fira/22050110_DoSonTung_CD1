import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';

function Checkout({ setCartItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearCart } = useAuth();
  const { t } = useTranslation();
  const { cartItems } = location.state || { cartItems: [] };
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'cash',
    paymentDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError(t('please_login_to_place_order'));
      return;
    }

    try {
      const orderData = {
        customerId: user.id,
        customerName: formData.name,
        items: cartItems,
        total: total,
        status: t('pending_confirmation'),
        shippingInfo: {
          address: formData.address,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
          paymentDate: formData.paymentDate
        }
      };
      // Tạo đơn hàng
      await api.createOrder(orderData);

      // Giảm số lượng sách trong kho
      for (const item of cartItems) {
        const book = await api.getBookById(item.id);
        const newQuantity = book.data.quantity - item.quantity;
        if (newQuantity >= 0) {
          await api.updateBook(item.id, { ...item, quantity: newQuantity });
        } else {
          throw new Error(`Sách ${item.title} không đủ số lượng trong kho`);
        }
      }

      // Xóa giỏ hàng sau khi đặt hàng thành công
      clearCart();
      setCartItems([]);
      alert(t('order_placed_successfully'));
      navigate('/books');
    } catch (error) {
      console.error(t('error_placing_order'), error);
      setError(t('failed_to_place_order'));
    }
  };

  return (
    <div className="checkout-page">
      <h1>{t('checkout')}</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="checkout-container">
        <div className="order-summary">
          <h3>{t('order_summary')}</h3>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.title} (x{item.quantity})</span>
              <span>{(item.price * item.quantity).toLocaleString('vi-VN')} VND</span>
            </div>
          ))}
          <div className="total">
            <strong>{t('total')}:</strong>
            <strong>{total.toLocaleString('vi-VN')} VND</strong>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>{t('shipping_info')}</h3>
          <div className="form-group">
            <label>{t('full_name')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('address')}</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('phone')}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('payment_method')}</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <option value="cash">{t('cash_on_delivery')}</option>
              <option value="card">{t('credit_card')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('payment_date')}</label>
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="place-order-btn">{t('place_order')}</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;