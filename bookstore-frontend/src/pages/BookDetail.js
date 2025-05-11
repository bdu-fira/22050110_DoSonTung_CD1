import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';

function BookDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>{t('Loading...')}</div>;

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <div className="book-image">
          <img src={book.coverImage || 'https://via.placeholder.com/300x400'} alt={book.title} />
        </div>
        <div className="book-info">
          <h1>{book.title}</h1>
          <div className="book-details">
            <p><strong>{t('author')}:</strong> {book.author}</p>
            <p><strong>{t('price')}:</strong> {book.price.toLocaleString('vi-VN')} VND</p>
            <p><strong>{t('genre')}:</strong> {book.genre || 'N/A'}</p>
            <p><strong>{t('publisher')}:</strong> {book.publisher || 'N/A'}</p>
            <p><strong>{t('language')}:</strong> {book.language || 'N/A'}</p>
            <p><strong>{t('quantity')}:</strong> {book.quantity || 0}</p>
            <p><strong>{t('description')}:</strong> {book.description || 'No description available'}</p>
          </div>
          <div className="book-actions">
            {book.quantity > 0 ? (
              <button className="add-to-cart-btn" onClick={() => addToCart(book)}>
                {t('add_to_cart')}
              </button>
            ) : (
              <p className="out-of-stock">{t('out_of_stock')}</p>
            )}
            <Link to="/books" className="back-to-books-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t('back_to_books')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;