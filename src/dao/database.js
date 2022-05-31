const mysql = require("mysql");
//create connection
const mysqlConnection = mysql.createConnection({
  host: "b5ygse9msgvd6ay80xpl-mysql.services.clever-cloud.com",
  user: "umom49g0lmbfz3zp",
  password: "Vg9dnAv197kOzvMeMGkJ",
  database: "b5ygse9msgvd6ay80xpl",
  port: 3306,
});

mysqlConnection.connect((error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log("Connected to database");
});

module.exports = { mysqlConnection };
