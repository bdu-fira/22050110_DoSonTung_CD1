// src/components/employee/BookManager.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BookForm from './BookForm';
import * as api from '../../services/api';
import { useTranslation } from '../../context/TranslationContext';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const { isEmployee } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEmployee) {
      navigate('/'); // Nếu không phải employee, chuyển về trang chủ
    } else {
      fetchBooks();
    }
  }, [isEmployee, navigate]);

  const fetchBooks = async () => {
    try {
      const response = await api.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async (book) => {
    try {
      await api.addBook(book);
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
      alert(t('error_adding_book'));
    }
  };

  const handleEditBook = async (book) => {
    try {
      // Validate book.id
      if (!book.id) {
        console.error('Book ID is undefined or invalid:', book);
        alert(t('error_invalid_book_id'));
        return;
      }

      // Debug: Log the book data being sent
      console.log('Updating book with ID:', book.id, 'Data:', book);

      // Check if book exists
      const bookExists = books.some((b) => b.id === book.id);
      if (!bookExists) {
        console.error('Book ID does not exist in database:', book.id);
        alert(t('error_book_not_found'));
        return;
      }

      await api.updateBook(book.id, book);
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
      alert(t('error_updating_book'));
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm(t('confirm_delete_book'))) {
      try {
        await api.deleteBook(id);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert(t('error_deleting_book'));
      }
    }
  };

  return (
    <div className="book-manager">
      <div className="manager-header">
        <h2>{t('book_inventory')}</h2>
        <button 
          className="add-book-btn"
          onClick={() => setShowForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t('add_new_book')}
        </button>
      </div>

      {(showForm || editingBook) && (
        <BookForm
          book={editingBook}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      <div className="books-table">
        <div className="table-header">
          <span></span>
          <span>{t('title')}</span>
          <span>{t('author')}</span>
          <span>{t('price')}</span>
          <span>{t('quantity')}</span>
          <span>{t('genre')}</span>
          <span>{t('actions')}</span>
        </div>
        {books.map((book) => (
          <div key={book.id} className="table-row">
            <img src={book.coverImage} alt={book.Name} width={60} height={80}/>
            <span>{book.bookName}</span>
            <span>{book.author}</span>
            <span>{book.price.toLocaleString('vi-VN')} VND</span>
            <span>{book.quantity || 0}</span>
            <span>{book.categoryName  || 'N/A'}</span>
            <div className="table-actions">
              <button 
                className="edit-book-btn"
                onClick={() => setEditingBook(book)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button 
                className="delete-book-btn"
                onClick={() => handleDeleteBook(book.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookManager;