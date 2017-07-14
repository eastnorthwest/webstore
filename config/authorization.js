const db = require('./db.js');
const session = require('../model/session');

const checkIsAdmin = (sessionId) => {
  return session.isAdmin();
}

module.exports = {checkIsAdmin};
