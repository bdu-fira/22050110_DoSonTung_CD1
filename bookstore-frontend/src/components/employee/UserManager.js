// src/components/employee/UserManager.js
import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { useTranslation } from '../../context/TranslationContext';

function UserManager() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.getUsers();
      const filteredUsers = response.data.filter(user => user.role === 'user');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="user-manager">
      <h2>{t('user_management')}</h2>
      <div className="users-table">
        <div className="table-header">
          <span>{t('name')}</span>
          <span>{t('username_email')}</span>
        </div>
        {users.map((user) => (
          <div key={user.id} className="table-row">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManager;