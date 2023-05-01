const { ObjectId } = require("mongodb");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Chat = require("../models/chat.model");
const createChatHelper = require("../utils/createChatHelper");

exports.createChat = catchAsyncErrors(async (req, res, next) => {
  const firstId = new ObjectId(req.body.firstId);
  const secondId = new ObjectId(req.body.secondId);

  // Check if chat already exists
  const prev = await Chat.findOne({
    members: {
      $all: [firstId, secondId],
    },
  });

  if (prev) {
    return res.status(302).json({
      success: false,
      message: "Chat already exists",
      data: prev,
    });
  }

  const chat = await createChatHelper(firstId, secondId);

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
  }).sort({ updatedAt: -1 });

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
