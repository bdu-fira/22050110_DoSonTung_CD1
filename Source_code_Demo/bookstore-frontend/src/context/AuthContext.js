import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log('Stored user in sessionStorage:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user:', parsedUser);
        if (parsedUser && parsedUser.role) {
          parsedUser.role = parsedUser.role.toLowerCase();
          setUser(parsedUser);
          setIsAdmin(parsedUser.role === 'admin');
          setIsEmployee(parsedUser.role === 'employee');
          console.log('User set successfully:', parsedUser);
          // Load cart items for this user
          const storedCart = sessionStorage.getItem(`cart_${parsedUser.id}`);
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        } else {
          console.log('No role found in stored user, clearing sessionStorage');
          sessionStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        sessionStorage.removeItem('user');
      }
    } else {
      console.log('No user found in sessionStorage');
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.loginUser(credentials);
      const userData = response.data;
      console.log('User data from API:', userData);
      if (!userData || !userData.role) {
        throw new Error('User role not provided by API');
      }
      userData.role = userData.role.toLowerCase();
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      setIsEmployee(userData.role === 'employee');
      sessionStorage.setItem('user', JSON.stringify(userData));
      console.log('User saved to sessionStorage:', userData);
      // Load cart items for this user
      const storedCart = sessionStorage.getItem(`cart_${userData.id}`);
      const cart = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(cart);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setIsEmployee(false);
    setCartItems([]);
    sessionStorage.removeItem('user');
    // Clear cart for the user
    if (user) {
      sessionStorage.removeItem(`cart_${user.id}`);
    }
  };

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevItems, { ...book, quantity: 1 }];
      }
      // Save to sessionStorage
      if (user) {
        sessionStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(bookId);
      return;
    }
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      );
      // Save to sessionStorage
      if (user) {
        sessionStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const removeItem = (bookId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== bookId);
      // Save to sessionStorage
      if (user) {
        sessionStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      sessionStorage.removeItem(`cart_${user.id}`);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isEmployee,
        login,
        logout,
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);