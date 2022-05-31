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
};

// declare connection variable
let mysqlConnection = null;

const handleDisconnect = () => {
  // initialize connectioin
  mysqlConnection = mysql.createConnection(dbConfig);

  mysqlConnection.connect((error) => {
    if (error) {
      console.error(error);

      // lost connection error
      if (error.code === "PROTOCOL_CONNECTION_LOST") {
        setTimeout(handleDisconnect, 2000);
      }
    }

    console.log("Connected to database");
  });
};

handleDisconnect();

module.exports = { mysqlConnection };
