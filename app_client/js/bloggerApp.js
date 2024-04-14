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

      .when('/blogChat', {
        templateUrl: 'pages/blogChat.html',
        controller: 'ChatController',
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
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer ' + authentication.getToken() } })
        .then(function(response) {
            console.log("Delete request successful:", response);
            return response.data;
        })
        .catch(function(error) {
            console.error("Error deleting blog:", error);
            throw error;
        });
  }

  function getChat($http) {
    return $http.get('/api/chat');
  }
  
  function updateChat($http, authentication, data) {
    return $http.post('/api/chat', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
  }
  
  
  //Controllers
  app.controller('HomeController', function HomeController($http, authentication) {
    var vm = this;
    vm.pageHeader = {
      title: "Ilynd Rapant's Blog Site"
    };
    vm.message2 = "Welcome to MyBlog!";
    vm.isLoggedIn = function() {
      return authentication.isLoggedIn();
    }
    var currentTime =  new Date().getHours();
  var isNightTime = currentTime >= 20 || currentTime < 5;

// Set default message and image
vm.message = "";
vm.showActivityMessage = false;
vm.imageUrl = "";

// Check if it's TV Time (8 PM to 11 PM) or Bed Time (11 PM to 5 AM)
if (isNightTime) {
    if (currentTime >= 20 && currentTime < 23) {
        vm.message = "Time to catch up on shows!";
        vm.imageUrl = "/tvtime.png";
    } else {
        vm.message = "I am most likely sleeping";
        vm.imageUrl = "/betime.png";
    }
}

// Function to check if it's a hiking day
function checkHikingDay() {
    if (!isNightTime && vm.weather && vm.weather.condition && vm.weather.temperatureFahrenheit) {
        if ((vm.weather.condition.toLowerCase().includes('sunny') ||
                vm.weather.condition.toLowerCase().includes('cloudy') ||
                vm.weather.condition.toLowerCase().includes('overcast')) &&
            vm.weather.temperatureFahrenheit > 85) {
            vm.hikingDay = false;
            vm.message = "Pool Day!";
            vm.imageUrl = "/poolday.png"; // Set image URL for pool day
        } else if (vm.weather.condition.toLowerCase().includes('sunny') ||
            vm.weather.condition.toLowerCase().includes('cloudy') ||
            vm.weather.condition.toLowerCase().includes('overcast')) {
            if (vm.weather.temperatureFahrenheit > 45) {
                vm.hikingDay = true;
                vm.message = "I hope I have time to go outside today!";
                vm.imageUrl = "/images.png"; // Set image URL for hiking day
            } else {
                vm.hikingDay = false;
                vm.message = "Time to Code!";
                vm.imageUrl = "/coding.png"; // Set image URL for indoor day
            }
        } else if (vm.weather.condition.toLowerCase().includes('snow')) {
            vm.message = "Snow Day!";
            vm.imageUrl = "/snowday.png"; // Set image URL for snow day
        } else if (vm.weather.condition.toLowerCase().includes('rain') ||
            (vm.weather.precip_mm > 0 && vm.weather.temperatureFahrenheit < 45)) {
            vm.hikingDay = false;
            vm.message = "Indoor Day";
            vm.imageUrl = "/rainday.png"; // Set image URL for rainy day
        } else {
            vm.hikingDay = false;
            vm.message = "Time to Code!";
            vm.imageUrl = "/coding.png"; // Set image URL for indoor day
        }
        vm.showActivityMessage = true;
    }
}
  

    // Function to fetch weather data
    function getWeather() {
        $http.get('/api/weather')
            .then(function(response) {
                // Extract relevant weather information
                const currentWeather = response.data.current;
                // Inside your AngularJS controller
                vm.weather = {
                    temperatureCelsius: currentWeather.temp_c,
                    temperatureFahrenheit: (currentWeather.temp_c * 9/5) + 32,
                    chanceOfRain: currentWeather.precip_mm > 0 ? 'Chance of Rain' : 'No Rain Expected',
                    condition: currentWeather.condition.text,
                    icon: 'https:' + currentWeather.condition.icon  // Include the full URL of the weather icon
                };
                checkHikingDay();

                console.log(vm.weather); // Log weather data to console
                
                // Check if it's a hiking day after weather data is fetched
                checkHikingDay();
            })
            .catch(function(error) {
                console.error('Error fetching weather data:', error);
            });
    }

    // Call the function to fetch weather data
    getWeather();
});


  
  app.controller('ListController', function ListController($http, authentication) {
    var vm = this;
    vm.isLoggedIn = function() {
      return authentication.isLoggedIn();
  }
    vm.pageHeader = {
        title: "Blog List"
    };
    vm.message = "Retrieving blogs";
    getAllBlogs($http)
        .then(function (response) {
            vm.blogs = response.data;
            console.log(response);
            vm.message = "";
        })
        .catch(function (error) {
            console.error("Error fetching blogs:", error);
            vm.message = "No blogs found. Click 'Add Blog' above to create one.";
        });

      vm.isAuthorized = function(userEmail) {
        // Check if user is authenticated
        if (authentication.isLoggedIn()) {
          var auth = authentication.currentUser().email;
          // Check if the current user's email matches the email on the blog
          if (auth === userEmail) {
            return true;
          }
        }
        return false; // Return false if user is not authenticated or if emails don't match
      }
  });
  
  app.controller('AddController', [ '$http', '$location', 'authentication', function AddController($http, $location, authentication) {      
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
      title: 'Blog Add'
    };
    vm.message = "";
  
    vm.submit = function() {
      var data = vm.blog;
      data.title = userForm.title.value;
      data.text = userForm.text.value;
      data.userEmail = authentication.currentUser().email;
      data.userName = authentication.currentUser().name;

      addBlog($http, authentication, data)
        .then(function(data) {
          $location.path('blogList');
        })
        , (function (e) {
          vm.message = "Could not add blog"
        });
    }
  }]);
  

  app.controller('EditController', [ '$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {
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

  // ChatController
app.controller('ChatController', ['$http', '$scope', '$interval', 'authentication', function ChatController($http, $scope, $interval, authentication) {
  var vm = this;
  vm.isAuthorized = function(messageEmail) {
    var currentUser = authentication.currentUser();
    return currentUser && currentUser.email === messageEmail;
    };
  vm.pageHeader = {
    title: 'Chat'
  };
  
  vm.chat = []; // Initialize chat array
  vm.isDeleting = false; // Flag to track delete operation
  
  // Function to retrieve chat messages from the server
  function getChat() {
    $http.get('/api/chat')
      .then(function(response) {
        vm.chat = response.data; // Assign chat messages to vm.chat
      })
      .catch(function(error) {
        console.error("Error retrieving chat messages:", error);
      });
  }
  
  // Initial call to getChat function
  getChat();
  
  // Function to submit a new chat message
 // Function to submit a new chat message
vm.submit = function() {
  var data = {
    chat: userForm.postField.value,
    name: authentication.currentUser().name,
    email: authentication.currentUser().email
  };
  
  $http.post('/api/chat', data)
    .then(function(response) {
      // Refresh chat messages after posting a new message
      getChat();
      vm.message = ""; // Clear message input field
      userForm.postField.value = ""; // Clear message input field value
    })
    .catch(function(error) {
      console.error("Error posting chat message:", error);
      vm.message = "Could not post message";
    });
};

vm.deleteMessage = function(messageId) {
  // Remove the message from the array immediately
  vm.chat = vm.chat.filter(function(message) {
      return message._id !== messageId;
  });

  // Then send the delete request to the server
  $http.delete('/api/chat/' + messageId)
      .then(function(response) {
          // No need to refresh chat messages after deleting a message
      })
      .catch(function(error) {
          console.error("Error deleting chat message:", error);
          // If there's an error, add the message back to the array
          getChat(); // You may need to define getChat() globally or use another approach to retrieve chat messages again
      });
};

  
  // Function to periodically update chat messages
  $interval(function() {
    getChat();
  }, 3000);
}]);




