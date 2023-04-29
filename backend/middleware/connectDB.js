const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected at: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log("Something went wrong", err);
    process.exit(1);
  }
};

module.exports = connectDB;
