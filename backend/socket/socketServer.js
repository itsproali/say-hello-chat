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

  // Remove User
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  // Find User
  const findUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  // Socket Connection
  io.on("connection", (socket) => {
    console.log("A user connected.");
    // New User Add
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);

      io.emit("getUsers", users);
      console.log("New User Added");
    });

    // Send and Get Message
    socket.on("sendMessage", (data) => {
      const receiver = findUser(data?.receiverId);
      io.to(receiver.socketId).emit("getMessage", data);
    });

    // User Disconnect
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("User Disconnected");
      io.emit("getUsers", users);
    });
  });
};

module.exports = socketServer;
