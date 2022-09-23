// db connection
const { pool } = require("./database");

/**
 * Function to get all the leds in the database
 * @returns An array of led's objects
 */
const getLEDS = () => {
  return new Promise((resolve, reject) => {
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      // query leds
      const query = "SELECT name_led, status_led FROM led";
      // execute query
      dbConnection.query(query, (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there is an error
        if (error) return reject(error);
        // send data
        return resolve(results);
      });
    });
  });
};

/**
 * Function to update led props
 * @param {number} status_led The led status, it could be `0 -> (off) or 1 -> (on)`
 * @param {number} id_led The id of the led
 * @returns An object with the status of the operation
 */
const setLED = (status_led, id_led) => {
  return new Promise((resolve, reject) => {
    // create new connection
    pool.getConnection((error, dbConnection) => {
      if (error) {
        console.error("MySQL Connection Error => ", error);
        reject(error);
      }
      // query
      const query = "UPDATE led set status_led = ? where id_led = ?";
      dbConnection.query(query, [status_led, id_led], (error, results) => {
        // RELEASE THE CONNECTION: Return to the pool
        dbConnection.release();
        // there is an error
        if (error) return reject(error);
        // send data
        return resolve({ code: 200, status: results.message });
      });
    });
  });
};

module.exports = { getLEDS, setLED };
