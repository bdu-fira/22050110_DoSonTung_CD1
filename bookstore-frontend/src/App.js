import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BookDetail from './pages/BookDetail';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { TranslationProvider } from './context/TranslationContext';
import ForgotPassword from './pages/ForgotPassword';
import ErrorBoundary from './components/common/ErrorBoundary'; // Import ErrorBoundary

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  return (
    <TranslationProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar setCartItems={setCartItems} />
            <ErrorBoundary> {/* Wrap the main content */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route 
                  path="/books" 
                  element={<Books cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} />} 
                />
                <Route 
                  path="/cart" 
                  element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
                />
                <Route path="/checkout" element={<Checkout setCartItems={setCartItems} />} />
                <Route 
                  path="/book/:id" 
                  element={<BookDetail addToCart={addToCart} />} 
                />
                <Route path="/employee" element={<EmployeeDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </ErrorBoundary>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;