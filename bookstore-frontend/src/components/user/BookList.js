// src/components/user/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';

function BookList({ books, addToCart }) {
  return (
    <div className="book-list">
      <h3>Available Books</h3>
      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`} className="book-link">
              <img 
                src={book.coverImage || 'https://via.placeholder.com/150x200'} 
                alt={book.title}
                className="book-thumbnail"
              />
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>Author: {book.author}</p>
                <p className="price">Price: {book.price.toLocaleString('vi-VN')} VND</p>
              </div>
            </Link>
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;