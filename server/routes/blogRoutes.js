const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

router.post('/', auth, blogController.addBlog);
router.get('/', blogController.getAllBlogs);
router.delete('/:id', auth, blogController.deleteBlog);
router.put('/:id', auth, blogController.updateBlog);

module.exports = router;
