const promise = require('bluebird');

const connect = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB || 'webstore',
  password: process.env.DB_PASSWORD || null
};

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(connect);


const checkIsAdmin = (sessionId) => {
  return new Promise ((resolve, reject) => {
    db.one("SELECT * FROM sessions WHERE id=$1 AND is_admin = TRUE", [sessionId])
    .then((data) => {
      console.log("checkIsAdmin", data)
      if (data.id) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch((err) => {
      console.log("checkIsAdmin - catch", err)
      resolve(false)
    })
  });
}

const updateSession = (sessionId) => {
  return new Promise ((resolve, reject) => {
    console.log("in updateSession with ", sessionId)
    db.one("SELECT id FROM sessions WHERE id = $1", [sessionId])
    .then((data) => {
      console.log("returning existing session", data);
      resolve(data.id)
    }).catch((err) => {
      console.log("no data", err);
      db.none("INSERT INTO sessions (id, datetime) VALUES ($1, CURRENT_TIMESTAMP)", [sessionId]).
          then(() => {
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

module.exports = {checkIsAdmin, updateSession};
