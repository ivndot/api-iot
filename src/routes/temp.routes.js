const { Router } = require("express");
const router = Router();
// dao
const { getTemperature, setTemperature } = require("../dao/tempDAO");
// util
const RoutesError = require("../util/RoutesError");

/*
     ==============================================================
     *                       EndPoint: temp                       *         
     ==============================================================
*/

/**
 * CLIENT --> BROWSER
 * METHOD: GET
 * Get the temperature provided by the LM35 sensor
 */
router.get("/api/temp", async (req, res) => {
  try {
    const id_temp = 1;
    const temperature = await getTemperature(id_temp);
    // send data
    res.status(200).json(temperature[0]);
  } catch (error) {
    // send error
    console.error(error);
    res.status(500).json(new RoutesError(500, "Can't get the temperature"));
  }
});

/**
 * CLIENT --> ARDUINO
 * METHOD: PUT
 * Update the temperature read by the sensor
 */
router.put("/api/temp", async (req, res) => {
  try {
    // get temperature
    const { temp } = req.body;
    // get socket.io
    const io = req.io;

    // validate temp
    if (!temp || temp === undefined) {
      res.status(400).json(new RoutesError(400, "No temp provided"));
      return;
    }

    // update temperature
    const response = await setTemperature(temp);

    // socket.io
    // create an event for the temperature
    io.emit("server:temperature", temp);

    // send status
    res.status(200).json(response);
  } catch (error) {
    // send error
    console.error(error);
    res.status(500).json(new RoutesError(500, "Can't send the temperature to the server"));
  }
});

module.exports = router;
