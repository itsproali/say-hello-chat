const Chat = require("../models/chat.model");

const createChatHelper = async (firstId, secondId) => {
  const chat = await Chat.create({
    members: [firstId, secondId],
  });
  return chat;
};

module.exports = createChatHelper;
