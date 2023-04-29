const socketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  let users = [];

  // Add New User
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  io.on("connection", (socket) => {
    // New User Add
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);

      io.emit("getUsers", users);
      console.log("New User Added", users);
    });

    // User Disconnect
    socket.on("disconnect", () => {
      users = users.filter((u) => u.socketId !== socket.id);
      io.emit("getUsers", users);
      console.log("User Disconnected", users);
    });
  });
};

module.exports = socketServer;
