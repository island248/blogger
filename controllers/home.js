// controllers/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: "Ilynd Rapant's Blog Site" });
});

module.exports = router;
