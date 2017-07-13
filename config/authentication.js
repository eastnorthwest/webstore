const db = require('./db.js');

const checkRegister = (params) => {
  console.log('checkRegister', params)
  var message = "Registration is successful.";
  var pass = true;
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
  return {
    success: pass ? true : false,
    message: message
  }
}

module.exports = {checkRegister};
