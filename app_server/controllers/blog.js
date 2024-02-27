// app_server-controllers/blog.js
var request = require('request');
var apiOptions = {
    server : "http://18.117.119.72"
  };

/* GET 'home' page */
module.exports.homepage = function(req, res){
  res.render('home', { title: "Ilynd Rapant's Blog Site"});
};

var renderBloglist = function(req, res, responseBody) {
  res.render('blogList', { title: 'Blog List', blogs: responseBody });
}

// GET 'blogList' page
module.exports.bloglist = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs";
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
      requestOptions,
      function(err, response, body) {
        if (err) {
          console.error("Error in API request:", err);
          // Handle the error in a way that makes sense for your application
          // For example, you might want to render an error page or send a JSON response
          res.status(500).render('error', { error: "Internal Server Error" });
          return;
        }
          renderBloglist(req, res, body);
      }
  );
};

/*router.get('/add', (req, res) => {
  res.render('blogAdd', { title: 'Blog Add' });
});*/

// GET 'blogAdd' page
module.exports.blogadd = function(req, res){
  res.render('blogAdd', { title: 'Blog Add' });
  var requestOptions, path, postData;
  path = "/api/blogs";
  postData = {
      title: req.body.title,
      text: req.body.text
  };
  requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: postData
  };
  request(
      requestOptions,
      function(err, response, body) {
          if(response.statusCode == 201){
              res.renderBloglist('/blog/list');
          }
      }
  )
};



var renderBlogEdit = function(req, res, responseBody){
  res.render('blogEdit', { title: 'Blog Edit', blog: responseBody });
};

module.exports.blogedit = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {}
  };
  request(
      requestOptions,
      function(err, response, body) {
          renderBlogEdit(req, res, body);
      }
  );
};

var renderBlogDelete = function(req, res){
  res.render('blogDelete', { title: 'Blog Deletion', blogid:req.params.id });
};

module.exports.blogdeletion = function (req, res) {
  // Assuming 'id' is the parameter for the blog to be deleted, update accordingly
  renderBlogDelete(req, res);
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id; 
  requestOptions = {
      url: apiOptions.server + path,
      method: "DELETE",
      json: {}
  };
  request(
      requestOptions
  );
    };