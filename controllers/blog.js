// controllers/blog.js
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.render('blogList', { title: 'Blog List' });
});

router.get('/add', (req, res) => {
  res.render('blogAdd', { title: 'Blog Add' });
});

module.exports = router;
