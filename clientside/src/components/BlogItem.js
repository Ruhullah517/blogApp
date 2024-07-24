import React, { useState } from 'react';
import axios from 'axios';

const BlogItem = ({ blog, deleteBlog, updateBlog }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const token = localStorage.getItem('token');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/blogs/${blog._id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setIsEditing(false);
      updateBlog(blog._id, response.data);
    } catch (error) {
      console.error('Failed to update blog', error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    try {
        console.log('Attempting to delete blog with ID:', blog._id);
        await deleteBlog(blog._id); // Use the function passed from BlogList
        console.log('Blog deleted successfully');
    } catch (error) {
        console.error('Failed to delete blog', error.response?.data || error.message);
    }
};

  return (
    <div className="blog-item">
      {isEditing ? (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="button" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          {token && <button onClick={() => setIsEditing(true)}>Edit</button>}
          {token && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
};

export default BlogItem;
