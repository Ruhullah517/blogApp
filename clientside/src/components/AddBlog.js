import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting blog:', { title, content });
      const response = await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log('Blog created:', response.data);
      addBlog(response.data);
      setTitle('');
      setContent('');
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Failed to add blog', error.response ? error.response.data : error.message);
      setError('Failed to add blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <button type="submit" disabled={isSubmitting}>Add Blog</button>
      {success && <p>Blog added successfully!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AddBlog;
