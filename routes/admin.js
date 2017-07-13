const express = require('express');
const router = express.Router();
const authorization = require('../config/authorization.js');

router.get('/', (req, res, next) => {
  var sessionId = req.sessionID;
  console.log("admin session", sessionId)
  if (sessionId) {
    authorization.checkIsAdmin(sessionId).then((isAdmin) => {
      if (isAdmin) {
        console.log("isAdmin - true", isAdmin)
        res.render('admin/index')
      } else {
        console.log("isAdmin - false???");
        res.redirect('/auth/logout');
      }
    }).catch((err) => {
      console.log("isAdmin - error", err)
      res.redirect('/auth/logout');
    })
  } else {
    console.log("isAdmin - no session");
    res.redirect('/auth/logout');
  }
});

module.exports = router;