const express = require('express');
const routes = express.Router();
const user = require('../model/user.js');
const authentication = require('../config/authentication');
const app = require('../config/common');

// create login and register pages
// create flash messages

const text = require('../config/text');

routes.post('/login', (req, res) => {
  console.log("auth.doLogin")
  authentication.checkLogin(req.params)
    .then((result) => {

  }).catch((err) => {
    req.flash('error', 'Login invalid.');
  });
  next();
});

routes.get('/login', (req, res) => {
  console.log("auth.login", text.LOGIN_TEST)
  if (req.sessionID) {
    req.session.destroy();
  }
  res.render('auth/login');
});

routes.post('/register', (req, res) => {
  var check = authentication.checkRegister(req.body);
  if (!!check.success) {
    res.redirect('/admin/index');
  } else {
    req.flash('message', check);
    req.flash('form_params', req.body);
    res.redirect('/auth/register');
  }
});

routes.get('/register', (req, res) => {
  res.render('auth/register', {form_params : req.flash('form_params'), message: req.flash('message')});
  if (req.sessionID) {
    req.session.destroy();
  }
});


routes.get('/logout', (req, res) => {
  console.log("auth.logout")
  if (req.sessionID) {
    req.session.destroy();
  }
  res.redirect('/auth/login');
});

module.exports = routes;