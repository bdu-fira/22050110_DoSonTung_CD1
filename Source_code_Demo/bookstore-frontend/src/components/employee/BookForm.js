// src/components/admin/BookForm.js
import React, { useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';

function BookForm({ book, onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(
    book || { 
      bookName: '', 
      author: '', 
      price: '', 
      description: '', 
      coverImage: '', 
      quantity: 0,
      categoryName: '',
    }
  );
  const [imagePreview, setImagePreview] = useState(book?.coverImage || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    });
  };

  return (
    <div className="book-form">
      <h3>{book ? 'Edit Book' : 'Add New Book'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('title')}:</label>
          <input
            type="text"
            value={formData.bookName}
            onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('author')}:</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('price')}:</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('quantity')}:</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('genre')}:</label>
          <input
            type="text"
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>{t('cover_image')}:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="image-preview"
            />
          )}
        </div>
        <div className="form-group">
          <label>{t('description')}:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {book ? 'Update' : 'Add'} {t('book')}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;