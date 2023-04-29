const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },

    senderId: {
      type: String,
    },

    message: {
      type: String,
    },

    type: {
      type: String,
      default: "text",
      enum: {
        values: ["text", "image"],
        message: "Unsupported message type",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
