const Blog = require('../models/Blog');

// Add a new blog post
exports.addBlog = async (req, res) => {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content, user: req.user._id });
    try {
        await newBlog.save();
        res.status(201).send(newBlog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Retrieve all blog posts
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
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send({ error: 'Blog post not found' });
        }
        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'Not authorized' });
        }
        await blog.remove();
        res.status(200).send({ message: 'Blog post deleted' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send({ error: 'Blog post not found' });
        }
        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'Not authorized' });
        }
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        await blog.save();
        res.status(200).send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
};
