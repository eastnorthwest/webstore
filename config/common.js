/* setup common components */

const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const db = require('./db')

// set defaults/globals
app.locals.isAdmin =  false;
app.locals.isLoggedIn = false;

// configure ejs
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'))

// setup session
app.use(session({
  secret: (process.env.SESSION_SECRET || 'secret'),
  cookie: { maxAge: 1000 * 60 * 60 },
  resave: false,
  saveUninitialized: true
}));

// setup flash
app.use(flash());

const routes = express.Router();
// check/update session
routes.use('/', (req, res, next) => {

  if (req.sessionID) {
    //console.log(req.session)
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

module.exports = app;