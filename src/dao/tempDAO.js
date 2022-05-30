const { mysqlConnection } = require("./database");

/**
 * Function to get the temperature
 * @returns The temperature in celcius
 */
const getTemperature = (id_sensor) => {
  return new Promise((resolve, reject) => {
    // query
    const query = "SELECT value_sensor FROM sensor_temp WHERE id_sensor = ?";
    // execute query
    mysqlConnection.query(query, [id_sensor], (error, results) => {
      // there is an error
      if (error) return reject(error);
      // send results
      resolve(results);
    });
  });
};

/**
 * Function to set temperature
 * @param {number} temp The current temperature
 * @returns An object containing the status of the request
 */
const setTemperature = (temp) => {
  return new Promise((resolve, reject) => {
    // query
    const query = "UPDATE sensor_temp set value_sensor = ? WHERE id_sensor = ?";
    mysqlConnection.query(query, [temp, 1], (error, results) => {
      // there is an error
      if (error) return reject(error);
      // send status
      resolve({ code: 200, status: results.message });
    });
  });
};

module.exports = { getTemperature, setTemperature };
