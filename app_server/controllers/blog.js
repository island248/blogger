// controllers/blog.js
const express = require('express');
const router = express.Router();
//const Blog = require('../app_api/models/blogs');  // Assuming the correct path to your blogs.js model

// Sample static data for demonstration purposes
const sampleBlogs = [
  { title: 'First Blog', text: 'This is the text for the first blog.' },
  { title: 'Second Blog', text: 'This is the text for the second blog.' },
  { title: 'Third Blog', text: 'This is the text for the third blog.' },
];

router.get('/list', (req, res) => {
  // Render the blogList view with the sample blogs
  res.render('blogList', { title: 'Blog List', blogs: sampleBlogs });
});

router.get('/add', (req, res) => {
  res.render('blogAdd', { title: 'Blog Add' });
});

router.get('/edit/:id', (req, res) => { // Update the route to include an ID parameter
  res.render('blogEdit', { title: 'Blog Edit' });
});

router.get('/delete/:id', (req, res) => { // Update the route to include an ID parameter
  res.render('blogDelete', { title: 'Blog Delete' });
});
module.exports = router;
