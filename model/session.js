const db = require('../config/db');

const updateSession = (sessionId) => {
  return new Promise ((resolve, reject) => {
    console.log("in updateSession with ", sessionId)
    db.one("SELECT id FROM sessions WHERE id = $1", [sessionId])
    .then((data) => {
      console.log("returning existing session", data);
      resolve(data.id)
    }).catch((err) => {
      console.log("no data", err);
      db.one("INSERT INTO sessions (id, datetime) VALUES ($1, CURRENT_TIMESTAMP)", [sessionId]).
          then((result) => {
            console.log("do insert");
            db.one("SELECT id from SESSIONS ORDER BY datetime DESC LIMIT 1").
                then((data) => {
                  console.log("return new session", data);
                  if (data) {
                    resolve(data.id);
                  }
                }).catch((err) => {
              console.log(1);
              reject(err);})
          }).catch((err) => {
        console.log(2);
        reject(err);})
    })
  });
};

const setSession = (userId, sessionId) => {
  console.log("in setSession with ", userId, sessionId)
  return db.none("DELETE FROM sessions WHERE user_id = $1 or id = $2", [userId, sessionId]).then((data) => {
    console.log("setSession - delete old ", userId, sessionId);
    db.none(
        "INSERT INTO sessions (user_id, id,  datetime) VALUES ($1, $2, CURRENT_TIMESTAMP)",
        [userId, sessionId]).then((data) => {
      console.log("setSession - inserted sessions ", data);
      return true;
    }).catch((err) => {
      console.log("setSession - cant create new session", err);
      return false;
    })
  }).catch((err) => {
    console.log("setSession - cant delete session", err);
    return false;
  })
}

const isAdmin = (sessionId) => {
  if (!sessionId) {
    return false;
  }

  return db.one("SELECT * FROM sessions WHERE id=$1 AND is_admin = TRUE", [sessionId])
  .then((data) => {
    console.log("checkIsAdmin", data)
    return true;
  }).catch((err) => {
    console.log("checkIsAdmin - no session! ", err)
    return false;
  })
}

module.exports = {updateSession, setSession, isAdmin};