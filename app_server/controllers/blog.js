// app_server-controllers/blog.js
var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
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
      blogTitle: req.body.blogTitle,
      blogEntry: req.body.blogEntry
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
              res.redirect('/blogList');
          }
      }
  )
};


var renderBlogEdit = function(req, res, responseBody){
  res.render('blogEdit', { title: 'Blog Edit', blogTitle : responseBody.blogTitle, blogEntry : responseBody.blogEntry});
};

module.exports.blogedit = function(req, res){
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
      url: apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
      requestOptions,
      function(err, response, body) {
          renderBlogEdit(req, res, body);
      }
  );
};

module.exports.blogdeletion = function(req, res){
  res.render('blogDeletion', { title: 'Blog Deletion' });
};;
