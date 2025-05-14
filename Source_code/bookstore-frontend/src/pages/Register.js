import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../services/api';
import { useTranslation } from '../context/TranslationContext';

function Register() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError(t('passwords_do_not_match') || 'Passwords do not match');
      return;
    }

    try {
      await api.registerUser({
        userName: userData.userName,
        email: userData.email,
        address: userData.address,
        password: userData.password,
      });

      navigate('/login');
    } catch (err) {
      const backendError = err?.response?.data?.error;
      setError(backendError || t('registration_failed') || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('create_account')}</h2>
        <p className="auth-subtitle">{t('join_our_bookstore_community')}</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t('name')}</label>
            <input
              type="text"
              value={userData.userName}
              onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
              placeholder={t('enter_your_username')}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder={t('enter_your_email')}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('address')}</label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              placeholder={t('enter_your_address')}
            />
          </div>
          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              placeholder={t('create_a_password')}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('confirm_password')}</label>
            <input
              type="password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              placeholder={t('confirm_your_password')}
              required
            />
          </div>
          <button type="submit" className="auth-button">{t('register')}</button>
        </form>
        <p className="auth-link">
          {t('already_have_an_account')} <Link to="/login">{t('login_here')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
