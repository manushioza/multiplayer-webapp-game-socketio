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
var scores_game1 = {
  player1: 0,
  player2: 0,
};
var scores_game2 = {
  player1: 0,
  player2: 0,
};
var scores_game3 = {
  player1: 0,
  player2: 0,
};
var scores_game4 = {
  player1: 0,
  player2: 0,
};
var p_id, s_id;

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://mutliplayer-webapp-game.herokuapp.com",
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

  //GAME 1
  socket.on("scoreGame1", (data) => {
    console.log("[GAME 1] Score recieved from player " + data.player_id);
    if (data.player_id == 1) {
      scores_game1.player1 = data.score;
    } else {
      scores_game1.player2 = data.score;
    }
    console.log(
      "[GAME 1] Scores updated. Current scores are: " + JSON.stringify(scores_game1)
    );
  });

  setInterval(
    function () {
      console.log("[GAME 1] Sending Scores..." + JSON.stringify(scores_game1));
      try {
        socket.emit("sendScoresGame1", scores_game1);
        console.log("[GAME 1] Scores sent!");
      } catch (err) {
        console.log(err);
      }
    },

    2000
  );

  //GAME 2
  socket.on("scoreGame2", (data) => {
    console.log("[GAME 1] Score recieved from player " + data.player_id);
    if (data.player_id == 1) {
      scores_game2.player1 = data.score;
    } else {
      scores_game2.player2 = data.score;
    }
    console.log(
      "[GAME 2] Scores updated. Current scores are: " + JSON.stringify(scores_game2)
    );
  });

  setInterval(
    function () {
      console.log("[GAME 2] Sending Scores..." + JSON.stringify(scores_game2));
      try {
        socket.emit("sendScoresGame2", scores_game2);
        console.log("[GAME 2] Scores sent!");
      } catch (err) {
        console.log(err);
      }
    },

    2000
  );

  //GAME 3
  socket.on("scoreGame3", (data) => {
    console.log("[GAME 3] Score recieved from player " + data.player_id);
    if (data.player_id == 1) {
      scores_game3.player1 = data.score;
    } else {
      scores_game3.player2 = data.score;
    }
    console.log(
      "[GAME 3] Scores updated. Current scores are: " + JSON.stringify(scores_game3)
    );
  });

  setInterval(
    function () {
      console.log("[GAME 3] Sending Scores..." + JSON.stringify(scores_game3));
      try {
        socket.emit("sendScoresGame3", scores_game3);
        console.log("[GAME 3] Scores sent!");
      } catch (err) {
        console.log(err);
      }
    },

    2000
  );

  //GAME 4
  socket.on("scoreGame4", (data) => {
    console.log("[GAME 4] Score recieved from player " + data.player_id);
    if (data.player_id == 1) {
      scores_game4.player1 = data.score;
    } else {
      scores_game4.player2 = data.score;
    }
    console.log(
      "[GAME 4] Scores updated. Current scores are: " + JSON.stringify(scores_game4)
    );
  });

  setInterval(
    function () {
      console.log("[GAME 4] Sending Scores..." + JSON.stringify(scores_game4));
      try {
        socket.emit("sendScoresGame4", scores_game4);
        console.log("[GAME 4] Scores sent!");
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
