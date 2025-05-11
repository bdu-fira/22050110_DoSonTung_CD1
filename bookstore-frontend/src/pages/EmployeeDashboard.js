import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookManager from '../components/employee/BookManager';
import OrderManager from '../components/employee/OrderManager';
import UserManager from '../components/employee/UserManager';
import { useTranslation } from '../context/TranslationContext';

function EmployeeDashboard() {
  const { isEmployee } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('books');

  console.log('isEmployee:', isEmployee); // Debug

  if (!isEmployee) {
    console.log('Redirecting: isEmployee is false');
    return <Navigate to="/" />;
  }

  return (
    <div className="employee-dashboard">
      <div className="employee-header">
        <h1>{t('employee_dashboard')}</h1>
        <p>{t('manage_books_orders_users')}</p>
      </div>
      <div className="employee-tabs">
        <button
          className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          {t('book_manager')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          {t('order_manager')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          {t('user_manager')}
        </button>
      </div>
      <div className="employee-content">
        {activeTab === 'books' && <BookManager />}
        {activeTab === 'orders' && <OrderManager />}
        {activeTab === 'users' && <UserManager />}
      </div>
    </div>
  );
}

export default EmployeeDashboard;