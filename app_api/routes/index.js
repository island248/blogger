var express = require('express');
var router = express.Router();
const blogsController = require('../controllers/blogs');

router.get('/blogs', blogsController.getAllBlogs);
router.get('/blogs/:id', blogsController.getBlogById);
router.post('/blogs', blogsController.addBlog);
router.put('/blogs/:id', blogsController.updateBlog);
router.delete('/blogs/:id', blogsController.deleteBlog);
module.exports = router;

