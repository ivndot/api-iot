const mysql = require("mysql");
//create connection
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "iot_temp",
});

mysqlConnection.connect((error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log("Connected to database");
});

module.exports = { mysqlConnection };
