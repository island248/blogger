//app_api-controllers-blogs.js
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
const authMiddleware = require('./authMiddleware');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  var createBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
      blogs.push({
        title: obj.title,
        text: obj.text,
        createdOn: obj.createdOn,
        _id: obj._id
      });
    });
    return blogs;
};


  module.exports.getAllBlogs = function(req, res) {
    Blog
    .find()
    .exec()
    .then(results => {
        if (!results || results.length === 0) {
            sendJSONresponse(res, 404, {
                "message": "No blogs found"
            });
        } else {
            console.log(results);
            sendJSONresponse(res, 200, createBlogList(req, res, results));
        }
    })
    .catch(err => {
        console.log(err);
        sendJSONresponse(res, 500, err);
    });
};

module.exports.blogReadOne = function (req, res) {
    console.log('Finding blog details', req.params);
    if (req.params && req.params.blogid) {
      Blog
        .findById(req.params.blogid)
        .exec()
        .then(blog => {
          if (!blog) {
            sendJSONresponse(res, 404, {
              "message": "blogid not found"
            });
            return;
          }
          console.log(blog);
          sendJSONresponse(res, 200, blog);
        })
        .catch(err => {
          console.log(err);
          sendJSONresponse(res, 404, err);
        });
    } else {
      console.log('No blogid specified');
      sendJSONresponse(res, 404, {
        "message": "No blogid in request"
      });
    }
};



module.exports.addBlog = async function (req, res) {
  console.log(req.body);
  Blog.create({
      title: req.body.title,
      text: req.body.text,
      createdOn: Date.now()
  })
  .then(blog => {
      console.log(blog);
      // Send a JSON response with the added blog
      res.status(201).json(blog);
  })
  .catch(err => {
      console.log(err);
      // Send a JSON response with the error
      res.status(400).json(err);
  });
};

module.exports.updateBlog = async function (req, res) {
  console.log('Received token:', req.headers.authorization); // Log the token received in the request headers

  authMiddleware(req, res, function() {

    if (!req.params.blogid) {
        sendJSONresponse(res, 404, {"message": "Not found, blogid is required"});
        return;
      }
    
      Blog
        .findById(req.params.blogid)
        .exec()
        .then(blog => {
          if (!blog) {
            sendJSONresponse(res, 404, {"message": "blogid not found"});
            return;
          }
    
          blog.title = req.body.title || blog.title;
          blog.text = req.body.text || blog.text;
    
          return blog.save();
        })
        .then(updatedBlog => {
          sendJSONresponse(res, 201, updatedBlog);
        })
        .catch(err => {
          sendJSONresponse(res, 400, err);
        });
        });
    };


module.exports.deleteBlog = function (req, res) {
    var blogid = req.params.blogid;
  if (blogid) {
    Blog
      .findByIdAndDelete(req.params.blogid)
      .exec()
      .then(blog => {
        console.log("Blog id " + req.params.blogid + " deleted");
        sendJSONresponse(res, 204, blog);
      })
      .catch(err => {
        console.log(err);
        sendJSONresponse(res, 404, err);
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No blogid"
    });
  }
};