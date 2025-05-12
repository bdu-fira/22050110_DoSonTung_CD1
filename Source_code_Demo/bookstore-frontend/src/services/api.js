// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Địa chỉ API

export const getBooks = () => axios.get(`${API_URL}books`);
export const getBookById = (id) => axios.get(`${API_URL}books/${id}`);
export const addBook = (book) => axios.post(`${API_URL}books`, book);
export const updateBook = (id, book) => axios.put(`${API_URL}books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}books/${id}`);

// === CATEGORY API ===
// export const getCategories = () => axios.get(`${API_URL}category/`);
// export const createCategory = (data) => axios.post(`${API_URL}category/`, data);
// export const deleteCategory = (id) => axios.delete(`${API_URL}category/${id}/`);

export const loginUser = (credentials) => axios.get(`${API_URL}login`);

export const registerUser = (userData) => axios.post(`${API_URL}register`, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}users/${id}`, userData);
export const changePassword = (id, passwordData) => axios.put(`${API_URL}users/${id}`, passwordData);
export const forgotPassword = (emailData) => axios.post(`${API_URL}users`, emailData); // Mock

export const getEmployees = () => axios.get(`${API_URL}employees`);
export const addEmployee = (employeeData) => axios.post(`${API_URL}employees`, { ...employeeData, role: 'employee' });
export const updateEmployee = (id, employeeData) => axios.put(`${API_URL}employees/${id}`, employeeData);
export const deleteEmployee = (id) => axios.delete(`${API_URL}employees/${id}`);

export const createOrder = (orderData) => axios.post(`${API_URL}orders`, orderData);
export const getOrders = () => axios.get(`${API_URL}orders`);
export const updateOrderStatus = (id, statusData) => axios.put(`${API_URL}orders/${id}`, { status: statusData.status });
export const getUsers = () => axios.get(`${API_URL}users`);