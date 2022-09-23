// mysql
const mysql = require("mysql");
// dotenv
require("dotenv").config();

// connection config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: process.env.DB_PORT,
  waitForConnection: true,
  connectionLimit: 50
};

const pool = mysql.createPool(dbConfig);

module.exports = { pool };
