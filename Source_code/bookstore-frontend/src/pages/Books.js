import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as api from '../services/api';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';

function Books() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t, language } = useTranslation();
  const [translatedBooks, setTranslatedBooks] = useState([]);
  const location = useLocation();
  const { addToCart } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    setSearchTerm(searchFromUrl);

    const fetchBooks = async () => {
      try {
        const response = await api.getBooks();
        const booksData = response.data;

        setTranslatedBooks(booksData);
        const uniqueCategories = [...new Set(
          booksData.map(book => book.categoryName).filter(Boolean)
        )];

        setCategories(uniqueCategories);
        // const uniqueGenres = [...new Set(booksData.map(book => book.genre).filter(Boolean))];
        // setGenres(uniqueGenres);

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [language, location.search]);


  const handleAddToCart = (book) => {
    if (book.quantity <= 0) return;
    addToCart(book);
  };

  const normalizeString = (str) => {
    return (str || '').toLowerCase().replace(/\s+/g, '');
  };
  

const filteredBooks = translatedBooks
  .filter(book => selectedCategory === 'all' || book.categoryName === selectedCategory)
  .filter(book => normalizeString(book.bookName).includes(normalizeString(searchTerm)));

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="books-page">
      <div className="books-controls">
        <div className="genre-filter">
          <label>{t('filter_by_genre')}</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">{t('all_genres')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="search-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder={t('search_by_title')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="books-grid">
        {currentBooks.map((book) => (
          <div key={book.id || book.bookID} className="book-card">
            <Link to={`book/${book.id}`} className="book-link">
              <img src={book.coverImage || 'https://via.placeholder.com/150x200'} alt={book.Name} />
              <h3>{book.bookName}</h3>
              <p>{book.author}</p>
              <p>{book.price.toLocaleString('vi-VN')} VND</p>
              <p>{t('quantity')}: {book.quantity || 0}</p>
            </Link>
            {book.quantity > 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(book)}
              >
                {t('add_to_cart')}
              </button>
            ) : (
              <p className="out-of-stock">{t('out_of_stock')}</p>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('previous')}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </button>
        </div>
      )}
    </div>
  );
}

export default Books;