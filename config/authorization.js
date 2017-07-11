const express = require('express');
const app = express();
const session = require('express-session');
const db = require('./db.js');
const routes = express.Router();

const checkIsAdmin = (sessionId) => {
  return db.checkIsAdmin(sessionId);
}

module.exports = {checkIsAdmin};
