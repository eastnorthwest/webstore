const express = require('express');
const session = require('express-session');
const routes = express.Router();

routes.use(session({
  secret: (process.env.SESSION_SECRET || 'secret'),
  cookie: { maxAge: 1000 * 60 * 60 },
  resave: false,
  saveUninitialized: true
}));

module.exports = routes;