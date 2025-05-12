import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import * as api from '../services/api';
import { useTranslation } from '../context/TranslationContext';

function Profile() {
  const { user, isLoading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [userData, setUserData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setUserData({ name: user.name || '', email: user.email || '' });
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.updateUser(user.id, userData);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setError('New passwords do not match');
      return;
    }
    try {
      // Gửi { currentPassword, newPassword } thay vì toàn bộ passwordData
      await api.changePassword(user.id, {
        currentPassword: passwordData.current,
        newPassword: passwordData.new,
      });
      setPasswordMode(false);
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      setError('Failed to change password');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">{t('my_profile')}</h1>

        {!editMode && !passwordMode && (
          <div className="profile-info-card">
            <div className="profile-details">
              <p><strong>{t('name')}: </strong> {user.userName}</p>
              <p><strong>{t('email')}:</strong> {user.email}</p>
              <p><strong>{t('role')}:</strong> {user.role}</p>
            </div>
            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                {t('edit_profile')}
              </button>
              <button className="change-password-btn" onClick={() => setPasswordMode(true)}>
                {t('change_password')}
              </button>
            </div>
          </div>
        )}

        {editMode && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <h2>{t('edit_profile')}</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label>{t('name')}</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t('email')}</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">{t('save_changes')}</button>
              <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                {t('cancel')}
              </button>
            </div>
          </form>
        )}

        {passwordMode && (
          <form onSubmit={handleChangePassword} className="profile-form">
            <h2>{t('change_password')}</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label>{t('current_password')}</label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t('new_password')}</label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t('confirm_new_password')}</label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">{t('change_password')}</button>
              <button type="button" className="cancel-btn" onClick={() => setPasswordMode(false)}>
                {t('cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;