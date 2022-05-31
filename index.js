const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// environment
const port = process.env.PORT || 3000;
//app.set("port", process.env.PORT || 3000);
// for application/json request
app.use(bodyParser.json());
//cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Temperature");
});

//temp endpoint
app.use(require("./src/routes/temp.routes"));

//mode endpoint
app.use(require("./src/routes/mode.routes"));

app.listen(port, () => {
  console.log("Listening");
});
