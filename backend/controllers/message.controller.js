const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/message.model");

exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { chatId, senderId, message, type } = req.body;

  const result = await Message.create({
    chatId,
    senderId,
    message,
    type,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.getMessagesByChatId = catchAsyncErrors(async (req, res, next) => {
  const { chatId } = req.params;
  const data = await Message.find({ chatId });

  const messageCount = await Message.countDocuments({ chatId });

  res.status(200).json({
    success: true,
    data,
    messageCount,
  });
});
