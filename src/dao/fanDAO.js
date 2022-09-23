// db connection
const { pool } = require("./database");

/**
 * Function to get the fan in the database
 * @returns The fan object
 */
const getFan = () => {
  return new Promise((resolve, reject) => {
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      //query fan
      const query = "SELECT mode_fan, status_fan, speed_fan FROM fan";
      //execute query
      dbConnection.query(query, (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there is an error
        if (error) return reject(error);
        // send data
        return resolve(results[0]);
      });
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
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      // query
      const query = "UPDATE fan set mode_fan = ?, status_fan = ?, speed_fan = ? WHERE id_fan = ?";
      //execute query
      dbConnection.query(query, [modeFan, statusFan, speedFan, 1], (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there was an error
        if (error) return reject(error);
        // send data
        return resolve({ code: 200, status: results.message });
      });
    });
  });
};

module.exports = { getFan, setFan };
