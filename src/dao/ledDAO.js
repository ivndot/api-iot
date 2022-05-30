// db connection
const { mysqlConnection } = require("./database");

/**
 * Function to get all the leds in the database
 * @returns An array of led's objects
 */
const getLEDS = () => {
  return new Promise((resolve, reject) => {
    // query leds
    const query = "SELECT name_led, status_led FROM led";

    // execute query
    mysqlConnection.query(query, (error, results) => {
      // there is an error
      if (error) return reject(error);
      // send data
      return resolve(results);
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
    // query
    const query = "UPDATE led set status_led = ? where id_led = ?";
    mysqlConnection.query(query, [status_led, id_led], (error, results) => {
      // there is an error
      if (error) return reject(error);
      // send data
      return resolve({ code: 200, status: results.message });
    });
  });
};

module.exports = { getLEDS, setLED };
