//app_api-routes-index.js
var express = require('express');
var router = express.Router();
const blogsController = require('../controllers/blogs');

router.get('/blogs', blogsController.getAllBlogs);
router.get('/blogs/:blogid', blogsController.blogReadOne);
router.post('/blogs', blogsController.addBlog);
router.put('/blogs/:blogid', blogsController.updateBlog);
router.delete('/blogs/:blogid', blogsController.deleteBlog);
module.exports = router;

