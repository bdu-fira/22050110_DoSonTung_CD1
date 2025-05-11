// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { useTranslation } from '../context/TranslationContext';

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.forgotPassword({ email });
      setMessage(t('password_reset_link_sent'));
      setError('');
    } catch (err) {
      // Kiểm tra lỗi cụ thể từ API
      if (err.response?.data?.error === 'Email not found') {
        setError(t('email_not_found')); // Thông báo lỗi email không tồn tại
      } else {
        setError(t('failed_to_send_reset_link')); // Lỗi chung
      }
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('forgot_password')}</h2>
        <p className="auth-subtitle">{t('enter_your_email_to_reset_password')}</p>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">{t('send_reset_link')}</button>
        </form>
        <div className="auth-links">
          <Link to="/login" className="back-to-login-link">
            <button className="back-to-login-btn">{t('back_to_login')}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;