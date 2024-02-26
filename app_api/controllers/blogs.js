//app_api-controllers-blogs.js
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  module.exports.getAllBlogs = function(req, res) {
    // Use the find method to retrieve all blogs
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 500, err); // Internal Server Error
            return;
        }
        
        // Send the list of blogs in the response
        sendJSONresponse(res, 200, blogs);
    });
};

module.exports.blogReadOne = function (req, res) {
    console.log('Finding blog details', req.params);
    
    if (req.params && req.params.blogid) {
        Blog.findById(req.params.blogid)
            .exec(function (err, blog) {
                if (!blog) {
                    sendJSONresponse(res, 404, {"message": "blogid not found"});
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }

                console.log(blog);
                sendJSONresponse(res, 200, blog);
            });
    } else {
        console.log('No blogid specified');
        sendJSONresponse(res, 404, {"message": "No blogid in request"});
    }
};



module.exports.addBlog = function (req, res) {
    console.log(req.body);
    Blog.create({
         title: req.body.title,
         text: req.body.text,
    }, function (err, blog) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(blog);
            sendJSONresponse(res, 201, blog);
        }
    })
};

module.exports.updateBlog = function (req, res) {
    if (!req.params.blogid) {
        sendJSONresponse(res, 404, {"message": "Not found, blogid is required"});
        return;
    }

    Blog
        .findById(req.params.blogid)
        .exec(function (err, blog) {
            if (!blog) {
                sendJSONresponse(res, 404, {"message": "blogid not found"});
                return;
            } else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }

            // Update blog properties based on the request body
            blog.title = req.body.title || blog.title;
            blog.text = req.body.text || blog.text;
            blog.createdOn = req.body.createdOn || blog.createdOn || new Date();

            // Save the updated blog
            blog.save(function (err, blog) {
                if (err) {
                    sendJSONresponse(res, 400, err);
                } else {
                    sendJSONresponse(res, 200, blog);
                }
            });
        });
};

module.exports.deleteBlog = function (req, res) {
    var blogid = req.params.blogid;
  if (blogid) {
    Blog
      .findByIdAndRemove(blogid)
      .exec(
        function(err, blog) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Blog id " + req.params.blogid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No blogid"
    });
  }
};
