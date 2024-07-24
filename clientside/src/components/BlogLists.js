import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';
import AddBlog from './AddBlog';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(response.data);
    } catch (error) {
      setError(error);
      console.error('Failed to fetch blogs', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBlogs();  // Refresh the list after deletion
    } catch (error) {
      setError(error);
      console.error('Failed to delete blog', error);
    }
  };


  const addBlog = (blog) => {
    setBlogs((prevBlogs) => [...prevBlogs, blog]);
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBlogs();
    } catch (error) {
      setError(error);
      console.error('Failed to update blog', error);
    }
  };

  return (
    <div className="container">
      {token ? <AddBlog addBlog={addBlog} />: <h1>Please login to add a blog</h1>}
      {error && <p>Error: {error.message}</p>}
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog} token={token} />
      ))}
    </div>
  );
};

export default BlogList;
