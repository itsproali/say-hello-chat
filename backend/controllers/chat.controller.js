const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Chat = require("../models/chat.model");

exports.createChat = catchAsyncErrors(async (req, res, next) => {
  const { firstId, secondId } = req.body;

  const chat = await Chat.create({
    members: [firstId, secondId],
  });

  res.status(200).json({
    success: true,
    data: chat,
  });
});

exports.getUserChats = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  const chat = await Chat.find({
    members: {
      $in: [userId],
    },
  });

  res.status(200).json({
    success: true,
    data: chat,
  });
});

exports.getChat = catchAsyncErrors(async (req, res, next) => {
  const { firstId, secondId } = req.params;

  const chat = await Chat.findOne({
    members: {
      $all: [firstId, secondId],
    },
  });

  res.status(200).json({
    success: true,
    data: chat,
  });
});
