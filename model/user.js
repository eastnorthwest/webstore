const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');

const checkUser = (params) => {
  console.log('checkUser', params)
  var message = "Registration is successful.";
  var pass = true;
  // add db check
  try {
    if (params.password != params.password2) {
      message="Passwords do not match."; pass = false;
    }
    if (!params.password || params.password.length<3) {
      message="Please enter a valid password."; pass = false;
    }
  } catch (e) {
    message="Unable to register.  Please try again later."; pass = false;
  }
  return new Promise((resolve, reject) => {
    resolve({
      success: pass ? true : false,
      message: message
    })
  });
}

const addUser = (params) => {
  console.log("addUser", params)
  return new Promise((resolve, reject) => {
    bcrypt.hash(params.password, dev.env.USER_PASS_SALT || 'WEBSTORE', null, function(err, hash) {
      return db.one('INSERT INTO users (email, password, state_id, country_id) VALUES ($1, $2, 0, 0) RETURNING id',
          [params.email, hash])
      .then((result) => {
        console.log("addUser => ", result)
        resolve(true)
      })
      .catch((result) => {
        console.log("addUser error => ", result)
       reject(false);
      });
    });
  });


}

const checkLogin = (params) => {
  var checkHash = bcrypt.hashSync(params.password, dev.env.USER_PASS_SALT || 'WEBSTORE');
  return db.one('SELECT id FROM users WHERE email = $1 and password = $2', [params.email, checkHash]).
      then((result) => {
        return true;
      }).catch((err) => {
        return false;
  })
}

module.exports = {checkUser, addUser, checkLogin}