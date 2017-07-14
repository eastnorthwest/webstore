const express = require('express');
const routes = express.Router();
const flashUtils = require('../config/flash');

// create login and register pages
// create flash messages
const text = require('../config/text');

// get user model
const user = require('../model/user');

routes.post('/', (req, res) => {
  console.log("auth.doLogin")
  user.checkLogin(req.params)
    .then((result) => {
    flashUtils.flashGo(req, res, {success:true, message: "Welcome!"}, '/cart');
  }).catch((err) => {
    flashUtils.flashGo(req, res, {success:false, message: "Invalid login."}, '/login');
  });
});

routes.get('/', (req, res) => {
  console.log("auth.login", text.LOGIN_TEST)
  res.render('auth/login', {message: req.flash('message')});
  if (req.sessionID) {
    req.session.destroy();
  }
});

module.exports = routes;