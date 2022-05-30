// db connection
const { mysqlConnection } = require("./database");

/**
 * Function to get the fan in the database
 * @returns An array of fan's objects
 */
const getFan = () => {
  return new Promise((resolve, reject) => {
    //query fan
    const query = "SELECT mode_fan, status_fan, speed_fan FROM fan";

    //execute query
    mysqlConnection.query(query, (error, results) => {
      // there is an error
      if (error) return reject(error);
      // send data
      return resolve(results);
    });
  });
};

/**
 * Function to update fan props
 * @param {string} modeFan The fan mode, it could be `a -> (automatic) or m -> (manual)`
 * @param {number} statusFan The fan status, it could be `0 -> (off) or 1 -> (on)`
 * @param {string} speedFan The fan speed, it could be `l -> (slow) or f -> (fast)`
 * @returns An object with the status of the operation
 */
const setFan = (modeFan, statusFan, speedFan) => {
  return new Promise((resolve, reject) => {
    // query
    const query = "UPDATE fan set mode_fan = ?, status_fan = ?, speed_fan = ? WHERE id_fan = ?";

    //execute query
    mysqlConnection.query(query, [modeFan, statusFan, speedFan, 1], (error, results) => {
      // there was an error
      if (error) return reject(error);
      // send data
      return resolve({ code: 200, status: results.message });
    });
  });
};

module.exports = { getFan, setFan };
