// fanDAO
const { getFan, setFan } = require("./fanDAO");
// ledDAO
const { getLEDS, setLED } = require("./ledDAO");

/**
 * Function to get the actual mode of the iot device
 * @returns An string with the form -->
 *   `mode:fanStatus:fanSpeed:led1Status:led2Status`
 */
const getMode = async () => {
  try {
    // get leds data
    const leds = await getLEDS();
    // get fan data
    const fan = await getFan();

    const led1 = leds.find(item => item.name_led === "green");
    const led2 = leds.find(item => item.name_led === "yellow");

    const modeFan = fan.mode_fan;
    const statusFan = fan.status_fan;
    const speedFan = fan.speed_fan;
    const led1Status = led1.status_led;
    const led2Status = led2.status_led;

    // send data
    return `${modeFan}:${statusFan}:${speedFan}:${led1Status}:${led2Status}`;
  } catch (error) {
    //send error
    throw "Can't get mode";
  }
};

/**
 * Function to update the mode object
 * @param {Object} mode The mode object
 * @returns An object with status of the operation
 */
const setMode = async mode => {
  try {
    const { modeFan, statusFan, speedFan, led1Status, led2Status } = mode;
    // update fan
    const responseFan = await setFan(modeFan, statusFan, speedFan);
    //update led
    const responseLED1 = await setLED(led1Status, 1);
    const responseLED2 = await setLED(led2Status, 2);

    // validate if fan and leds update successfully
    if (responseFan.code !== 200 || responseLED1.code !== 200 || responseLED2.code !== 200) {
      throw "Can't set mode";
    }

    // send data
    return { code: 200, status: "Mode object updated successfully" };
  } catch (error) {
    // send error
    console.error(error);
    throw "Can't set mode ";
  }
};

module.exports = { getMode, setMode };
