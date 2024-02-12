// routes/index.js
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
const blogController = require('../controllers/blog');

router.use('/', homeController);
router.use('/blog', blogController);

module.exports = router;
