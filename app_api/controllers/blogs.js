var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
module.exports.getAllBlogs = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"}); 
};

module.exports.getBlogById = function (req, res) {
    console.log('Finding blog details', req.params);
    if(req.params && req.params.id) {
    Blog
    .findById(req.params.id)
    .exec(function(err, blog){
        if (!blog)
            sendJSONResponse(res, 404, {"message" : "blogid not found"});
            return;
        }else if(err) {
            console.log(err);
            sendJSONresponse (res, 404, err);
            return;
        }
        console.log(blog);
        sendJSONresponse(res, blog);
      });
        }else {
            console.log('No blogid specified');
            sendJSONresponse(res, 404, {"message" : "No blogid in request" });
    }
};


module.exports.addBlog = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"}); 
};

module.exports.updateBlog = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteBlog = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

