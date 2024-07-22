
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController'); 

router.post('/', blogController.addBlog);
router.get('/', blogController.getAllBlogs);
router.delete('/:id', blogController.deleteBlog);
router.put('/:id', blogController.updateBlog);

module.exports = router;
