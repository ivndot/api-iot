const { pool } = require("./database");

/**
 * Function to get the temperature
 * @returns The temperature in celcius
 */
const getTemperature = id_sensor => {
  return new Promise((resolve, reject) => {
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      // query
      const query = "SELECT value_sensor FROM sensor_temp WHERE id_sensor = ?";
      // execute query
      dbConnection.query(query, [id_sensor], (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there is an error
        if (error) return reject(error);
        // send results
        resolve(results[0]);
      });
    });
  });
};

/**
 * Function to set temperature
 * @param {number} temp The current temperature
 * @returns An object containing the status of the request
 */
const setTemperature = temp => {
  return new Promise((resolve, reject) => {
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      // query
      const query = "UPDATE sensor_temp set value_sensor = ? WHERE id_sensor = ?";
      dbConnection.query(query, [temp, 1], (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there is an error
        if (error) return reject(error);
        // send status
        resolve({ code: 200, status: results.message });
      });
    });
  });
};

module.exports = { getTemperature, setTemperature };
