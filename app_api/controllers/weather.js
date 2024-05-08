// weatherController.js

const axios = require('axios');

const apiKey = '8e54d1fe594b4be3a12142656241404';
const city = 'Lancaster,PA';
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

// Define a function to get weather data
exports.getWeather = (req, res) => {
    axios.get(apiUrl)
        .then(response => {
            const weatherData = response.data;
            res.json(weatherData); // Send weather data as JSON response
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Error fetching weather data' }); // Send error response
        });
};
