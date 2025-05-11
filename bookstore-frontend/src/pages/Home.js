import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const encodedQuery = encodeURIComponent(trimmedQuery);
      console.log('Search query:', trimmedQuery);
      navigate(`/books?search=${encodedQuery}`);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>{t('welcome_to_our_bookstore')}</h1>
        <p>{t('discover_your_next_favorite_book_with_us')}</p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_for_books')}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </form>

        <Link to="/books" className="cta-button">{t('browse_books')}</Link>
      </div>

      <div className="features">
        <div className="feature-item">
          <h3>{t('wide_selection')}</h3>
          <p>{t('thousands_of_books_across_all_genres')}</p>
        </div>
        <div className="feature-item">
          <h3>{t('fast_delivery')}</h3>
          <p>{t('get_your_books_delivered_quickly')}</p>
        </div>
        <div className="feature-item">
          <h3>{t('great_prices')}</h3>
          <p>{t('competitive_prices_and_regular_discounts')}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;