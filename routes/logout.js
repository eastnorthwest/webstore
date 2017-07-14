const express = require('express');
const routes = express.Router();

routes.get('/logout', (req, res) => {
  console.log("auth.logout")
  if (req.sessionID) {
    req.session.destroy();
  }
  res.redirect('/login');
});

module.exports = routes;