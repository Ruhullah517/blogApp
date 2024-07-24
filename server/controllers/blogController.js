const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Add a new blog post
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id; // Ensure this is populated correctly

    console.log('Received create blog request:', { title, content, userId });

    if (!userId) {
        console.error('User ID is missing');
        return res.status(401).send({ error: 'User ID is missing' });
    }

    const newBlog = new Blog({ title, content, user: userId });

    try {
        await newBlog.save();
        console.log('Blog created:', newBlog);
        res.status(201).send(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send({ error: 'Error creating blog' });
    }
};

// get all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user', 'username');
        res.status(200).send(blogs);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    console.log('Delete request received for ID:', id);

    try {
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid blog ID' });
        }

        // Find the blog post
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Debug: Log user IDs for comparison
        console.log('Blog user ID:', blog.user.toString());
        console.log('Request user ID:', req.user._id.toString());

        // Check authorization
        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Delete the blog post
        await Blog.findByIdAndDelete(id);
        console.log('Blog post deleted successfully');

        res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'An error occurred while deleting the blog post' });
    }
};


// Update a blog post by ID
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    console.log('update request received for ID:', id);
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and content are required' });
    }

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({ error: 'Blog post not found' });
        }

        // Debug: Log user IDs for comparison
        console.log('Blog user ID:', blog.user.toString());
        console.log('Request user ID:', req.user._id.toString());

        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'Not authorized' });
        }

        blog.title = title;
        blog.content = content;
        await blog.save();

        res.status(200).send(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).send({ error: 'An error occurred while updating the blog post' });
    }
};
