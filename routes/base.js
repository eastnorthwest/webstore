const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Default Page<p><a href="/admin">Admin</a></p><p><a href="/auth/login">Login</a></p>');
});

module.exports = routes;