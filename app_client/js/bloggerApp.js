//app_client/js/bloggerApp.js
var app = angular.module('bloggerApp', ['ngRoute']);
//Router Provider
app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
  
      .when('/blogList', {
        templateUrl: 'pages/blogList.html',
        controller : 'ListController',
        controllerAs: 'vm'
      })
  
      .when('/blogAdd', {
        templateUrl: 'pages/blogAdd.html',
        controller: 'AddController',
        controllerAs: 'vm'
      })
  
      .when('/blogEdit/:id', {
        templateUrl: 'pages/blogEdit.html',
        controller: 'EditController',
        controllerAs: 'vm'
      })
  
      .when('/blogDelete/:id', {
        templateUrl: 'pages/blogDelete.html',
        controller: 'DeleteController',
        controllerAs: 'vm'
      })
      
      .when('/register', {
        templateUrl: '/auth/register.view.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
  
      .when('/signOn', {
        templateUrl: '/auth/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .otherwise({redirectTo: '/'});
  });
  
  //REST API functions
  function getAllBlogs($http) {
    return $http.get('/api/blogs');
  }
  
  function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
  }
  
  function addBlog($http, authentication, data) {
  return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
  }
  
function updateBlogById($http, authentication, id, data) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
  }
  
  function deleteBlogById($http, authentication, id) {
    console.log("Token before delete request:", authentication.getToken());
    console.log("Token before delete request:", authentication.getToken());

    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer ' + authentication.getToken() } })
        .then(function(response) {
            console.log("Delete request successful:", response);
            return response.data;
        })
        .catch(function(error) {
            console.error("Error deleting blog:", error);
            throw error; // Re-throw the error to handle it in the controller
        });
}

  //Controllers
  app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.pageHeader = {
        title: "Ilynd Rapant's Blog Site"
    };
    vm.message = "Welcome to my blog!";
  });
  
  app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: "Blog List"
    };
    vm.message = "Retrieving blogs";
    getAllBlogs($http)
        .then(function (data) {
          vm.blogs = data.data;
          vm.message = "";
        })
        , (function (e) {
          vm.message = "Could not get blogs";
        });
    });
  
    app.controller('AddController', [ '$http', '$location', 'authentication', function AddController($http, $location, authentication) {      var vm = this;
      var vm = this;
      vm.blog = {};
      vm.pageHeader = {
        title: 'Blog Add'
      };
      vm.message = "";
    
      vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.title.value;
        data.blogText = userForm.entry.value;
    
        addBlog($http, authentication, data)
          .then(function(data) {
            $location.path('blogList');
          })
          , (function (e) {
            vm.message = "Could not add blog"
          });
      }
    }]);
    
  
    app.controller('EditController', [ '$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {    var vm = this;
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
      title: 'Blog Edit'
    };
    vm.message = "Getting Blog";
  
    getBlogById($http, vm.id)
      .then(function(data) {
        vm.blog = data.data;
        vm.message = "";
      })
      , (function (e) {
        vm.message = "Could not retrieve blog at ID " + vm.id;
      });
  
    vm.submit = function() {
      var data = vm.blog;
      data.title = userForm.title.value;
      data.text = userForm.text.value;
  
      updateBlogById($http, authentication, vm.id, data)
        .then(function(data) {
          vm.message = "";
          $location.path('blogList');
        })
        , (function (e) {
          vm.message = "Could not update blog at ID " + vm.id;
        });
    }
  }]);
    
  app.controller('DeleteController', [ '$http', '$routeParams', '$location', 'authentication', function DeleteController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
      title: 'Blog Delete'
    };
    vm.message = "Getting Blog";
  
    getBlogById($http, vm.id)
    .then(function(data) {
      vm.blog = data.data;
      vm.message = "";
    })
    , (function (e) {
      vm.message = "Could not retrieve blog at ID " + vm.id;
    });
  
    vm.submit = function() {
      deleteBlogById($http, authentication, vm.id)
        .then(function(data) {
          $location.path('blogList');
        })
        , (function (e) {
          vm.message = "Could not delete blog"
        });
    }
  
    vm.cancel = function() {
      $location.path('blogList');
    }
  }]);