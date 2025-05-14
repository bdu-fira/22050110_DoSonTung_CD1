// src/components/admin/EmployeeManager.js
import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { useTranslation } from '../../context/TranslationContext';

function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const { t } = useTranslation();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      // Kiểm tra email trùng lặp
      const usersResponse = await api.getUsers();
      const userExists = usersResponse.data.some((user) => user.email === formData.email);
      if (userExists) {
        alert(t('email_already_exists'));
        return;
      }

      // Thêm vào employees
      const employeeData = { ...formData, role: 'employee', id: generateId() };
      await api.addEmployee(employeeData);
      // Thêm vào users với registerUser
      await api.registerUser(employeeData);

      setShowForm(false);
      setFormData({ userName: '', email: '', password: '', role: 'employee' });
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      alert(t('error_adding_employee'));
    }
  };

  const handleEditEmployee = async () => {
    try {
      // Kiểm tra email trùng lặp (ngoại trừ chính employee đang chỉnh sửa)
      const usersResponse = await api.getUsers();
      const userExists = usersResponse.data.some(
        (user) => user.email === formData.email && user.id !== editingEmployee.id
      );
      if (userExists) {
        alert(t('email_already_exists'));
        return;
      }

      // Cập nhật employees
      await api.updateEmployee(editingEmployee.userID, { ...formData, role: 'employee' });
      // Cập nhật users
      await api.updateUser(editingEmployee.userID, { ...formData, role: 'employee' });

      setEditingEmployee(null);
      setFormData({ userName: '', email: '', password: '', role: 'employee' });
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
      alert(t('error_updating_employee'));
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm(t('confirm_delete_employee'))) {
      try {
        // Chỉ xóa khỏi employees (vì không có deleteUser)
        await api.deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert(t('error_deleting_employee'));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      handleEditEmployee();
    } else {
      handleAddEmployee();
    }
  };

  // Hàm tạo ID đơn giản (thay thế bằng UUID trong thực tế)
  const generateId = () => {
    return Math.random().toString(36).substr(2, 4);
  };

  return (
    <div className="employee-manager">
      <div className="manager-header">
        <h2>{t('manage_employees')}</h2>
        <button className="add-employee-btn" onClick={() => setShowForm(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t('add_new_employee')}
        </button>
      </div>

      {(showForm || editingEmployee) && (
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('full_name')}</label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!editingEmployee}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingEmployee ? t('update_employee') : t('add_new_employee')}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setEditingEmployee(null);
                setFormData({ name: '', email: '', password: '', role: 'employee' });
              }}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      )}

      <div className="employees-table">
        <div className="table-header">
          <span>{t('full_name')}</span>
          <span>{t('email')}</span>
          <span>{t('actions')}</span>
        </div>
        {employees.length === 0 ? (
          <div className="table-row">{t('no_employees')}</div>
        ) : (
          employees.map((employee) => (
            <div key={employee.id} className="table-row">
              <span>{employee.name}</span>
              <span>{employee.email}</span>
              <div className="table-actions">
                <button
                  className="edit-employee-btn"
                  onClick={() => {
                    setEditingEmployee(employee);
                    setFormData({ name: employee.name, email: employee.email, password: '', role: 'employee' });
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {t('edit')}
                </button>
                <button
                  className="delete-employee-btn"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                  </svg>
                  {t('delete')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeManager;