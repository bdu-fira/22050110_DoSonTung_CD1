// src/components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/TranslationContext';

function Navbar({ setCartItems }) {
  const { user, isAdmin, isEmployee, logout } = useAuth();
  const { t, language, switchLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setCartItems([]);
    localStorage.removeItem('cartItems');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Bookstore</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/">{t('home')}</Link>
          <Link to="/books">{t('books')}</Link>
          <Link to="/cart">{t('cart')}</Link>
          {user ? (
            <>
              <Link to="/profile">{user.userName}</Link>
              {isAdmin && <Link to="/admin">{t('admin')}</Link>}
              {isEmployee && <Link to="/employee">{user.userName} - {t('employee')}</Link>}
              <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login">{t('login')}</Link>
              <Link to="/register">{t('register')}</Link>
            </>
          )}
          <select
            value={language}
            onChange={(e) => switchLanguage(e.target.value)}
            className="language-switch"
          >
            <option value="vi">{t('language_vi')}</option>
            <option value="en">{t('language_en')}</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
