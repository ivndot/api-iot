const { Router } = require("express");
const router = Router();
// dao
const { getMode, setMode } = require("../dao/modeDAO");
// util
const RoutesError = require("../util/RoutesError");

/*
     ==============================================================
     *                       EndPoint: mode                       *         
     ==============================================================
*/

/**
 * CLIENT --> ARDUINO
 * METHOD: GET
 * Get the mode and all the data to control fan and leds
 */
router.get("/api/mode", async (req, res) => {
  try {
    // get mode
    const mode = await getMode();

    // send data
    res.status(200).send(mode);
  } catch (error) {
    // send error
    console.error(error);
    res.status(500).json(new RoutesError(500, "Can't get the mode"));
  }
});

/**
 * CLIENT --> BROWSER
 * METHOD: PUT
 * Send the current mode of the iot device (fanMode, fanStatus, fanSpeed, led1Status, led2Status)
 */
router.put("/api/mode", async (req, res) => {
  try {
    const { iotMode: mode } = req.body;

    if (!mode || mode === undefined) {
      res.status(400).json(new RoutesError(400, "No mode param "));
      return;
    }

    const response = await setMode(mode);

    // send data
    res.status(200).json(response);
  } catch (error) {
    // send error
    console.error(error);
    res.status(500).json(new RoutesError(500, "Can't send the mode to the server"));
  }
});

module.exports = router;
