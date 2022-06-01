// express
const express = require("express");
const app = express();
// body parser for json
const bodyParser = require("body-parser");
// configure cors
const cors = require("cors");
// socket.io
const { Server: WebsocketServer } = require("socket.io");
// http server
const http = require("http");

/*
     ==============================================================
                           EXPRESS CONFIG                            
     ==============================================================
*/
// environment
const port = process.env.PORT || 3000;
// for application/json requests
app.use(bodyParser.json());
//cors
app.use(cors());

/*
     ==============================================================
                           SOCKET.IO CONFIG                            
     ==============================================================
*/
// create http server with express
const httpServer = http.createServer(app);
// create web socket server
const io = new WebsocketServer(httpServer, { cors: { origin: "*", methods: ["GET", "PUT"] } });
// set socket.io to whole express app
app.use((req, res, next) => {
  req.io = io;
  return next();
});
// create listener to connection event
io.on("connection", (socket) => {
  console.log("Connection established");
  console.log("SOCKET ID --> ", socket.id);
});

/*
     ==============================================================
                                  ROUTES                            
     ==============================================================
*/

// root
app.get("/", (req, res) => {
  res.send("API Temperature");
});

//temp endpoint
app.use(require("./src/routes/temp.routes"));

//mode endpoint
app.use(require("./src/routes/mode.routes"));

// start server listening to the respective port
httpServer.listen(port, () => console.log("listening on port..." + port));
