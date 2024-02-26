var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

router.get('/', ctrlBlog.homepage);

router.get('/blog/list', ctrlBlog.bloglist);

router.get('/blog/add', ctrlBlog.blogadd);

router.get('/blog/edit/:id', ctrlBlog.blogedit);

router.get('/blog/delete/:id', ctrlBlog.blogdeletion);

module.exports = router;