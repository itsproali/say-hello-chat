require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = require("./app");

const server = app.listen(PORT, () => {
  console.log(`Server started ${new Date().toLocaleString()} on port: ${PORT}`);
});

// unhandledRejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection : ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
