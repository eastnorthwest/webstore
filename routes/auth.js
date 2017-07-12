const flash = require('express-flash');
const express = require('express');
const routes = express.Router();
const app = express();

app.use(flash());

// create login and register pages
// create flash messages

const authentication = require('../config/authentication');

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

  console.log("auth.login")
  if (req.sessionID) {
    req.session.destroy();
  }
  res.render('auth/login');
});

routes.post('/register', (req, res) => {
  console.log("auth.doRegister")
  authentication.checkRegister(req.params)
  .then((result) => {
    authentication.doRegister(req.params)
  }).catch((err) => {
    req.flash('error', err);
    res.render('auth/register', {'fields' : req.params});
  });
});

routes.get('/register', (req, res) => {
  console.log("auth.register")
  if (req.sessionID) {
    req.session.destroy();
  }
  res.render('auth/register');
});


routes.get('/logout', (req, res) => {
  console.log("auth.logout")
  if (req.sessionID) {
    req.session.destroy();
  }
  res.redirect('/auth/login');
});


module.exports = routes;