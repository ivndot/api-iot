// mysql
const mysql = require("mysql");
// dotenv
require("dotenv").config();
//create connection
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: process.env.DB_PORT,
});

mysqlConnection.connect((error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log("Connected to database");
});

module.exports = { mysqlConnection };
