import React from 'react';
import BlogList from './components/BlogLists';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Blog App</h1>
        <BlogList />
      </div>
    </div>
  );
}

export default App;
