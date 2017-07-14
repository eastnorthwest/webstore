const express = require('express');
const routes = express.Router();
const flashUtils = require('../config/flash');

// create login and register pages
// create flash messages
const text = require('../config/text');

// get user model
const user = require('../model/user');

// session model
const session = require('../model/session');

routes.post('/', (req, res) => {
  user.checkUser(req.body)
  .then((check) => {
    console.log("checkUser result? ", check)
    if (!!check.success) {
      console.log("checkUser success? ", req.body)
      user.addUser(req.body)
          .then((result) => {
            console.log("registered user, now set session? ", req.body)
            session.setSession(result.id, null || req.sessionID)
            .then((result) => {
              flashUtils.flashGo(req, res, {success:true, message: "Registration successful!<br/>Please login to continue."}, '/login');
            })
            .catch((err) => {
              flashUtils.flashGo(req, res, {success:false, message: err.message}, '/register');
            })
          })
          .catch((err) => {
            console.log("register catch", check, err)
            flashUtils.flashGo(req, res, {success:false, message: err.message}, '/register');
      })
    } else {
      console.log("checkUser - not successful= ", check)
      flashUtils.flashGo(req, res, check, '/register');
    }
  })
});

routes.get('/', (req, res) => {
  res.render('auth/register', {form_params : req.flash('form_params'), message: req.flash('message')});
  if (req.sessionID) {
    req.session.destroy();
  }
});

module.exports = routes;