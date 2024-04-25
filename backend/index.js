const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

const port = 5100;

const server = app.listen(port, () => {
  console.log("App is listening on port " + port);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "*",
  },
});
let allGroupUsers = [];
io.on("connection", (socket) => {
  console.log("Connection established successfully");

  socket.on("joinRoom", (userInfo) => {
    socket.join(userInfo.userId);
    console.log("User connected with id: " + userInfo.userId);
    allGroupUsers.push(userInfo.userId);

    socket.emit("Connected Successfully");
  });

  socket.on("sendMessage", (message) => {
    console.log("Received Message:", message);
    console.log("AllGroup Users : ", allGroupUsers);
    allGroupUsers.forEach((userId) => {
      io.to(userId).emit("receiveMessage", message);
    });
  });
});
