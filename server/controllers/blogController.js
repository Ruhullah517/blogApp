

const Blog = require('../models/Blog');

// Add a new blog post
exports.addBlog = async (req, res) => {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
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
        const blogs = await Blog.find();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndDelete(id);
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
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        res.status(200).send(updatedBlog);
    } catch (error) {
        res.status(400).send(error);
    }
};
