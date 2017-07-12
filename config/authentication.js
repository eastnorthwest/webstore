const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const db = require('./db.js');
const cookie = require("cookie-parser");

app.use(flash());

const checkSession = (route) => {

  route.use(session({
    secret: (process.env.SESSION_SECRET || 'secret'),
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: true
  }));

  route.use('/', (req, res, next) => {
    if (req.sessionID) {
      console.log(req.session)
      console.log("checkSession", req.sessionID)
      db.updateSession(req.sessionID).then((result) => {
        console.log("authentication- updateSession ok - ", result)
        next();
      }).catch((err) => {
        console.log("authentication- updateSession error - ", err)
        next();
      })
    }
    next();
  })

  return route;
}

const checkRegister = () => {
  route.post('/auth/register', (req, res, next) => {


    req.flash('error', 'Login invalid.');
  })
}


module.exports = {checkSession};
