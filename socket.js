//imPORTnessecary modules
const express = require("express");
const app = express();
const http = require("http");

const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");
const cors = require("cors");


//Set app to use above modules
app.use(bodyParser.json()); // supPORTjson encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // supPORTencoded bodies
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Start app,listen on PORT3030
server.listen(PORT, () => {
  console.log(`Example app listening on PORT: ${PORT}`);
});

module.exports = { io };
