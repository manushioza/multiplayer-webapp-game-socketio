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
var scores = {
  player1: 0,
  player2: 0,
};
var p_id, s_id;

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

var room_id = 0;

io.on("connection", function (socket) {
  socket.on("join", (data) => {
    p_id = data.player_id;
    s_id = data.session_id; // Data sent from client when join_room event emitted
    console.log(p_id + " joined session " + s_id);
    socket.join(s_id); // Join the user to a socket room
  });

  socket.on("score", (data) => {
    console.log("Score recieved from player " + data.player_id);
    if (data.player_id == 1) {
      scores.player1 = data.score;
    } else {
      scores.player2 = data.score;
    }
    console.log(
      "Scores updated. Current scores are: " + JSON.stringify(scores)
    );
  });

    setInterval(
      function () {
        console.log("Sending Scores..." + JSON.stringify(scores));
        try {
          socket.emit("sendScores", scores );
          console.log("Scores sent!");
        } catch (err) {
          console.log(err);
        }
      },

      2000
    );
  
});

//Start app,listen on PORT3030
server.listen(PORT, () => {
  console.log(`Example app listening on PORT: ${PORT}`);
});

module.exports = { io };
