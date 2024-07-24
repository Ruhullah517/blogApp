const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
