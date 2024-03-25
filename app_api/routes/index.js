const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Use jsonwebtoken directly
const blogsController = require('../controllers/blogs');
const authController = require('../controllers/authenticate');

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Logging JWT_SECRET

var auth = function(req, res, next) {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

router.get('/blogs', blogsController.getAllBlogs);
router.get('/blogs/:blogid', blogsController.blogReadOne);
router.post('/blogs', auth, blogsController.addBlog); // Protect routes with auth middleware
router.put('/blogs/:blogid', auth, blogsController.updateBlog); // Protect routes with auth middleware
router.delete('/blogs/:blogid', auth, blogsController.deleteBlog); // Protect routes with auth middleware

router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;
