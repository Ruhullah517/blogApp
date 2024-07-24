import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogList from './components/BlogLists';
import './App.css';
import Navbar from './components/navbar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  
  return (
    <Router>
      <div>
        <Navbar token={token} setToken = {setToken} />
        {/* <nav>
          <ul>
            <li><Link to="/">Blogs</Link></li>
            {!token && <li><Link to="/login">Login</Link></li>}
            {!token && <li><Link to="/signup">Signup</Link></li>}
            {token && <li onClick={handleLogout}><Link >Logout</Link></li>}
          </ul>
        </nav> */}

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
