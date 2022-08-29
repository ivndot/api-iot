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
  port: process.env.DB_PORT
};

// declare connection variable
let mysqlConnection = null;

const handleDisconnect = () => {
  // initialize connectioin
  mysqlConnection = mysql.createConnection(dbConfig);

  mysqlConnection.connect(error => {
    if (error) {
      console.log("===ERROR===");
      console.error(error);
      console.error(error.code);
      setTimeout(handleDisconnect, 2000);
    } else {
      // there is no error in the connection to the database
      console.log("Connected to database");
    }
  });

  mysqlConnection.on("error", error => {
    console.log("===ERROR===");
    console.error(error);
    // lost connection error
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Attempting to connect again...");
      handleDisconnect();
    } else {
      throw error;
    }
  });
};

handleDisconnect();

module.exports = { mysqlConnection };
