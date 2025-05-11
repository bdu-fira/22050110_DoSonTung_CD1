// src/pages/AdminDashboard.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmployeeManager from '../components/admin/EmployeeManager';
import { useTranslation } from '../context/TranslationContext';

function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { t } = useTranslation();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{t('admin_dashboard')}</h1>
        <p>{t('manage_employees_and_system_operations')}</p>
      </div>
      <EmployeeManager />
    </div>
  );
}

export default AdminDashboard;