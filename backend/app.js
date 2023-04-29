const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const http = require("http");
const socketServer = require("./socket/socketServer");

const app = express();

// Socket Server
const server = http.createServer(app);
socketServer(server);

connectDB();

// MIddleware
app.use(express.json());
app.use(cors());

// Development logging
app.use(morgan("dev"));

// Define Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// All Routers in API V1
app.use("/api/v1", require("./routers/routers"));

// 404 Handler
app.all("*", (req, res, next) => {
  // next(new Error(`Can't find ${req.originalUrl} on this server!`));
  console.log("404 Handler");
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = server;
