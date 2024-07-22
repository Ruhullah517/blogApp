import React, { useState } from 'react';

const BlogItem = ({ blog, deleteBlog, updateBlog }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const handleUpdate = () => {
    updateBlog(blog._id, { title, content });
    setIsEditing(false);
  };

  return (
    <div className="blog-item">
      {isEditing ? (
        <form>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogItem;
