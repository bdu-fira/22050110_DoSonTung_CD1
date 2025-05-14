import React from 'react';
import { Link } from 'react-router-dom'; // Thêm import Link
import { useTranslation } from '../../context/TranslationContext';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t('about_us')}</h4>
          <p>{t('your_trusted_online_bookstore_since_2025')}</p>
        </div>
        <div className="footer-section">
          <h4>{t('quick_links')}</h4>
          <ul>
            <li><Link to="/books">{t('books')}</Link></li>
            <li><Link to="/profile">{t('profile')}</Link></li>
            <li><Link to="/cart">{t('cart')}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t('contact')}</h4>
          <p>Email: support@bookstore.com</p>
          <p>{t('phone')}: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{ textAlign: 'center' }}>&copy; {t('2025 Bookstore. All rights reserved.')}</p>
      </div>
    </footer>
  );
}

export default Footer;