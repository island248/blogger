require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');

// Import axios for making HTTP requests
var axios = require('axios');

var app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/css/'));
app.use('/webfonts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/webfonts/'));
app.use('/css', express.static(__dirname + '/public/stylesheets'));

// Initialize Passport
app.use(passport.initialize());

// API routes
var routesApi = require('./app_api/routes/index');
app.use('/api', routesApi);

// Proxy route for fetching YouTube content
app.get('/youtube-proxy', async (req, res, next) => {
  try {
    // Make a request to the YouTube URL
    const youtubeUrl = req.query.url;
    const response = await axios.get(youtubeUrl);
    // Return the response from YouTube to the client
    res.send(response.data);
  } catch (error) {
    // Handle errors
    next(error);
  }
});

// Serve Angular client-side application
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// Error handling middleware
app.use(function(err, req, res, next) {
  // Handle errors
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
