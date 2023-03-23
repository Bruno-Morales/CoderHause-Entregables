const { Server } = require("socket.io");

const socket = {};

socket.connect = (server) => {
  socket.io = new Server(server);
  socket.io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
  });
};

module.exports = socket;
