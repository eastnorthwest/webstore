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

module.exports = db;
