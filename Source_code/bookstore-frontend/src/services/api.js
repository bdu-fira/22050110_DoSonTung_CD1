// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Địa chỉ API

export const getBooks = () => axios.get(`${API_URL}books`);
export const getBookById = (bookID) => axios.get(`${API_URL}books/${bookID}/`);
export const addBook = (book) => axios.post(`${API_URL}books`, book);
export const updateBook = (bookID, book) => axios.put(`${API_URL}books/${bookID}/`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}books/${id}/`);
export const getBookDetailsByBookId = (bookId) => axios.get(`${API_URL}books_detail/${bookId}`);

// export const getCategories = () => axios.get(`${API_URL}category/`);
// export const createCategory = (data) => axios.post(`${API_URL}category/`, data);
// export const deleteCategory = (categoriesID) => axios.delete(`${API_URL}category/${categoryID}/`);

export const loginUser = (credentials) => axios.get(`${API_URL}login`);

export const registerUser = (userData) => axios.post(`${API_URL}register/`, userData);
export const updateUser = (accountID, userData) => axios.put(`${API_URL}users/${accountID}/`, userData);
export const changePassword = (userID, passwordData) => axios.put(`${API_URL}users/${userID}/`, {userID, passwordData});
export const forgotPassword = (emailData) => axios.post(`${API_URL}users`, emailData); // Mock

export const getEmployees = () => axios.get(`${API_URL}employees`);
export const addEmployee = (employeeData) => axios.post(`${API_URL}employees`, { ...employeeData, role: 'employee' });
export const updateEmployee = (userID, employeeData) => axios.put(`${API_URL}employees/${userID}/`, employeeData);
export const deleteEmployee = (userID) => axios.delete(`${API_URL}employees/${userID}/`);

export const createOrder = (orderData) => axios.post(`${API_URL}orders`, orderData);
export const getOrders = () => axios.get(`${API_URL}orders`);
export const updateOrderStatus = (id, statusData) => axios.put(`${API_URL}orders/${id}/`, { status: statusData.status });
export const getUsers = () => axios.get(`${API_URL}users`);