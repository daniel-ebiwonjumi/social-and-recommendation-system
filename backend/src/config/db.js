const pgp = require('pg-promise')({
 query(e) {
    console.log("QUERY:", e.query);
  },
  error(err, e) {
    console.error("DB ERROR:", err);
  },
});

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;


