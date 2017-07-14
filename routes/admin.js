const express = require('express');
const router = express.Router();
const authorization = require('../config/authorization.js');
const flashUtils = require('../config/flash');

router.get('/', (req, res, next) => {
  var sessionId = req.sessionID;
  console.log("admin session", sessionId)
  if (sessionId) {
    var isAdmin = authorization.checkIsAdmin(sessionId);
    if (isAdmin) {
      console.log("isAdmin - true", isAdmin)
      res.render('admin/index')
    } else {
      console.log("isAdmin - false???");
      flashUtils.flashGo(req, res, {success: false, message: "Access denied."},
          '/logout');
    }
  }
});

module.exports = router;