var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

router.get('/', ctrlBlog.homepage);

router.get('/bloglist', ctrlBlog.bloglist);

router.get('/blogadd', ctrlBlog.blogadd);

router.get('/blogedit', ctrlBlog.blogedit);

router.get('/blogdeletion', ctrlBlog.blogdeletion);

module.exports = router;