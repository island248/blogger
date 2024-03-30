const express = require('express');
const router = express.Router();
require('dotenv').config();
const blogsController = require('../controllers/blogs');
const authController = require('../controllers/authenticate');

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Logging JWT_SECRET


router.get('/blogs', blogsController.getAllBlogs);
router.get('/blogs/:blogid', blogsController.blogReadOne);
router.post('/blogs', auth, blogsController.addBlog); // Protect routes with auth middleware
router.put('/blogs/:blogid', auth, blogsController.updateBlog); // Protect routes with auth middleware
router.delete('/blogs/:blogid', auth, blogsController.deleteBlog); // Protect routes with auth middleware

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
