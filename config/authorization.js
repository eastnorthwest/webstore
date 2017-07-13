const db = require('./db.js');

const checkIsAdmin = (sessionId) => {
  return db.checkIsAdmin(sessionId);
}

module.exports = {checkIsAdmin};
