// app_server-controllers/blog.js

/*var request = require('request');
var apiOptions = {
    server : "http://18.117.119.72"
  };
*/
/* GET 'home' page */
/*module.exports.homepage = function(req, res){
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
      if (err) {
        console.error("Error in API request:", err);
        res.status(500).render('error', { error: "Internal Server Error" });
        return;
      }
      
    }
);
};
module.exports.blogadd = function(req, res) {
  res.render('blogAdd', { title: 'Blog Add' });
}

// GET 'blogAdd' page
module.exports.add = function(req, res){
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
        console.log('Add Blog Response:', response.statusCode);
        console.log('Add Blog Body:', body);
        if (!err && response.statusCode === 201) {
          console.log('Redirecting to /blog/list');
          res.redirect('/blog/list');
        } else {
          _handleError(req, res, response ? response.statusCode : 500);
        }
        console.log('Exiting add function');  // Add this line

      }
  );
};


var renderBlogEdit = function(req, res, responseBody){
  res.render('blogEdit', { title: 'Blog Edit', blog: responseBody, 
  title: responseBody.title, text: responseBody.text });
};

module.exports.blogedit = function(req, res){
  var requestOptions, path, postJSON;
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

module.exports.blogUpdate = function (req, res) {
  var requestOptions, path, postJSON;
  path = "/api/blogs/" + req.params.blogid;

  postJSON = {
    title: req.body.title,
    text: req.body.text
  }

  requestOptions = {
      url: apiOptions.server + path,
      method: "PUT",
      json: postJSON
  };
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode == 201) {
          res.redirect('/blog/list');
      } else {
        _handleError(req, res, response.statusCode);
      }
    }
  );
};
module.exports.blogDelete = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(  
    requestOptions, 
      function(err, response, body) {
          renderBlogDelete(req, res, body);
      }
  );
};

// app_server-controllers/blog.js
var renderBlogDelete = function(req, res, responseBody) {
  res.render('blogDelete', { title: 'Blog Deletion', blog: responseBody});
};

module.exports.blogdeletion = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
      url: apiOptions.server + path,
      method: "DELETE",
      json: {}
  };
  request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 204) {
            res.redirect('/blog/list');
        } else {
            _handleError(req, res, response.statusCode);
        }
    }
  );
};

var _handleError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Sorry, the page could not be found.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "There's a problem with our server, please try again later.";
  } else {
    title = status + ", something is wrong";
    content = "Something has gone wrong.";
  }
    res.status(status);
};*/
