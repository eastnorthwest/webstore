const express = require('express');
const routes = express.Router();

routes.use('/profile', (req, res) => {
  res.send('User Profile');
});

routes.use('/', (req, res) => {
  res.send('User');
});

module.exports = routes;