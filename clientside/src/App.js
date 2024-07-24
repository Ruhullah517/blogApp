import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogList from './components/BlogLists';
import './App.css';
import Navbar from './components/navbar';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/auth-check', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setToken(true);
        } else {
          setToken(null);
        }
      } catch (error) {
        setToken(null);
      }
    };
  
    checkAuth();
  }, []);

  return (
    <Router>
      <div>
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<BlogList token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
