//app_api-controllers-blogs.js
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  var buildList = function(req, res, results) {
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
    // Use the find method to retrieve all blogs
    Blog.find()
    .exec()
    .then(results => {
        if (!results || results.length === 0) {
            sendJSONresponse(res, 404, {
                "message": "No blogs found"
            });
        } else {
            console.log(results);
            sendJSONresponse(res, 200, buildList(req, res, results));
        }
    })
    .catch(err => {
        console.log(err);
        sendJSONresponse(res, 500, err);
    });
};

module.exports.blogReadOne = function (req, res) {
    Blog
    .findById(req.params.blogid)
    .exec()
    .then(blog => {
        sendJSONresponse(res, 200, blog);
    })
    .catch(err => {
        console.error(err);
        sendJSONresponse(res, 500, { "error": "Internal Server Error" });
    });
};



module.exports.addBlog = async function (req, res) {
    try {
        const blog = await Blog.create({
            title: req.body.title,
            text: req.body.text,
            createdOn: req.body.createdOn || Date.now()
        });
        console.log(blog);
        sendJSONresponse(res, 201, blog);
    } catch (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    }
};

module.exports.updateBlog = async function (req, res) {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.blogid,
            {
                title: req.body.title,
                text: req.body.text,
            },
            { new: true }
        );

        if (!updatedBlog) {
            sendJSONresponse(res, 404, { error: "Blog not found" });
        } else {
            sendJSONresponse(res, 200, updatedBlog);
        }
    } catch (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    }
};


module.exports.deleteBlog = function (req, res) {
    Blog
        .findByIdAndDelete(req.params.blogid)
        .then(response => {
            if (!response) {
                sendJSONresponse(res, 404, { error: "Blog not found" });
            } else {
                sendJSONresponse(res, 204, null);
            }
        })
        .catch(err => {
            sendJSONresponse(res, 500, err);
        });
};