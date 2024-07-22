import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';
import AddBlog from './AddBlog';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:5000/api/blogs');
    setBlogs(response.data);
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    fetchBlogs();
  };

  const addBlog = async (blog) => {
    await axios.post('http://localhost:5000/api/blogs', blog);
    fetchBlogs();
  };

  const updateBlog = async (id, updatedBlog) => {
    await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);
    fetchBlogs();
  };

  return (
    <div className="container">
      <AddBlog addBlog={addBlog} />
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog} />
      ))}
    </div>
  );
};

export default BlogList;
