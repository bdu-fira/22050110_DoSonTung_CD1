import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';

function Login() {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Gửi { identifier, password } đến backend
      const userData = await login(credentials);

      console.log('Login successful, userData:', userData);
      const role = userData.role ? userData.role.toLowerCase() : '';

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/employee');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err?.response?.data?.error || t('invalid_credentials') || 'Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('login')}</h2>
        <p className="auth-subtitle">{t('sign_in')}</p>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('username_or_email')}</label>
            <input
              type="text"
              value={credentials.identifier}
              onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-button">{t('login')}</button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password" className="forgot-password-link">
            <button className="forgot-password-btn">{t('forgot_password')}</button>
          </Link>
          <div className="auth-link">
            {t('dont_have_account')} <Link to="/register">{t('register')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
